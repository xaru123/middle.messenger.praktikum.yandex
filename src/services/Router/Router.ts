import Block from '../block';
import Route from './Route';
import { store } from '../../store';

export default class Router {
  static _instance: Router;
  public rootQuery: string;
  public routes: Route[];
  public history: History;
  public currentRoute: Route | null;
  public callbackForCheckAuth: () => void;

  constructor(rootQuery = '#root') {
    if (Router._instance) return Router._instance;

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router._instance = this;

    store.subscribe((state) => {
      this._reLocationByAuth(state.userInfo);
    });
  }

  use(path: string, component: Block<{}>, tag = 'div', props = {}, needCheckAuth: boolean) {
    this.routes.push(new Route(path, component, tag, { ...props, rootQuery: this.rootQuery }, needCheckAuth));
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
    if (!['/404', '/500'].includes(path)) {
      this._checkRelocationByAuth(route);
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute?.leave();
    }
    this.currentRoute = route;

    route.render();
  }

  private _checkRelocationByAuth(route): void {
    if (route.needCheckAuth) {
      this.callbackForCheckAuth();
    }
  }

  private _reLocationByAuth(userInfo) {
    const isAuth = Object.keys(userInfo).length;
    if (isAuth) {
      if (!this.currentRoute?.needCheckAuth) {
        return this.go('/messenger');
      }
    }
  }

  addFunctionForAuthCheck(callback: () => void) {
    this.callbackForCheckAuth = callback;
    return this;
  }

  public getRoute(path): Route {
    return this.routes.find((route: Route) => route.match(path)) as Route;
  }
}
