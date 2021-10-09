(() => {
  const curry = (fn) => {
    const context = this;

    return function currying(...args) {
      if (args.length >= fn.length) {
        return fn.apply(context, args);
      } else {
        return function (...moreArgs) {
          return currying(...args, ...moreArgs);
        };
      }
    };
  };

  const sum = (a, b, c) => {
    return a + b + c;
  };

  const curriedSum = curry(sum);

  console.log(curriedSum(1)(2, 2));
})();

(() => {
  const sum = (...args) => {
    
    function inner (...more) {
        return sum(...args, ...more);
    };
    const total = args.reduce((a, b) => {
        return a + b;
    }, 0);

    inner.toString = () => {
        return total;
    };
    return inner;
  };

  console.log(sum(1)(2)(2));
})();
