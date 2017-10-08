export default class Closest {
  /**
   * Creates an instance of Closest.
   * @param {Array} list Elements of reference can be an Array of Numbers or
   *                     Array's with an equal length
   * @param {Boolean} unique If set to true, every entry from `list` can be returned only once
   *                         unit clearCache() is called
   */
  constructor(list, unique) {
    // creates a copy of list
    this.list = Array.from(list);

    this.dimensions = Closest.getDimensions(list[0]);

    this.unique = unique;

    // sets the adequate diff method based on the depth of the vectors
    this.diff = this.dimensions > 1 ? Closest.nDimensionalDiff : Closest.oneDimensionalDiff;

    // inits the cache and previouslyReturnedIndexes properties
    this.clearCache(false);
  }

  /**
   * @static determines if the items in the list are simple numbers or arrays
   * @param {Number|Array} item
   * @return number of dimensions (1 being a simple number, everything above is an array)
   */
  static getDimensions (item) {
    return typeof item == 'number' ? 1 : item.length;
  }

  /**
   * @static diff function for simple numbers
   * @param {Number} val1
   * @param {Number} val2
   * @return Abstract difference between two numbers
   */
  static oneDimensionalDiff (val1, val2) {
    return Math.abs(val1-val2);
  }

  /**
   * @static diff function for array's of N numbers
   * @param {Array} val1
   * @param {Array} val2
   * @return Euclidean distance (https://en.wikipedia.org/wiki/Euclidean_distance)
   */
  static nDimensionalDiff (val1, val2) {
    return Math.sqrt(
      val1.reduce((acc, val, i) => (Math.pow(val - val2[i], 2) + acc), 0)
    );
  }

  /**
   * Public method to rest cached value / result paris
   * especially if set to unique (return every match only once)
   * you may want to reset the previously returned indexes
   * @param {Boolean} indexOnly if you are using "unique" mode only the returned
   *                            indexes are cleared by default
   */
  clearCache (indexOnly = this.unique) {
    if(!indexOnly){
      this.cache = {};
    }
    this.previouslyReturnedIndexes = [];
  }

  /**
   * @param {Number|Array} val reference number or array
   * @return {Object|Null} closes match within lists containing
   *                      {
   *                         closest: {Number|Array} closest entry from list,
   *                         index: {Number} index within list,
   *                         distance: {Number} Distance within the coordinate system
   *                      }
   */
  get(val) {
    let minDistance = Infinity;
    let index = 0;
    let closest = this.list[index];

    // is there a better way to do this? If "val" is only a number, it seams like a big
    // overhead to JSON stringify it every-time, I don't see an other way when val is an array
    // thought. Other than something like cache[val[0]][val[1]][val[3]] or whatever
    const valUID = JSON.stringify(val);

    // returns previously found match
    if (!this.unique && this.cache.hasOwnProperty(valUID)) {
      return this.cache[valUID];
    }

    // if set to return every value in the list only once
    // and being out of entries in the list
    if (this.unique && this.previouslyReturnedIndexes.length === this.list.length) {
      return null;
    }

    for (var i = 0; i < this.list.length; i++) {
      // skip if set to unique and value was returned previously
      if( !(this.unique && this.previouslyReturnedIndexes.indexOf(i) > -1) ) {
        let distance = this.diff(val, this.list[i]);
        if (distance < minDistance) {
          minDistance = distance;
          index = i;
          closest = this.list[i];
        }
      }
    }

    // save previously returned indexes if set to unique mode, 
    if(this.unique) {
      this.previouslyReturnedIndexes.push(index);
    }

    // return and save in cache
    return this.cache[valUID] = {closest, index, distance: minDistance};
  }
}
