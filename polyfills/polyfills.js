// bind method
(() => {
  Function.prototype.myApply = function (context, args) {
    return this.call(context, ...args);
  };

  let myFunc = function (firstNum, sec, third) {
    console.log(firstNum, sec, third);
  };

  myFunc.myApply(null, [1, 2, 3]);
  myFunc.apply(null, [4, 5, 6]);

});

// Call Method 
(() => {
  Function.prototype.myCall = function (context, ...args) {
    return this.apply(context, args);
  };
  
  let myFunc = function (firstNum, sec, third) {
    console.log(firstNum, sec, third);
  };
  
  myFunc.myCall(null, 1, 2, 3);
  myFunc.call(null, 4, 5, 6);
});

// Bind Method 
(() => {
  Function.prototype.myBind = function (context) {
      return (...args) => {
        return this.call(context, ...args);
      };
  };

      let obj = {
        name: "Jack"
      };

      let myFunc = function () {
        console.log(`${this.name}`);
      };

      const b1 = myFunc.bind(obj);
      const b2 = myFunc.myBind(obj);

      b1();
      b2();
});

// Debounce Method 
(() => {
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
});

// Throttle Method 
(() => {
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
});
