function throttle(callback, limit) {
  var waiting = false; // Initially, we're not waiting
  return function () {
    // We return a throttled function
    if (!waiting) {
      // If we're not waiting
      callback.apply(this, arguments); // Execute users function
      waiting = true; // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false; // And allow future invocations
      }, limit);
    }
  };
}

const printSomething = (...args) => {
  console.log(...args);
};

const throttledFn = throttle(printSomething, 1000);
throttledFn("hello");
setTimeout(() => {
  throttledFn("anybody", "there");
  setTimeout(() => {
    throttledFn("last");
  }, 600);  
}, 500);
