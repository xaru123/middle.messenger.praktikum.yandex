export const tpl = `{{{formContent}}}
<div class="emoji">
 {{#each listEmoji as |emojiItem|}}
 <span class="emoji-item">
 {{{emojiItem}}}
 </span>
  {{/each}}
</div>
`;
