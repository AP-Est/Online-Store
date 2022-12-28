export default function createElement(tag: string, className?: string) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
}
