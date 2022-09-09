export const tpl = `
    <div class="dialog-item__group dialog-item__avatar">
        {{{avatar}}}
    </div>
    <div class=" dialog-item__group dialog-item__group_big flex_wrap_wrap">
        <div class="dialog-item__group_top">
            <span class="dialog-item__user-name">{{title}}</span>
        </div>
        <div class="dialog-item__group_bottom">
        {{#if isOwn}}
        <p class="dialog-item__own">Вы:</p>
        {{/if}}
        <p class="dialog-item__msg shortcut">{{last_message.content}}</p>
        </div>
    </div>
    <div class="dialog-item__group dialog-item__group_end">
        <div class="dialog-item__group_top">
            <time datetime="{{last_message.time}}" class="dialog-item__user-time">{{timeFormatted}}</time>
        </div>
        {{#if unread_count}}
        <div class="dialog-item__marker"></div>
        {{/if}}
    </div>
`;
