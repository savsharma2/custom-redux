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
