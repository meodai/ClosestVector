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
