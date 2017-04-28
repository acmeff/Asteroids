const curriedSum = function(numArgs) {
  let numbers = [];

  const _curriedSum = function(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      let sum = 0;
      numbers.forEach((n) => sum += n);

      return sum;
    } else {
      return _curriedSum;
    }
  };

  return _curriedSum;
};
//
// const sum = curriedSum(3);
// console.log(sum(1)(2)(3));

Function.prototype.curry = function(numArgs) {
  let args = [];
  let that = this;

  // const _curry = function(arg) {
  //   args.push(arg);
  //   if (args.length === numArgs) {
  //     return that.apply(that, args);
  //   } else {
  //     return _curry;
  //   }
  // };

  const _curry = (arg) => {
    console.log(that)
    args.push(arg);
    if (args.length === numArgs) {
      return that.call(that, ...args);
    } else {
      return _curry;
    }
  };

  return _curry;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}
