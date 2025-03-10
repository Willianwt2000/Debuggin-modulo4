"use strict";
/*
  Customer states: Application generates a CSV export of personnel data;
  upon attempting to import this data to Microsoft SQL Server, data is
  corrupted; please diagnose and advise.

  CSV is formatted exactly as table is defined: (varchar, integer, varchar, varchar).
*/
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function extractWords(line) {
    var values = [];
    var amInCommaDelineatedString = false;
    var currentWord = "";
    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
        var character = line_1[_i];
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
function validateData(values) {
    // Validación de tipos de datos
    if (typeof values[0] !== "string" ||
        typeof values[2] !== "string" ||
        typeof values[3] !== "string") {
        return { isValid: false, errorMessage: "Invalid data types in row." };
    }
    if (values.length !== 4) {
        return { isValid: false, errorMessage: "Length of row must be 4." };
    }
    //Validacion del nombre.
    if (values[0].replace(/\s+/, "").length === 0) {
        return { isValid: false, errorMessage: "Name is required." };
    }
    //Edad que sea numero
    var ageAsNumber = Number.parseInt(values[1]);
    if (Number.isNaN(ageAsNumber) || ageAsNumber < 0 || ageAsNumber > 150) {
        return { isValid: false, errorMessage: "Age is invalid." };
    }
    //Profesion
    if (values[2].trim().length === 0) {
        return { isValid: false, errorMessage: "Profession is required." };
    }
    //Genero
    var gender = values[3].toLowerCase();
    if (!["male", "female"].includes(gender)) {
        return { isValid: false, errorMessage: "Gender is invalid." };
    }
    return { isValid: true };
}
function parseCSV(filePath, hasHeader) {
    var fileContent = fs.readFileSync(filePath, "utf-8");
    var lines = fileContent.split("\n");
    var parsedCSV = [];
    var lineNumber = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        lineNumber += 1;
        if (hasHeader && lineNumber === 1) {
            continue;
        }
        var values = extractWords(line);
        var validation = validateData(values);
        if (validation.isValid) {
            parsedCSV.push(values);
        }
        else {
            console.error("Invalid data, stopping program.");
            console.error(line);
            console.error("Line ".concat(lineNumber, ": ").concat(validation));
            process.exit(-1);
        }
    }
    return parsedCSV;
}
var filePath = "../ejercicio3/sample.csv";
var parsedData = parseCSV(filePath, true);
console.log(parsedData);
