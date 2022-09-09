import Handlebars from 'handlebars';
import { should } from 'chai';

should();

function Application(templateId) {
  const source = document.getElementById(templateId);
  this.template = Handlebars.compile(source?.innerHTML);
}

Application.prototype.render = function (params) {
  return this.template(params);
};

describe('Testing Handlebars', function () {
  it('Should exists', function () {
    const app = new Application('#root');
    app.should.be.an.instanceof(Application);
  });

  it('Should render handlebars template', function () {
    const app = new Application('#root');
    app.render({}).should.equal('<div></div>');
  });
});
