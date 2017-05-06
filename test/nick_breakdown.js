// ** HOW SOME ** 

// Return true if even 1 element / object value is accepted by the callback.
const some = function(obj, callback=identity) {
  return reduce(obj, (anyPassed, item) => {
    return anyPassed || !!callback(item);
  }, false);
};

// ** HOW CONTAINS WORK **

const contains = function(obj, target) {
  //pass in an object and a target

  return reduce(obj, (wasFound, item) => {
/* those two paremeters are the accumulator and the currentValue
   the 'false' below is what 'wasFound' is set as
   if at any point, the item === target, then set wasFound as true
   (since there's no way for wasFound to get set back to false, it
 will return true as long as  a single item === target */
    return wasFound || item === target;
  }, false);
};

// ** HOW UNIQ WORKS **

const uniq = function(obj) {
  //call it with an object

  const foundItems = {};
  //it makes a blank object

  return filter(obj, item => {
    return !(item in foundItems) && (foundItems[item] = true);
        //the first condition is saying, return true if item is NOT in object
        //AND it's setting 'item' as a key in the object, with the value 'true';
          //(why is that in the return stack?) that's weird
        //and WHEN a given item is returned as true, that means that it will be 
        //included in the array that filter returns

        //NOTE - if the first part isn't true, it will never get to the other part.
        //It's called a 'short circuit evaluation or some equivalent'
  });
};

// ** HOW PLUCK WORKS ** 

const pluck = function(obj, key) {
  // it takes an object and a key

  return map(obj, item => item[key]);

  //it calls map on every object, and the callback function 
  //just returns the given key of each item
};


// ** HOW REDUCE WORKS ** 

const reduce = function(obj, callback=identity, initialValue) {
  /* reduce has 3 parameters
    1: the object or array itself
    2: the callback function 
    3: the initialValue of the accumulator
  */ 

  let accumulator = initialValue;

  //accumulator gets set to initialValue
    //if no initialValue is set, it will be set to undefined

  let initializing = accumulator === undefined;

  //if no initialValue set, initializing === true;
  //if initialValue set, initializing === false;

  each(obj, (currentValue, currentIndexOrKey, iteratedObj)  => {
    /*each automatically pushes in 
      1: the current element
      2: the curent index
      3: the whole obj*/


    if (initializing) {
      initializing = false;
      accumulator = currentValue;
    } else {
      accumulator = callback(accumulator, currentValue, currentIndexOrKey, iteratedObj);
      /* it passes 4 parameters into the callback
        1: the accumulator, the current element, the current index, and the whole obj
      */
    }
  });
  return accumulator;
};

// ** HOW EACH WORKS **

const each = function(obj, callback) {
    //ea

  if (isArrayLike(obj)) {
    for (let index = 0; index < obj.length; index++) {
      callback(obj[index], index, obj);
    }
  } else {
    for (let key in obj) {
      callback(obj[key], key, obj);
    }
  }
};

/* 

Each does 2 main things
* 1: it is the only function in the underbar tree, that differentiates between
  objects, and arrays
    //for loop if arrayLike
    //forin loop if !arrayLike
* 2: it passes 3 parameters to the given callback function.
  the order is, the single element, the index of that element, and the whole obj/array
