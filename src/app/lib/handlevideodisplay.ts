function removeVideoExtension(str: string): string {
  const withOutExtension = str.split('.')[0];
  return withOutExtension;
}

export function removeUnderscores(str: string) {
  const newStr = str.replace(/_/g, ' ');
  const video = removeVideoExtension(newStr);
  return video;
}
