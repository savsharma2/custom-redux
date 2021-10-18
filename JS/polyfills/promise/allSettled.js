/* 
    The Promise.allSettled() method returns a promise that resolves after all of the given promises have either fulfilled or rejected,
    with an array of objects that each describes the outcome of each promise. It is typically used when you have multiple asynchronous 
    tasks that are not dependent on one another to complete successfully, or you'd always like to know the result of each promise.
    In comparison, the Promise returned by Promise.all() may be more appropriate if the tasks are dependent on each other / 
    if you'd like to immediately reject upon any of them rejecting.
*/

const STATUS = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected"
};

Promise.myAllSettled = (promises) => {
  const result = {};
  return new Promise((res, rej) => {
    promises.forEach(async (promise, index) => {
      try {
        const resolvedPromise = await promise;
        // result.push(resolvedPromise);
        result[index] = { status: STATUS.FULFILLED, value: resolvedPromise };
        if (Object.keys(result).length === promises.length) {
          res(Object.values(result));
        }
      } catch (err) {
        result[index] = { status: STATUS.REJECTED, reason: err };
        if (Object.keys(result).length === promises.length) {
          res(Object.values(result));
        }
      }
    });
  });
};

const getPromise = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (time === 1000) {
        rej("error thrown");
      }
      res(time);
    }, time);
  });
};

const x1 = getPromise(20);
const y1 = getPromise(900);
const z1 = getPromise(1000);

Promise.allSettled([x1, y1, z1])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(`error is ${err}`);
  });

Promise.myAllSettled([x1, y1, z1])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(`error is ${err}`);
  });
