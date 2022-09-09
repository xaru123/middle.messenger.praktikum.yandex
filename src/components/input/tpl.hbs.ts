export const tpl = `
    <input id="{{id}}" class="input {{inputClass}}" type="{{type}}" name="{{id}}"
    {{disabled}} {{autofocus}}
      placeholder="{{placeholder}}" {{required}}>
    <label for="{{id}}">
        <span class="input-group__label">{{label}}</span>
        <span class="input-group__helper">{{textError}}</span>
    </label>
`;
