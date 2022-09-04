export const tpl = `
    <div class="logic-block profile">
        <h1 class="logic-block__header">Профиль</h1>
          {{{avatar}}}
        <div class="profile__info">
            {{#each order as |orderItem IdOrder|}}
                <div class="profile__info-row">
                    <div class="profile__info-item profile__info-left"> {{orderItem.name}}             </div>
                    {{#with (lookup ../userInfo [field])~}}
                        <div class="profile__info-item profile__info-right"> {{this}} </div>
                    {{/with}}
                </div>
            {{/each}}
        </div>
        <div class="profile__links">
         {{#each listBlockLinks as | t1 idt |}}
            <a data-id="{{t1._id}}"></a>
          {{/each}}
        </div>
    </div>
    {{{modal}}}
`;
