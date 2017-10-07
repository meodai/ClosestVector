const expect = require('chai').expect;
const Closest = require('.');

const simple = new Closest([1]);

describe('Closest', () => {
  it('Closest is a function', () => {
    expect(Closest).to.be.an('function');
  });

  it('be an instance of Closest', () => {
    expect(new Closest([1])).to.be.an.instanceof(Closest);
  });

  it('return correct closest vectors2', () => {
    const closestVector = new Closest([[1,2],[2,2],[4,4],[255,255]]);
    
    closestVector.get([255,255]);
    closestVector.get([2,5]);
    closestVector.get([64,12]);
    
    expect(closestVector.get([255,255])).to.deep.equal({
      "closest":[255,255],
      "closestIndex":3,
      "distance":0
    });
  });

  it('Closest.getDimensions to return 1 on number types', () => {
    expect(Closest.getDimensions(12.12)).to.be.equal(1);
    expect(Closest.getDimensions(1)).to.be.equal(1);
    expect(Closest.getDimensions(Infinity)).to.be.equal(1);
  });

  it('Closest.getDimensions to return correct amount of dimensions', () => {
    expect(Closest.getDimensions(10)).to.be.equal(1);
    const a = new Array(100).fill('1');
    expect(Closest.getDimensions(a)).to.be.equal(a.length);
  });
})