import Block from '../block';
import { renderDOM } from '../../utils/renderDOM';

export default class Route {
  public component: Block<{}>;
  public path: string;
  public needCheckAuth: boolean;
  public props: Record<string, any>;

  constructor(path, component, props: Record<string, any>) {
    this.path = path;
    this.component = component;
    this.props = props;
  }

  render(): void {
    renderDOM(this.props.rootQuery, this.component);
    this.component.show();
  }

  navigate(path): void {
    if (this.match(path)) {
      this.render();
    }
  }

  leave(): void {
    if (this.component) {
      this.component.hide();
    }
  }

  match(path: string): boolean {
    if (this.props.withId) {
      return path.includes(this.path);
    }
    return path == this.path;
  }
}
