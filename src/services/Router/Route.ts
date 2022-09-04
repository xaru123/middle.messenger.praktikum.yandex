import Block from '../block';
import { renderDOM } from '../../utils/renderDOM';

export default class Route {
  public component: Block<{}>;
  public block: Block<{}> | null;
  public path: string;
  public tag: string;
  public needCheckAuth: boolean;
  props;

  constructor(path, component, tag = 'div', props = {}, needCheckAuth) {
    this.path = path;
    this.component = component;
    this.block = null;
    this.props = props;
    this.tag = tag;
    this.needCheckAuth = needCheckAuth;
  }

  render(): void {
    if (!this.block) {
      this.block = this.component;
      renderDOM(this.props.rootQuery, this.block);
      return;
    }

    this.block.show();
  }

  navigate(path): void {
    if (this.match(path)) {
      this.render();
    }
  }

  leave(): void {
    if (this.block) {
      this.block.hide();
    }
  }

  match(path: string): boolean {
    if (this.props.withId) {
      return path.includes(this.path);
    }
    return path == this.path;
  }
}
