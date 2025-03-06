"use strict";
// function calculateLetterFrequency(input: string) {
//   const letterCountArray: { letter: string; count: number }[] = [];
//   console.log("input: ", input);
let ROLL_ITERATIONS = 999;
const VALOR_MAXIMO = 9999;
function main() {
    if (isNaN(ROLL_ITERATIONS)) {
        console.log("Debes ingresar un valor tipo Numero");
        return;
    }
    if (ROLL_ITERATIONS > VALOR_MAXIMO) {
        console.log(`El valor debe ser menor ${VALOR_MAXIMO}`);
        return;
    }
    let sum = 0;
    for (let iterator = 0; iterator < ROLL_ITERATIONS; iterator = iterator + 1) {
        const roll = Math.round(Math.random() * 100);
        sum += roll;
    }
    const average = sum / ROLL_ITERATIONS;
    console.log(`average dice roll value: ${average}`);
}
main();
