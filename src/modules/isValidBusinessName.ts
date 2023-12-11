export const isValidBusinessName = (name: string) => {
  const test = /^[a-zA-Z0-9-' ]*$/.test(name);
  return test;
};
