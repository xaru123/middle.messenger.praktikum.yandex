import Block from '../block';
import Route from './Route';

export default class Router {
  static _instance: Router;
  public rootQuery: string;
  public routes: Route[];
  public history: History;
  public currentRoute: Route | null;
  public callbackForCheckAuth: () => Promise<{}>;

  constructor(rootQuery = '#root') {
    if (Router._instance) return Router._instance;

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router._instance = this;
  }

  use(path: string, component: Block<{}>, props = {}) {
    this.routes.push(new Route(path, component, { ...props, rootQuery: this.rootQuery }));
    return this;
  }

  start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  go(path: string): void {
    this.history.pushState({}, '', path);
    this._onRoute(path);
  }

  back(): void {
    window.history.back();
  }

  forward(): void {
    window.history.forward();
  }

  _onRoute(path: string): void {
    const route = this.getRoute(path);
    if (!route) {
      return this.go('/404');
    }
    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute?.leave();
    }
    this.currentRoute = route;

    this._checkRelocationByAuth(route);
  }

  private _checkRelocationByAuth(route): void {
    if (!this.callbackForCheckAuth) {
      return;
    }
    this.callbackForCheckAuth().then((responce) => {
      if (responce && !route.props.needAuth) {
        return this.go('/messenger');
      } else if (!responce && route.props.needAuth) {
        return this.go('/');
      } else {
        route.render();
      }
    });
  }

  addFunctionForAuthCheck(callback) {
    this.callbackForCheckAuth = callback;
    return this;
  }

  public getRoute(path): Route {
    return this.routes.find((route: Route) => route.match(path)) as Route;
  }
}
