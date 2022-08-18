export const tpl = `
    <div class="dialog-item__group dialog-item__avatar">
        {{{avatar}}}
    </div>
    <div class=" dialog-item__group dialog-item__group_big flex_wrap_wrap">
        <div class="dialog-item__group_top">
            <span class="dialog-item__user-name">{{userName}}</span>
        </div>
        <div class="dialog-item__group_bottom"><p class="dialog-item__msg shortcut">{{text}}</p></div>
    </div>
    <div class="dialog-item__group dialog-item__group_end">
        <div class="dialog-item__group_top">
            <span class="dialog-item__user-time">{{time}}</span>
        </div>
        <div class="dialog-item__marker"></div>
    </div>
`;
