function getPropByPath(obj, path, strict) {
  path = path.toString();
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  const keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null,
  };
}

function formatData(forma, source) {
  Object.keys(source).forEach((path) => {
    const item = getPropByPath(forma, path, true);
    item.o[item.k] = source[path];
  });
  return forma;
}

export { getPropByPath, formatData };
