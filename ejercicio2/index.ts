const ROLL_ITERATIONS = 10000000000;
const DEFAULT_TIMEOUT_VALUE = 60 * 1000; /*esto es en milisegundos*/

function calculateAverage() {
    const startDate = Date.now();
    let DiceRolls = 0;

    for (let iterator = 1; iterator <= ROLL_ITERATIONS; iterator = iterator + 1) {
        const roll: number = Math.round(Math.random() * 100);
        DiceRolls += roll;

        if (iterator % Math.floor(ROLL_ITERATIONS / 1000) === 0) {
            const timeSpanned = Date.now() - startDate;
            if (timeSpanned >= DEFAULT_TIMEOUT_VALUE) {
                return DiceRolls / iterator;
            }
            console.info(
                `Milliseconds spanned:[${timeSpanned}], with ${iterator} iterations => ${DiceRolls / iterator}`,
            );
        }
    }

    const average = DiceRolls / ROLL_ITERATIONS;
    return average;
}

async function main() {
    console.info(calculateAverage());
}

main();