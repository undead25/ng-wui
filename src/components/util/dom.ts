export function getOffset(el: HTMLElement) {
  const box = el.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  };
}

export function getOuterHeight(el: HTMLElement, margin?: boolean) {
  let height: number = el.offsetHeight;

  if (margin) {
    let style = getComputedStyle(el);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  }

  return height;
}

export function getOuterWidth(el: HTMLElement, margin?: boolean) {
  let width: number = el.offsetWidth;

  if (margin) {
    let style = getComputedStyle(el);
    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  }

  return width;
}
