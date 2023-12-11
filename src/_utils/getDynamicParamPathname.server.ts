export const getDynamicParamPathname = (url: string, params: any) => {
  let myUrl = url || '';

  Object.keys(params).forEach((key) => {
    const value = params[key];

    const splitted = myUrl?.split(`/`);

    const updatedArray = splitted.map((item) => {
      if (item === value) {
        return `[${key}]`;
      }

      return item;
    });

    myUrl = updatedArray.join('/');
  });

  return myUrl;
};
