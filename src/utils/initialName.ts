export const initialName = (fullName: string) =>
  fullName
    .replace(/\b(\w)\w+/g, '$1')
    .replace(/\s/g, '')
    .replace(/\.$/, '')
    .toUpperCase();
