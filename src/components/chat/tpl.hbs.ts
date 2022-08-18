export const tpl = `
  <div class="chat-block__content">
    <div class="chat-block__content-item chat-block__header">
      <div class="chat-block__header-avatar">{{{avatar}}}</div>
      <div class="chat-block__header-name">{{ userName }}</div>
      {{{iconD}}}
      <div class="dropdown-content logic-block">
        <ul class="ul">
          <li id="li-add-user">Добавить пользователя</li>
          <li id="li-del-user">Удалить пользователя</li>
        </ul>
      </div>
    </div>
    <div class="chat-block__content-item chat-block__main">
      {{#each msgList as |itemdMsg idMsg|}}
        <div class="chat-row chat-row-{{itemdMsg.type}} flex">
          <div class="msg">
            {{itemdMsg.text}}
            <span class="msg__time">{{itemdMsg.time}}</span>
          </div>
        </div>
      {{/each}}
    </div>
    <div class="chat-block__content-item chat-block__footer flex flex_direction_row flex_justify-content_space-between">
      {{{iconAttach}}}
      {{{sendMsg}}}
      {{{iconArrow}}}
    </div>
  </div>
  <div class="chat-block__content-not-selected-chat flex_justify-content_center flex_align-items_center">
    <span class="logic-block__text">Выберите чат, чтобы начать общение</span>
  </div>
  {{{modal}}}
`;
