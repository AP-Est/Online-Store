export default function getElement(selector: string) {
    if (selector !== undefined && selector !== null) {
        const element = document.querySelector(selector) as HTMLElement;
        return element;
    }
}
