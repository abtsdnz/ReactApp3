export function getScrollParent(element: HTMLElement | null): HTMLElement | null {
    while (element && element !== document.body) {
        const overflowY = window.getComputedStyle(element).overflowY;
        if (overflowY === 'auto' || overflowY === 'scroll') {
            return element;
        }
        element = element.parentElement;
    }
    return document.body;
}