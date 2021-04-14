const escapeStringRegexp = require('escape-string-regexp');

/**
 * Realiza uma busca em array de objetos de um único nivel
 *
 * @autor @LeonanCarvalho
 * @param objArr
 * @param field
 * @param toSearch
 * @returns {*}
 */
const insensitiveFilter = (objArr, field, toSearch) => {
  const condition = new RegExp(escapeStringRegexp(toSearch), 'i');
  return objArr.filter(o => {
    return condition.test(o[field]);
  });
};

const strictFilter = (objArr, field, toSearch) => {
  return objArr.filter(o => {
    return o[field] === toSearch;
  });
};

const symmetricDiff = (arr1, arr2) => {
  return arr1
    .filter(x => !arr2.includes(x))
    .concat(arr2.filter(x => !arr1.includes(x)));
};

const getRandomValue = (arr, field) => {
  const random = Math.floor(Math.random() * arr.length);
  const value = arr[random];
  return value[field];
};

module.exports = {
  insensitiveFilter: insensitiveFilter,
  strictFilter: strictFilter,
  symmetricDiff: symmetricDiff,
  getRandomValue: getRandomValue,
};
