export function wasRemarkLinkClicked(
  clickedRemarks: string[],
  key: string
): boolean {
  if (clickedRemarks === undefined) {
    return false;
  } else {
    return clickedRemarks.includes(key);
  }
}
