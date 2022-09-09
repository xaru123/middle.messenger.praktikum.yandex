import Block from './block';
import { expect } from 'chai';

describe('Testing class Block', () => {
  let isRender = false;
  let isChangeProps = false;
  type TBlockTest = {
    class?: string;
  };

  class TestBlock extends Block<TBlockTest> {
    constructor(props: TBlockTest) {
      super('div', props);
    }

    render() {
      isRender = true;
      if (this.props?.class === 'new-class') {
        isChangeProps = true;
      }
      return '<div>Что-то внутри</div>' as unknown as Node;
    }
  }

  const testClass = new TestBlock({});

  it('Create typical Block', () => {
    expect(testClass._meta.tagName, 'div').to.eq('div');
  });

  it('Can be render', () => {
    expect(isRender, 'true').to.eq(true);
  });

  it('Not exsist prop', () => {
    expect(isChangeProps).to.eq(false);
  });

  it('Can update props', () => {
    testClass.setProps({
      class: 'new-class',
    });
    expect(testClass.props.class).to.eq('new-class');
  });

  it('Component rerender and have new props', () => {
    expect(isChangeProps).to.eq(true);
  });
});
