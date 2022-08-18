export const tpl = `
   <div class="dialogs-block__item dialogs-block__item-search-form">
        {{{searchBlock}}}
    </div>
    <div class="dialog-list logic-block">
        {{#each listBlockDialogItem as |itemdialog iddialog|}}
            <div class="dialog-list__row">
                <div data-id="{{itemdialog._id}}"></div>
            </div>
        {{/each}}
    </div>
`;
