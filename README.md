# ClosestVector 🕋 
[![Build Status](https://travis-ci.org/meodai/ClosestVector.svg?branch=master)](https://travis-ci.org/meodai/ClosestVector)

returns the closest value / vector / vectorN from an array
caches the previous get requests

## Closest Vector2 
```javascript
const closestVector = new Closest([[1,2],[222,6],[222,5],[222,4]]);

closestVector.get([255,255]) // => {"closest":[222,6],"closestIndex":1,"distance":251.17722826721374}
closestVector.get([2,5]) // => {"closest":[1,2],"closestIndex":0,"distance":3.1622776601683795}
closestVector.get([64,12]) // => {"closest":[1,2],"closestIndex":0,"distance":63.788713735268246}
```

## Unique closest Vector2
every vector can be retruned only once

```javascript
const closestUniqueVector = new Closest([[1,2],[222,6],[222,5],[222,4]], true);

closestUniqueVector.get([255,255]) // => {"closest":[222,6],"closestIndex":1,"distance":251.17722826721374}
closestUniqueVector.get([255,255]) // => {"closest":[222,5],"closestIndex":2,"distance":252.16859439668534}
closestUniqueVector.get([255,255]) // => {"closest":[222,4],"closestIndex":3,"distance":253.16002844051033}
closestUniqueVector.get([255,255]) // => {"closest":[1,2],"closestIndex":0,"distance":358.50383540486706}
closestUniqueVector.get([255,255]) // => Null (Out of entries to return)
closestUniqueVector.clearCache()
closestUniqueVector.get([255,255]) // => {"closest":[222,6],"closestIndex":1,"distance":251.17722826721374}

```

## Closest Number
```javascript
const closestNumber = new Closest([10,3,10,45,30,120]);

closestNumber.get(10) // => {closest: 10, closestIndex: 0, distance: 0}
closestNumber.get(100) // => {closest: 120, closestIndex: 5, distance: 20}
closestNumber.get(100000) // => {closest: 120, closestIndex: 5, distance: 99880}
closestNumber.get(1) // => {closest: 3, closestIndex: 1, distance: 2}
```

## Closest Vector3 or RGB Color 
```javascript
const closestColor = new Closest([
  [255,255,255],
  [0,0,0],
  [255,0,0],
  [0,255,0],
  [0,0,255],
  [0,255,255],
  [255,255,0]
]);
closestColor.get([0,192,200]) // => {"closest":[0,255,255],"closestIndex":5,"distance":83.6301381082203}
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

ClosestColors uses the naive approach and caches the requests made, so the diffing only happens, if the vector is requested for the first time.
