function detect(enumerable, callback) {
  if (enumerable.detect) {
    return enumerable.detect(callback);
  } else {
    for (let i=0; i<enumerable.length; i++) {
      if (callback(enumerable[i])) {
        return enumerable[i];
      }
    }
  }
}

function any(enumerable, callback) {
  if (enumerable.any) { return enumerable.any(callback); }

  for (let i=0; i<enumerable.length; i++) {
    if (callback(enumerable[i])) {
      return true;
    }
  }

  return false;
}

/**
 * Useful for array-like things that aren't
 * actually arrays, like NodeList
 */
function forEach(enumerable, callback) {
  if (enumerable.forEach) {
    enumerable.forEach(callback);
  } else {
    for (let i=0; i<enumerable.length; i++) {
      callback(enumerable[i], i);
    }
  }
}

function filter(enumerable, conditionFn) {
  const filtered = [];
  forEach(enumerable, i => {
    if (conditionFn(i)) { filtered.push(i); }
  });
  return filtered;
}

/**
 * @return {Integer} the number of items that are the same, starting from the 0th index, in a and b
 */
function commonItemLength(listA, listB) {
  let offset = 0;
  while (offset < listA.length && offset < listB.length) {
    if (listA[offset] !== listB[offset]) {
      break;
    }
    offset++;
  }
  return offset;
}

// return new array without falsy items like ruby's `compact`
function compact(enumerable) {
  return filter(enumerable, i => !!i);
}

function reduce(enumerable, callback, initialValue) {
  let previousValue = initialValue;
  forEach(enumerable, (val, index) => {
    previousValue = callback(previousValue, val, index);
  });
  return previousValue;
}

/**
 * @param {Array} array of key1,value1,key2,value2,...
 * @return {Object} {key1:value1, key2:value2, ...}
 */
function kvArrayToObject(array) {
  const obj = {};
  for (let i = 0; i < array.length; i+=2) {
    let [key, value] = [array[i], array[i+1]];
    obj[key] = value;
  }
  return obj;
}

function objectToSortedKVArray(obj) {
  const keys = Object.keys(obj).sort();
  const result = [];
  keys.forEach(k => {
    result.push(k);
    result.push(obj[k]);
  });
  return result;
}

// check shallow equality of two non-nested arrays
function isArrayEqual(arr1, arr2) {
  let l1 = arr1.length, l2 = arr2.length;
  if (l1 !== l2) { return false; }

  for (let i=0; i < l1; i++) {
    if (arr1[i] !== arr2[i]) { return false; }
  }
  return true;
}

export {
  detect,
  forEach,
  any,
  filter,
  commonItemLength,
  compact,
  reduce,
  objectToSortedKVArray,
  kvArrayToObject,
  isArrayEqual
};
