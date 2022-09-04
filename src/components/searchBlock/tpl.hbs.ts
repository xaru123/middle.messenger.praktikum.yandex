export const tpl = `
  <div>{{{input}}}{{{icon}}}</div>
      
  {{#if needList}}
    <ul class="list-search">
    {{#each listResultSearch as |resultSearchItem index|}}
      <li class="list-search__user">
      {{#with (lookup ../listBlockInput [index])~}}
          <data data-id="{{this._id}}"/>
      {{/with}}
       </li>
    {{/each}}
      </ul>
  {{/if}}
`;
