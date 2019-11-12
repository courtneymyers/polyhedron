// set possibly nested object key's value
function setKeyValue(
  obj: { [key: string]: any },
  keys: string[],
  value: any,
): void {
  const index = keys[0];
  if (keys.length === 1) return (obj[index] = value);
  return setKeyValue(obj[index], keys.slice(1), value);
}

export { setKeyValue };
