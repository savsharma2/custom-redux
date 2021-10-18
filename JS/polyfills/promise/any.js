/* 
    Promise.any() takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, 
    returns a single promise that resolves with the value from that promise. If no promises in the iterable fulfill 
    (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, a new 
    subclass of Error that groups together individual errors.
*/

const lodash = require('lodash');

const STATUS = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected"
};

Promise.myAny = (promises) => {
  const rejectedPromises = {};
  return new Promise((res, rej) => {
    promises.forEach(async (promise, index) => {
      try {
        const resolvedPromise = await promise;
        res(resolvedPromise);
      } catch (err) {
        rejectedPromises[index] = err;
        const rejectedValues = Object.values(rejectedPromises);
        if (rejectedValues.length === promises.length) {
            rej(rejectedValues);
        }
      }
    });
  });
};

const getPromise = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (time === 12 || time === 1002 || time === 1001) {
        rej("error thrown");
      }
      res(time);
    }, time);
  });
};

const x1 = getPromise(12);
const y1 = getPromise(1002);
const z1 = getPromise(1001);

Promise.any([x1, y1, z1])
  .then((res) => {
    console.log(`any is ${res}`);
  })
  .catch((err) => {
    console.log(`any error is ${err}`);
  });

Promise.myAny([x1, y1, z1])
  .then((res) => {
    console.log(`myAny is ${res}`);
  })
  .catch((err) => {
    console.log(`myAny error is ${err}`);
  });
