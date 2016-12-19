/**
 * Returns a curried version of a function
 *
 * @param {function} fn
 *
 * @public
 *
 * @return {function}
 */
export const curry = fn => {
  let arity = fn.length;

  return (...args) => {
    let firstArgs = args.length;
    if (firstArgs >= arity) {
      return fn(...args);
    } else {
      return (...secondArgs) => {
        return fn(...[...args, ...secondArgs]);
      }
    }
  }
};

/**
 * Applies a function to each element in an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
export const forEach = curry(function (fn, arr) {
  arr.forEach(fn);
});

/**
 * Maps a function to an array
 *
 * @param {function} fn
 * @param {Array} arr
 *
 * @function
 * @public
 *
 * @return {function}
 */
export const map = curry(function (fn, arr) {
  return arr.map(fn);
});