// function calculateLetterFrequency(input: string) {
//   const letterCountArray: { letter: string; count: number }[] = [];
//   console.log("input: ", input);

//   for (const letter of input) {
//       console.log("letter: ", letter);
//       let foundLetterItem: { letter: string; count: number } | undefined =
//           undefined;

//       for (const item of letterCountArray) {
//           if (item.letter === letter) {
//               foundLetterItem = item;
              
//           }
//       }

//       console.info("estado actual letterCountArray[]: ", letterCountArray);

//       if (foundLetterItem) {
//           console.info(
//               "incrementando valor: ",
//               foundLetterItem.letter,
//               "cantidad actual: ",
//               foundLetterItem.count,
//           );
//           incrementLetterCount(foundLetterItem);
//       } else {
//           console.info("agregando elemento: ", letter);
//           createLetterItem(letter, letterCountArray);
//       }
//   }

//   return letterCountArray;
// }

// function printLetterFrequency(
//   frequencyMap: { letter: string; count: number }[],
// ) {
//   console.log("Letter Frequency:");

//   for (const item of frequencyMap) {
//       console.log(`${item.letter}: ${item.count}`);
//   }
// }

// function incrementLetterCount(item: { letter: string; count: number }) {
//   item.count = item.count + 1;
// }

// function createLetterItem(
//   letter: string,
//   frequencyMap: { letter: string; count: number }[],
// ) {
//   frequencyMap.push({ letter: letter, count: 1 });
// }

// const inputString = "aaaaaaaaaabsdhfkdshfdhhdfhdhhhhhhhdfhdfggggggg";
// const frequencyMap = calculateLetterFrequency(inputString);
// printLetterFrequency(frequencyMap);




//--------------------------------Resolucion con Map-----------------------------------------
// const letterCountArray: { letter: string; count: number }[] = [];
//   console.log("input: ", input);

//   for (const letter of input) {
//       console.log("letter: ", letter);
//       let foundLetterItem: { letter: string; count: number } | undefined =
//           undefined;

//       for (const item of letterCountArray) {
//           if (item.letter === letter) {
//               foundLetterItem = item;
              
//           }
//       }

//       console.info("estado actual letterCountArray[]: ", letterCountArray);

//       if (foundLetterItem) {
//           console.info(
//               "incrementando valor: ",
//               foundLetterItem.letter,
//               "cantidad actual: ",
//               foundLetterItem.count,
//           );
//           incrementLetterCount(foundLetterItem);
//       } else {
//           console.info("agregando elemento: ", letter);
//           createLetterItem(letter, letterCountArray);
//       }
//   }

//   return letterCountArray;


/*
Problem statement: Program that calculates the average roll of
a D100 for ROLL_ITERATIONS. Please test and advise.
*/

/*
Problem statement: Program that calculates the average roll of
a D100 for ROLL_ITERATIONS. Please test and advise.
*/

type DiceRoll = {
  diceValue: number;
};

let ROLL_ITERATIONS = 999;
const  VALOR_MAXIMO : number = 9999; 




function main() {


  if (isNaN(ROLL_ITERATIONS)) {
    console.log("Debes ingresar un valor tipo Numero");
    return;
  }
  if (ROLL_ITERATIONS > VALOR_MAXIMO) {
    console.log(`El valor debe ser menor ${VALOR_MAXIMO}`);
    return;
  }

  let sum: number = 0;

  for (let iterator = 0; iterator < ROLL_ITERATIONS; iterator = iterator +1 ) {
    const roll = Math.round(Math.random() * 100)  ;
    sum += roll;
  }

  const average = sum / ROLL_ITERATIONS; 
  
  console.log(`average dice roll value: ${average}`);
}

main();
