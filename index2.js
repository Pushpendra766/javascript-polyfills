Array.prototype.polyMap = function (callback, argThis) {
  var newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(callback.call(argThis, this[i], i, this));
  }
  return newArr;
};

const arr = [34, 1, 6, 3, 12, 53, 6];

console.log(arr.map((el) => console.log(el)));
console.log(arr.polyMap((el) => console.log(el * 10)));
