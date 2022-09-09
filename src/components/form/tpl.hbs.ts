export const tpl = `
  {{#each listBlockInputs as | t1 idt |}}
      <div class="form__item form__item-input">
            <div data-id="{{t1._id}}"></div>
      </div>
  {{/each}}
  <span class="form-problem"></span>
  <div class="form__item flex flex_direction_row flex_justify-content_space-between form__item-button flex_align-items_center">
    {{#each listBlockBtn as | t idt |}}
      <div data-id="{{t._id}}"></div>
    {{/each}}
  </div>
`;
