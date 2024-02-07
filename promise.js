const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject("P1 settled!"), 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("P2 settled!"), 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => reject("P3 settled!"), 3000);
});

// Promise.all

Promise.polyAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Arguments should be an array"));
    }
    var results = [];
    var remaining = promises.length;
    if (remaining === 0) {
      resolve(results);
    }
    promises.forEach((promise) => {
      Promise.resolve(promise).then(
        function (result) {
          results.push(result);
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        },
        function (err) {
          reject(err);
        }
      );
    });
  });
};

// Promise.allSettled

Promise.polyAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Arguments should be an array"));
    }
    var results = [];
    var remaining = promises.length;
    if (remaining === 0) {
      resolve(results);
    }
    promises.forEach((promise) => {
      promise.then(
        function (result) {
          results.push({ status: "fulfilled", value: result });
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        },
        function (err) {
          results.push({ status: "rejected", reason: err });
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        }
      );
    });
  });
};

// Promise.race()

Promise.polyRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Arguments should be an array"));
    }
    promises.forEach((promise) => {
      promise.then(
        function (result) {
          resolve(result);
        },
        function (err) {
          reject(err);
        }
      );
    });
  });
};

// Promise.any

Promise.polyAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError("Arguments should be an array"));
    }
    var errors = [];
    var remaining = promises.length;
    promises.forEach((promise) => {
      promise.then(
        function (result) {
          resolve(result);
        },
        function (err) {
          errors.push(err);
          remaining--;
          if (remaining === 0) {
            reject(new AggregateError("All got rejected", errors));
          }
        }
      );
    });
  });
};

Promise.any([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

Promise.polyAny([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
