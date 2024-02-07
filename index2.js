// map

Array.prototype.polyMap = function (callback, argThis) {
  var newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(callback.call(argThis, this[i], i, this));
  }
  return newArr;
};

// filter

Array.prototype.polyFilter = function (callback, argThis) {
  var newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.call(argThis, this[i], i, this)) {
      newArr.push(this[i]);
    }
  }
  return newArr;
};

// reduce

Array.prototype.polyReduce = function (callback, initialValue) {
  var result = initialValue;
  for (let i = 0; i < this.length; i++) {
    if (result !== undefined) {
      result = callback(result, this[i], i, this);
    } else {
      result = this[i];
    }
  }
  return result;
};

// forEach

Array.prototype.polyForEach = function (callback, argThis) {
  for (let i = 0; i < this.length; i++) {
    callback.call(argThis, this[i], i, this);
  }
};

const arr = [34, 1, 6, 3, 12, 53, 6];

console.log(arr.forEach((el) => console.log(el * 10)));
console.log(arr.polyForEach((el) => console.log(el * 10)));
