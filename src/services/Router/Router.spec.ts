import Block from '../Block';
import Router from './Router';
import { expect } from 'chai';

describe('Testing class Router', () => {
  const TestRouter = new Router('#root');

  class FirstPage extends Block<{}> {}

  class SecondPage extends Block<{}> {}

  class ThirdPage extends Block<{}> {}

  TestRouter.use('/', new FirstPage('div', {}), 'div', {}, false)
    .use('/second', new SecondPage('div', {}), 'div', {}, false)
    .use('/third', new SecondPage('div', {}), 'div', {}, false)
    .use('/messenger', new ThirdPage('div', {}), 'div', {}, false)
    .use('/404', new ThirdPage('div', {}), 'div', {}, false)
    .start();

  it('Can go', () => {
    TestRouter.go('/second');
    TestRouter.go('/third');
    TestRouter.go('/fourth');
    TestRouter.go('/third');
    expect(TestRouter.currentRoute?.path).to.eq('/third');
  });

  it('Check not found route', () => {
    TestRouter.go('/not-exsist');
    expect(TestRouter.currentRoute?.path).to.eq('/404');
  });
});
