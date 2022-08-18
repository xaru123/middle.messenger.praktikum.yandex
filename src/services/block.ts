import EventBus from './eventBus';
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';

interface typicalObject {
  [index: string]: any;
}

export default class Block extends EventBus {
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
    'tabindex',
    'disabled',
    'target',
    'href',
    'src',
    'maxlength',
  ];

  public _setUpdate: Boolean = false;
  readonly _id: string;
  readonly _meta: { tagName: string; allProps: object };
  readonly _children: Record<string, Block>;
  protected props: typicalObject;
  protected events: typicalObject;
  protected _element: HTMLElement | null;

  constructor(tagName: string = 'div', allPropsAndChildren: typicalObject) {
    super();

    this._id = makeUUID();
    const { _children, allProps } = this._getIdealPropsAndChildren(allPropsAndChildren);
    this._meta = { tagName, allProps };
    this._children = _children;
    this.events = allProps.events;
    this.props = this._makePropsProxy({ ...allProps.attrs, __id: this._id });

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
    if (Object.keys(this._children).length) {
      this.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public setProps(nextProps: typicalObject): void {
    if (!nextProps) {
      return;
    }
    this._setUpdate = false;
    const oldValue = { ...this.props };
    const { _children, allProps } = this._getIdealPropsAndChildren(nextProps);
    if (Object.values(_children).length) {
      Object.assign(this._children, _children);
    }
    if (Object.values(this.props).length) {
      Object.assign(this.props, allProps.attrs);
    }
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
    this.getContent()!.style.display = 'block';
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

  public compile(template: string, props: typicalObject = {}): Node | null {
    if (!template) {
      return null;
    }

    if (!Object.keys(props).length) {
      props = this.props;
    }

    const propsAndStubs = { ...props };
    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const htmlTpl = this._createDocumentElement('template') as HTMLTemplateElement;
    htmlTpl.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      const stub = htmlTpl.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent()!);
      }
    });
    return htmlTpl.content;
  }

  /* PRIVATE */
  _getIdealPropsAndChildren(allPropsAndChildren) {
    const _children = {};
    const allProps = { events: {}, attrs: {} };
    Object.entries(allPropsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        _children[key] = value;
      } else if (key.startsWith('listBlock')) {
        Object.values(value as object).forEach((value2) => {
          _children[value2._id] = value2;
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
    return { _children, allProps };
  }

  private _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _render(): void {
    const block = this.render() as Node;
    this._removeEvents();
    this._element!.innerHTML = '';
    this._element!.append(block);
    this.addEvents();
    this._addAttributes();
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this._children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(oldProps, newProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _makePropsProxy(props) {
    const checkPrivateProp = (prop) => prop.startsWith('_');

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this._setUpdate = true;
        }
        return true;
      },
      deleteProperty(target, prop) {
        if (checkPrivateProp(prop)) {
          throw new Error('Нет прав');
        } else {
          delete target[prop];
          return true;
        }
      },
    });
  }

  private _createDocumentElement(tagName): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
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
    const { tagName } = this._meta;

    Object.keys(this.props).forEach((attrName) => {
      if (Block.listAttr.filter((item) => item == attrName).length) {
        if (attrName == 'tabindex' && tagName.toLowerCase() != 'button') {
          return;
        }
        if (attrName == 'id' && tagName.toLowerCase() != 'input' && tagName.toLowerCase() != 'form') {
          return;
        }
        this._element!.setAttribute(attrName, this.props[attrName]);
      }
    });
  }

  protected componentDidMount(): void {}

  protected render(): Node | null {
    return null;
  }

  // @ts-ignore
  protected componentDidUpdate(oldProps: object, newProps: object): boolean {
    return true;
  }
}
