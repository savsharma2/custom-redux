Function.prototype.myApply = function (context, args) {
  return this.call(context, ...args);
};

let myFunc = function (firstNum, sec, third) {
  console.log(firstNum, sec, third);
};

myFunc.myApply(null, [1, 2, 3]);
myFunc.apply(null, [4, 5, 6]);
