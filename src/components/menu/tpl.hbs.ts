export const tpl = `
 {{{avatar}}}
 {{#each listBlockLinks as | t1 idt |}}
    <a data-id="{{t1._id}}"></a>
 {{/each}}
 
`;
