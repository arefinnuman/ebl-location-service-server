"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandom4DigitNumber = void 0;
function generateRandom4DigitNumber() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
exports.generateRandom4DigitNumber = generateRandom4DigitNumber;
