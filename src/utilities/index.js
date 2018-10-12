// @flow

// set possibly nested object key's value
export const setKeyValue = (obj: Object, keys: Array<string>, value: any) => {
  const index = keys[0];
  if (keys.length === 1) return (obj[index] = value);
  return setKeyValue(obj[index], keys.slice(1), value);
};
