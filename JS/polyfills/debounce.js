const startTime = new Date();

const logEndTime = () => {
  const endTime = new Date();

  console.log("time difference is ", (endTime - startTime) / 1000);
};

const Debounce = (fn, time) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    const self = this;
    timer = setTimeout(() => {
      fn.call(self, ...args);
      timer = undefined;
      logEndTime();
    }, time);
  };
};

const printSomething = (...args) => {
  console.log(...args);
};

const debouncedFn = Debounce(printSomething, 1000);
debouncedFn("hello");
setTimeout(() => {
  debouncedFn("anybody", "there");
}, 500);
