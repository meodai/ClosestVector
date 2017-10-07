(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Closest = factory());
}(this, (function () { 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Closest = function () {
  /**
   * Creates an instance of Closest.
   * @param {Array} list Elements of reference can be an Array of Numbers or 
   *                     Array's with an equal length
   * @param {Boolean} unique If set to true, every entry from `list` can be returned only once
   *                         unit clearCache() is called
   */
  function Closest(list, unique) {
    _classCallCheck(this, Closest);

    // creates a copy of list
    this.list = Array.from(list);

    this.dimensions = Closest.getDimensions(list[0]);

    this.unique = unique;

    // sets the adequate diff method based on the depth of the vectors     
    this.diff = this.dimensions > 1 ? Closest.nDimensionalDiff : Closest.oneDimensionalDiff;

    // inits the cache and indexCache properties
    this.clearCache();
  }

  /**
   * @static determines if the items in the list are simple numbers or arrays
   * @param {Number|Array} item 
   * @return number of dimensions (1 being a simple number, everything above is an array)
   */


  _createClass(Closest, [{
    key: 'clearCache',


    /**
     * Public method to rest cached values
     */
    value: function clearCache() {
      this.cache = {};
      this.indexCache = [];
    }

    /**
     * @param {Number|Array} val reference number or array 
     * @return {Object|Null} closes match within lists containing 
     *                      {
     *                         closest: {Number|Array} closes entry from list,
     *                         closestIndex: {Number} index within list,
     *                         distance: {Number} Distance within the coordinate system
     *                      }  
     */

  }, {
    key: 'get',
    value: function get(val) {
      var minDistance = Infinity;
      var closestIndex = 0;
      var closest = this.list[closestIndex];

      // is there a better way to do this? If "val" is only a number, it seams like a big
      // overhead to JSON stringify it everytime, I don't see an other way when val is an array
      // thought. Other than somthing like cache[val[0]][val[1]][val[3]] or whatever
      var valUID = JSON.stringify(val);

      // returns previously found match
      if (!this.unique && this.cache.hasOwnProperty(valUID)) {
        return this.cache[valUID];
      }

      // if set to return every value in the list only once
      // and being out of entries in the list
      if (this.unique && this.indexCache.length === this.list.length) {
        return null;
      }

      for (var i = 0; i < this.list.length; i++) {
        // skip if set to unique and value was returned previously 
        if (!(this.unique && this.indexCache.indexOf(i) > -1)) {
          var distance = this.diff(val, this.list[i]);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
            closest = this.list[i];
          }
        }
      }

      if (this.unique) {
        this.indexCache.push(closestIndex);
      }

      return this.cache[valUID] = { closest: closest, closestIndex: closestIndex, distance: minDistance };
    }
  }], [{
    key: 'getDimensions',
    value: function getDimensions(item) {
      return typeof item == 'number' ? 1 : item.length;
    }

    /**
     * @static diff function for simple numbers
     * @param {Number} val1 
     * @param {Number} val2 
     * @return Abstract difference between two numbers
     */

  }, {
    key: 'oneDimensionalDiff',
    value: function oneDimensionalDiff(val1, val2) {
      return Math.abs(val1 - val2);
    }

    /**
     * @static diff function for array's of N numbers
     * @param {Array} val1 
     * @param {Array} val2 
     * @return Euclidean distance (https://en.wikipedia.org/wiki/Euclidean_distance)
     */

  }, {
    key: 'nDimensionalDiff',
    value: function nDimensionalDiff(val1, val2) {
      return Math.sqrt(val1.reduce(function (acc, val, i) {
        return Math.pow(val - val2[i], 2) + acc;
      }, 0));
    }
  }]);

  return Closest;
}();

return Closest;

})));
