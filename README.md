<img align="right" height="200" width="200" src="http://svgshare.com/i/3J7.svg">

# Closestᐁector
[![Build Status](https://travis-ci.org/meodai/ClosestVector.svg?branch=master)](https://travis-ci.org/meodai/ClosestVector)

Get closest Number / Point / Vector / VectorN from an array and caches the previous get request/response paris.

## Installation
`npm install closestvector --save` or `yarn add closestvector`

## Usage
```javascript
const Closest = require('closestvector');
const closest = new Closest([[255,0,0], [0,255,0], [0,0,255], [0,0,0]]);
closest.get([200,130,213]) // => [0,0,255]
```

**if you wish to return every value only once:**
```javascript
const closest = new Closest([[255,0,0], [0,255,0], [0,0,255], [0,0,0]], true);
closest.get([200,130,213]) // => [0,0,255] closest Vector
closest.get([200,130,213]) // => [255,0,0] next closest Vector
closest.clearCache() // resets the returned elements
closest.get([200,130,213]) // => [0,0,255] closest Vector
``` 

## Examples
### Closest Vector2 
```javascript
const Closest = require('closestvector');
const closestVector = new Closest([[1,2],[222,6],[222,5],[222,4]]);

closestVector.get([255,255]) // => {"closest":[222,6],"index":1}
closestVector.get([2,5]) // => {"closest":[1,2],"index":0}
closestVector.get([64,12]) // => {"closest":[1,2],"index":0}
```

### Unique closest Vector2
every vector can be retruned only once

```javascript
const Closest = require('closestvector');
const closestUniqueVector = new Closest([[1,2],[222,6],[222,5],[222,4]], true);

closestUniqueVector.get([255,255]) // => {"closest":[222,6],"index":1}
closestUniqueVector.get([255,255]) // => {"closest":[222,5],"index":2}
closestUniqueVector.get([255,255]) // => {"closest":[222,4],"index":3}
closestUniqueVector.get([255,255]) // => {"closest":[1,2],"index":0}
closestUniqueVector.get([255,255]) // => Null (Out of entries to return)
closestUniqueVector.clearCache()
closestUniqueVector.get([255,255]) // => {"closest":[222,6],"index":1}

```

### Closest Number
```javascript
const Closest = require('closestvector');
const closestNumber = new Closest([10,3,10,45,30,120]);

closestNumber.get(10) // => {closest: 10, index: 0}
closestNumber.get(100) // => {closest: 120, index: 5}
closestNumber.get(100000) // => {closest: 120, index: 5}
closestNumber.get(1) // => {closest: 3, index: 1}
```

### Closest Vector3 or RGB Color 
```javascript
const Closest = require('closestvector');
const closestColor = new Closest([
  [255,255,255],
  [0,0,0],
  [255,0,0],
  [0,255,0],
  [0,0,255],
  [0,255,255],
  [255,255,0]
]);
closestColor.get([0,192,200]) // => {"closest":[0,255,255],"index":5}
```

## How it works

From [the Wikipedia article on the subject](http://en.wikipedia.org/wiki/Nearest_neighbor_search):
> The simplest solution to the NNS problem is to compute the distance from the query point 
> to every other point in the database, keeping track of the "best so far". This algorithm, 
> sometimes referred to as the naive approach, has a running time of *O(Nd)* where *N* is 
> the cardinality of *S* and *d* is the dimensionality of *M*. There are no search data 
> structures to maintain, so linear search has no space complexity beyond the storage of the 
> database. Naive search can, on average, outperform space partitioning approaches on higher 
> dimensional spaces.

ClosestVector is inspired by [nearest-color] and was rewritten to solve snapping to coordinates in a less specific way. As nearest-color it uses the naive approach and caches the requests made, so the diffing only happens if the vector is requested for the first time.

[nearest-color]: https://github.com/dtao/nearest-color/
