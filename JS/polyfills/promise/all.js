/* 
  The Promise.all() method takes an iterable of promises as an input, 
  and returns a single Promise that resolves to an array of the results of the input promises. 
  This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. 
  It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, 
  and will reject with this first rejection message / error.
*/

Promise.myAll = (promises) => {
  const result = {};
  return new Promise((res, rej) => {
    promises.forEach(async (promise, index) => {
      try {
        const resolvedPromise = await promise;
        // result.push(resolvedPromise);
        result[index] = resolvedPromise;
        if (Object.keys(result).length === promises.length) {
          res(Object.values(result));
        }
      } catch (err) {
        rej(err);
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

Promise.all([x1, y1, z1])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(`error is ${err}`);
  });

Promise.myAll([x1, y1, z1])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(`error is ${err}`);
  });
