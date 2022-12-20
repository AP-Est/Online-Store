export default function createButton(title = 'unnamedButton'): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = title;
    return button;
}
