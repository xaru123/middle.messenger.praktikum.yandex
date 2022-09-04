export const tpl = `
<div class="dialogs-block__item dialogs-block__item-search-form">
  {{{searchBlock}}}
  <div class="dialogs-block__item dialogs-block__item-function">
    {{{iconAddChat}}}
  </div>
</div>
{{{deleteChat}}}
<div class="dialog-list logic-block">
  {{#each listBlockDialogItem as |itemdialog iddialog|}}
    <div class="dialog-list__row {{itemdialog.props.classParentRow}}">
    <div data-id="{{itemdialog._id}}"></div>
    </div>
  {{/each}}
</div>
{{{modal}}}
`;
