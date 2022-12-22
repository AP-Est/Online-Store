export default function createButton(title = 'unnamedButton', className?: string): HTMLButtonElement {
    const button = document.createElement('button');
    if (className) button.classList.add(className);
    button.textContent = title;
    return button;
}
