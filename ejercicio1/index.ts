const leastCommonMultiple = (a: number, b: number) =>
  (a * b) / greatestCommonDivisor(a, b);

const greatestCommonDivisor = (a: number, b: number): number => {
  // if (b === 0) {
  //   return a;
  // }
  // return greatestCommonDivisor(b, a % b);
  //   while b ≠ 0
  //   t := b
  //   b := a mod b
  //   a := t
  // return a


  let a1 = a;
  let b1 = b;

  while (b1 !== 0) {
    const t = b1;
    b1 = a1 % b1;
    a1 = t
  }

  return a1
};

const num1 = 450;
const num2 = 305;

console.info(greatestCommonDivisor(6, 10));

const lcd = leastCommonMultiple(num1, num2);
console.log(`The LCM of ${num1} and ${num2} is:`, lcd);
