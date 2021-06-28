export const encodeBase64 = (str: string): string =>
  btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode(Number('0x' + p1)),
    ),
  );
