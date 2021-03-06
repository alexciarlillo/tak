import qs from 'qs';

/**
 * Loop through webpack entry
 * and add the hot middleware
 * @param  {Object} entry webpack entry
 * @return {Object} entry with hot middleware
 */
export default (entry) => {
  const results = {};
  const hotMiddlewareScript = `webpack-hot-middleware/client?${qs.stringify({
    timeout: 20000,
    reload: true,
  })}`;

  Object.keys(entry).forEach((name) => {
    results[name] = Array.isArray(entry[name]) ? entry[name].slice(0) : [entry[name]];
    results[name].unshift(hotMiddlewareScript);
  });
  return results;
};
