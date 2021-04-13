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
  const sanitized = toSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const condition = new RegExp(sanitized, 'i');
  return objArr.filter(o => {
    return condition.test(o[field]);
  });
};

const strictFilter = (objArr, field, toSearch) => {
  return objArr.filter(o => {
    return o[field] === toSearch;
  });
};

module.exports = {
  insensitiveFilter: insensitiveFilter,
  strictFilter: strictFilter
};
