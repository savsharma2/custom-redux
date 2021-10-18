/* The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises 
in an iterable fulfills or rejects, with the value or reason from that promise. */

const STATUS = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected"
};

Promise.myRace = (promises) => {
  return new Promise((res, rej) => {
    promises.forEach(async (promise, index) => {
      try {
        const resolvedPromise = await promise;
        res(resolvedPromise);
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

const x1 = getPromise(12);
const y1 = getPromise(1002);
const z1 = getPromise(1001);

Promise.race([x1, y1, z1])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(`error is ${err}`);
  });

Promise.myRace([x1, y1, z1])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(`error is ${err}`);
  });
