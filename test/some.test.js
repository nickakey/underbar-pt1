const _ = require('../underbar');

describe('some()', () => {
  it('returns true if any number is odd', () => {
    const nums = [2, 4, 5, 6];
    expect(_.some(nums, num => num % 2 === 1)).toBe(true);
  });

  it('returns false if no number is odd', () => {
    const nums = [2, 4, 6, 8];
    expect(_.some(nums, num => num % 2 === 1)).toBe(false);
  });

  it('returns true if any string is greater than 5 characters', () => {
    const strings = ['yo', 'how', 'are', 'you', 'calculator'];
    expect(_.some(strings, word => word.length >= 5)).toBe(true);
  });

});