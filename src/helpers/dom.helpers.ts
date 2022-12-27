export const isDescendant = function (
  parent: HTMLElement,
  child: HTMLElement
): boolean {
  let node = child.parentNode;
  while (node) {
    if (node === parent) return true;
    node = node.parentNode;
  }

  return false;
};
