Function.prototype.myCall = function (context, ...args) {
    return this.apply(context, args);
  };
  
  let myFunc = function (firstNum, sec, third) {
    console.log(firstNum, sec, third);
  };
  
  myFunc.myCall(null, 1, 2, 3);
  myFunc.call(null, 4, 5, 6);
  