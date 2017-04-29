const sumWithArgs = function () {
  let sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
};

// console.log(sumWithArgs(2,3,4,5,6));

const sumWithRest = (...args) => {
  let sum = 0;
  args.forEach ((el) => sum += el)
  return sum;
};

// console.log(sumWithRest(2,3,4,5));


Function.prototype.myBind = function () {
  let args = Array.from(arguments);
  let bound = args.shift();
  let that = this;
  return function () {
    let otherArray = Array.from(arguments);
    args = args.concat(otherArray);
    that.apply(bound, args);
  };
};

Function.prototype.myBindRest = function (...args) {
  let bound = args.shift();
  let that = this;
  return function (...otherArray) {
    args = args.concat(otherArray);
    that.apply(bound, args);
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");

markov.says.myBindRest(breakfast, "meow", "Kush")();
markov.says.myBindRest(breakfast)("meow", "a tree");
markov.says.myBindRest(breakfast, "meow")("Markov");
