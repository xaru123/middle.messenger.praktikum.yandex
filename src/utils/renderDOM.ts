import Block from '../services/block';

export function renderDOM(query: string, block: Block | null): HTMLElement {
  const root = document.querySelector(query) as HTMLElement;
  if (root) {
    root.appendChild(block!.getContent()!);
  }
  block!.dispatchComponentDidMount();

  return root;
}
