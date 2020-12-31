export const countValueInDifferent = (obj1: object, obj2: object) => {
  const key1s = Object.keys(obj1);
  const key2s = Object.keys(obj2);
  const _keys = key1s.length > key2s.length ? key1s : key2s;
  let result = 0;
  for (let i = 0; i < _keys.length; i++) {
    const currentKey = _keys[i];
    if (obj1[currentKey] !== obj2[currentKey] && (obj1[currentKey] || obj2[currentKey])) {
      result += 1;
    }
  }
  return result;
};
