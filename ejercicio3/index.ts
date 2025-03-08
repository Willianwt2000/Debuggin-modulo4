
/*
  Customer states: Application generates a CSV export of personnel data;
  upon attempting to import this data to Microsoft SQL Server, data is
  corrupted; please diagnose and advise.

  CSV is formatted exactly as table is defined: (varchar, integer, varchar, varchar).
*/

import * as fs from 'fs';

function extractWords(line: string): string[] {
	const values: string[] = [];
	let amInCommaDelineatedString = false;
	let currentWord = "";

	for (const character of line) {
		if (amInCommaDelineatedString && character !== '"') {
			currentWord += character;
		}

		if (character === '"') {
			amInCommaDelineatedString = !amInCommaDelineatedString;
			if (currentWord.length > 0) {
				values.push(currentWord);
				currentWord = "";
			}
		}
	}
	return values;
}

function validateData(
	values: string[],
): { isValid: true } | { isValid: false; errorMessage: string } {
	if (values.length !== 4) {
		return { isValid: false, errorMessage: "Length of row must be 4." };
	}

	//Validacion del nombre.
	if (values[0].replace(/\s+/, "").length === 0) {
		return { isValid: false, errorMessage: "Name is required." };
	}

	//Edad que sea numero
	const ageAsNumber = Number.parseInt(values[1]);
	if (Number.isNaN(ageAsNumber) || ageAsNumber < 0 || ageAsNumber > 150) {
		return { isValid: false, errorMessage:  "Age is invalid." };
	}

	//Profesion
	if (values[2].replace(/\s+/, "").length === 0) {
		return { isValid: false, errorMessage: "Profession is required." };
	}

	//Genero
	if (!["male", "female"].includes(values[3].toLowerCase())) {
		return { isValid: false, errorMessage: "Gender is invalid." };
	}

	return { isValid: true };
}

function parseCSV(filePath: string, hasHeader: boolean): string[][] {
	const fileContent = fs.readFileSync(filePath, "utf-8");
	const lines = fileContent.split("\n");
	const parsedCSV: string[][] = [];
	let lineNumber = 0;

	for (const line of lines) {
		lineNumber += 1;
		if (hasHeader && lineNumber === 1) {
			continue;
		}

		const values = extractWords(line);
		const validation = validateData(values);
		if (validation.isValid) {
			parsedCSV.push(values);
		} else {
			console.error("Invalid data, stopping program.");
			console.error(line);
			console.error(`Line ${lineNumber}: ${validation.errorMessage}`);
			process.exit(-1);
		}
	}
	return parsedCSV;
}

const filePath = "../ejercicio3/sample.csv";
const parsedData = parseCSV(filePath, true);
console.log(parsedData);
