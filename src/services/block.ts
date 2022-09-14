import Handlebars from 'handlebars';
import { EventBus } from './eventBus';
import { v4 as makeUUID } from 'uuid';

export type IBlockPropEvent = Record<string, EventListener>;

interface IObject {
  [index: string]: any;
}

export default class Block<TBlockProps extends {} = {}> extends EventBus {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FORM_CHECK: 'form:check_valid',
  };
  static listAttr = [
    'name',
    'action',
    'class',
    'type',
    'id',
    'title',
    'disabled',
    'target',
    'href',
    'src',
    'maxlength',
  ];

  public _setUpdate: Boolean = false;
  readonly _id: string;
  readonly _meta: { tagName: string; allProps: object };
  readonly children: Record<string, Block<TBlockProps>>;
  public props: TBlockProps;
  protected events: IBlockPropEvent | [];
  public _element: HTMLElement | null;

  constructor(tagName: string = 'div', allPropsAndChildren: TBlockProps) {
    super();

    this._id = makeUUID();
    const { children, allProps } = this._getIdealPropsAndChildren(allPropsAndChildren);
    this._meta = { tagName, allProps };
    this.children = children;
    this.events = allProps.events;
    const newProps = {
      ...allProps.attrs,
      __id: this._id,
    } as unknown as TBlockProps;
    this.props = this._makePropsProxy(newProps);

    this._registerEvents();
    this.emit(Block.EVENTS.INIT);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  public init(): void {
    this._createResources();
    this.emit(Block.EVENTS.FLOW_RENDER);
  }

  public dispatchComponentDidMount(): void {
    this.emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this.children).length) {
      this.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public setProps(nextProps: TBlockProps | IObject): void {
    if (!nextProps) {
      return;
    }
    this._setUpdate = false;
    const oldValue = { ...this.props };
    const { children, allProps } = this._getIdealPropsAndChildren(nextProps);
    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }
    if (Object.values(this.props).length) {
      Object.assign(this.props, allProps.attrs);
    }
    if (Object.values(allProps.events).length) {
      this.events = allProps.events;
    }
    this.removeEvents();
    this.addEvents();

    Object.entries(this.props).forEach((item) => {
      if (!item[1]) {
        delete this.props[item[0]];
      }
    });

    if (this._setUpdate) {
      this.emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
      this._setUpdate = false;
    }
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  public show(): void {
    this.getContent()!.style.display = 'flex';
  }

  public hide(): void {
    this.getContent()!.style.display = 'none';
  }

  private _registerEvents(): void {
    this.on(Block.EVENTS.INIT, this.init.bind(this));
    this.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    this.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  public compile(template: string, props: TBlockProps | {} = {}): Node | null {
    if (!template) {
      return null;
    }

    if (!Object.keys(props).length) {
      props = this.props;
    }

    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const htmlTpl = this._createDocumentElement('template') as HTMLTemplateElement;
    htmlTpl.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = htmlTpl.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent()!);
      }
    });
    return htmlTpl.content;
  }

  private _getIdealPropsAndChildren(allPropsAndChildren: TBlockProps | IObject) {
    const children = {};
    const allProps = { events: {}, attrs: {} };
    Object.entries(allPropsAndChildren).forEach(([key, value]) => {
      if (!value && key != 'disabled') {
        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else if (key.startsWith('listBlock')) {
        Object.values(value as object).forEach((value2) => {
          children[value2._id] = value2;
        });
        allProps.attrs[key] = value;
      } else {
        if (key.startsWith('on')) {
          allProps.events[key] = value;
        } else {
          allProps.attrs[key] = value;
        }
      }
    });
    return { children, allProps };
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _render(): void {
    const block = this.render() as Node;
    this.removeEvents();
    this._element!.innerHTML = '';
    this._element!.append(block);
    this.addEvents();
    this._addAttributes();
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(oldProps?: TBlockProps, newProps?: TBlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _makePropsProxy(props: TBlockProps): TBlockProps {
    const checkPrivateProp = (prop) => prop.startsWith('_');

    return new Proxy(props, {
      get(target: TBlockProps, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: TBlockProps, prop: string, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this._setUpdate = true;
        }
        return true;
      },
      deleteProperty(target: TBlockProps, prop: string) {
        if (checkPrivateProp(prop)) {
          throw new Error('Нет прав');
        } else {
          delete target[prop];
          return true;
        }
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  protected removeEvents(): void {
    Object.keys(this.events).forEach((eventName) => {
      this.element!.removeEventListener(eventName, this.events[eventName]);
    });
  }

  protected addEvents(): void {
    Object.keys(this.events).forEach((eventName) => {
      const newEventName = eventName.substr(2, eventName.length).toLowerCase();
      this.element!.addEventListener(newEventName, this.events[eventName]);
    });
  }

  private _addAttributes(): void {
    while (this._element!.attributes.length > 0) {
      this._element!.removeAttribute(this._element!.attributes[0].name);
    }

    Object.keys(this.props).forEach((attrName) => {
      if (Block.listAttr.filter((item) => item == attrName).length) {
        this._element!.setAttribute(attrName, this.props[attrName]);
      }
    });
  }

  protected componentDidMount(): void {}

  protected render(): Node | null {
    return null;
  }

  protected componentDidUpdate(oldProps?: TBlockProps, newProps?: TBlockProps): boolean {
    return oldProps !== newProps;
  }

  public destroy(): void {
    this.removeEvents();
    this._element?.remove();
  }
}
