export const tpl = `
    <label for="{{id}}" class="input-group__content" >
        <input id="{{id}}" class="input {{inputClass}}" tabindex="{{tabindex}}" type="{{type}}" name="{{id}}" 
        placeholder="{{placeholder}}">
        <span class="input-group__label">{{label}}</span>
        <span class="input-group__helper">{{textError}}</span>
    </label>
`;
