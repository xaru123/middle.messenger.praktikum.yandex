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
          <li id="li-del-chat">Удалить чат</li>
        </ul>
      </div>
    </div>
    <div class="chat-block__content-item chat-block__main">
      {{#each listMessages as |itemdMsg idMsg|}}
        <div class="chat-row chat-row-{{itemdMsg.type}} flex">
          <div class="msg">
            {{itemdMsg.content}}
            <time class="msg__time">{{itemdMsg.time}}</time>
          </div>
        </div>
      {{/each}}
    </div>
    <div class="chat-block__content-item chat-block__footer">
      {{{sendMsg}}}
    </div>
  </div>
  <div class="chat-block__content-not-selected-chat flex_justify-content_center flex_align-items_center">
    <span class="logic-block__text">Выберите чат, чтобы начать общение</span>
  </div>
`;
