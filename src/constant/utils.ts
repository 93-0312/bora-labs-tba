export const truncate = (text: string, num = 6): string => {
  const characters: number = text.length;
  if (characters >= 42) {
    return text.slice(0, num) + '...' + text.substring(characters - num);
  } else {
    return text;
  }
};

export const copy = (ref: string): void => {
  const copyText = document.createElement('input');
  document.body.appendChild(copyText);
  copyText.value = ref;
  copyText.select();
  document.execCommand('copy');
  document.body.removeChild(copyText);
};
