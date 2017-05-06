const _ = require('../underbar');

describe('uniq()', () => {
  it('de-dups a list of numbers', () => {
    const nums = [2, 4, 5, 5, 7, 4, 10, 2];
    expect(_.uniq(nums)).toEqual([2, 4, 5, 7, 10]);
  });

  it('de-dups a list strings', () => {
    const strings = ['hello', 'pizza', 'joke', 'weird', 'joke'];
    expect(_.uniq(strings)).toEqual(['hello', 'pizza', 'joke', 'weird']);
  });
});