export const tpl = `
    <div class="modal__overlay"></div>
    <div class="modal__wrapper">
        <div class="modal__content logic-block">
            <span href="#" id="modal__btn-close">&times;</span>
            <h2 class="logic-block__header modal__header">{{headerTitle}}</h2>
            <div class="modal__body text-center">
                  {{#each listBlockContent as |itemContent|}}
                  <div data-id="{{itemContent._id}}"></div>
                {{/each}}
            </div>
        </div>
    </div>
`;
