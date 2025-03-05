/* Sorts array of numbers in descending order. */

function simpleInsertionSort(values: number[]): number[] {

    

  if (values.length <= 1) { //1
      return values;
  }

  const result: number[] = []; // [1]
  for (const value of values) {
      if (result.length === 0) {
          result.push(value);
      } else {
          const insertionIndex = result.findIndex(
              (resultValue) => resultValue < value,
          );

          if (insertionIndex === -1) {
            result.push(value);
        } else {
            result.splice(insertionIndex, 0, value);
        }

        //   result.splice(insertionIndex === -1 ? result.length: insertionIndex , 0, value);
         
      }
  }

  return result;



// for (let i = 1; i < values.length; i++) {
//     let aux = values[i];
//     console.log(`Valor de aux ${aux}`)
//     let posicionAnterior = i - 1;
//     console.log(`Valor posicion anterior ${posicionAnterior}`)

//     while (posicionAnterior >= 0 && aux > values[posicionAnterior]) {
//         values[posicionAnterior + 1] = values[posicionAnterior];
//         posicionAnterior--;
//     }
//     values[posicionAnterior + 1] = aux;
// }

// return values;



}

const sequence = [    34, -5, 12, -42, 7, 0, -19, 25, -8, 50,
    -33, 18, -21, 47, -3, 9, -55, 62, -14, 38,
    -29, 41, -7, 56, -12, 31, -44, 23, -16, 48,
    60, -25, 11, -37, 19, -6, 45, -50, 27, -30,
    -18, 52, -40, 33, -9, 22, -1, 39, -27, 49];
const sorted = simpleInsertionSort(sequence);
console.log(sorted);