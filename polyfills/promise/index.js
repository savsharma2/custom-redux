const STATE = {
  PENDING: "pending",
  REJECTED: "rejected",
  RESOLVED: "resolved"
};

class CustomPromise {
  constructor(fn) {
    this.state = STATE.PENDING;
    this.resolver = this.resolver.bind(this);
    this.rejector = this.rejector.bind(this);
    // this.thenFn = null;
    this.thenFns = [];
    this.catchFn = null;
    fn(this.resolver, this.rejector);
  }

  resolver(args) {
    if (this.state === STATE.PENDING) {
      this.state = STATE.RESOLVED;
      this.thenFns.forEach((thenFn) => {
        const thenResponse = thenFn(this.resolvedData || args);
        // nested promise is missing
        if (thenResponse instanceof CustomPromise) {
            console.log('a');
        }
        this.resolvedData = thenFn(this.resolvedData || args);
      });
    }
  }

  rejector(...args) {
    if (this.state === STATE.PENDING) {
      this.state = STATE.REJECTED;
      if (this.catchFn) {
        this.catchFn(...args);
      } else {
        throw new Error(...args);
      }
    }
  }

  then = (thenFn) => {
    this.thenFns.push(thenFn);
    return this;
  };

  catch = (catchFn) => {
    this.catchFn = catchFn;
  };
}

const getPromise = (time) => {
  return new CustomPromise((res, rej) => {
    setTimeout(() => {
      if (time === 1000) {
        rej("error thrown");
      }
      res(time);
    }, time);
  });
};

getPromise(1002)
  .then((res) => {
    return res;
  })
  .then((res) => {
    console.log(res);
  });
