import { expect, test } from "vitest";
import {
  nextTheme,
  CSSvarfy,
  themeArr,
  commafier,
  getNonDecimalStrg,
  MathArr,
  getTotal,
  isOperator,
  removeMultiplicationOnce,
  multiplicationPass,
  divisionPass,
  removeDivisonOnce,
} from ".";

// display logic: decimal pain

// calc logic: actions

test("currect get currentIndex", () => {
  const index_0 = themeArr[0];
  const index_1 = themeArr[1];
  const index_2 = themeArr[2];
  expect(nextTheme(index_0)).toBe(0);
  expect(nextTheme(index_1)).toBe(1);
  expect(nextTheme(index_2)).toBe(2);
});

test("make key into css var", () => {
  expect(CSSvarfy("key_text")).toBe("--key-text");
  expect(CSSvarfy("alt_key_bg")).toBe("--alt-key-bg");
});

test("currectly add commas to big nums", () => {
  expect(commafier("100")).toBe("100");
  expect(commafier("1000")).toBe("1,000");
  expect(commafier("10000")).toBe("10,000");
  expect(commafier("100000")).toBe("100,000");
  expect(commafier("1000000")).toBe("1,000,000");
  expect(commafier("10000000")).toBe("10,000,000");
  expect(commafier("123000000")).toBe("123,000,000");
});

test("currectly add commas to big nums but ingnore the decimal", () => {
  expect(getNonDecimalStrg("1000.123")).toBe("1000");
  expect(commafier("1000.123")).toBe("1,000.123");
  expect(commafier("1000.123")).toBe("1,000.123");
  expect(commafier("10000.123")).toBe("10,000.123");
  expect(commafier("100000.123")).toBe("100,000.123");
  expect(commafier("1000000.123")).toBe("1,000,000.123");
  expect(commafier("10000000.123")).toBe("10,000,000.123");
  expect(commafier("123000000.123")).toBe("123,000,000.123");
});

test("do multi math right", () => {
  const testArr: MathArr = ["9", "+", "9", "+", "9"];
  const testArr2: MathArr = [
    "9",
    "+",
    "9",
    "+",
    "9",
    "+",
    "9",
    "+",
    "9",
    "+",
    "9",
  ];
  const answer2: MathArr = [
    `${9}`,
    "+",
    `${9 * 2}`,
    "+",
    `${9 * 3}`,
    "+",
    `${9 * 4}`,
    "+",
    `${9 * 5}`,
    "+",
    `${9 * 6}`,
  ];
  expect(getTotal(testArr)).toBe("27");
  expect(getTotal(testArr2)).toBe("54");
  // this test show mutability is expected
  expect(testArr2).toStrictEqual(answer2);
});

test("make sure regex works", () => {
  expect(isOperator("+")).toBe(true);
  expect(isOperator("++")).toBe(false);
  expect(isOperator("++")).toBe(false);
});

test("follow PEMDAS for multi", () => {
  const test = ["9", "+", "2", "x", "2"];
  const test2 = ["2", "x", "2"];
  const test3 = ["9", "+", "2", "x", "2", "+", "10"];
  const test4 = ["10", "+", "9", "x", "2", "x", "2"];
  const test5 = ["9", "x", "2", "+", "2", "+", "10", "x", "3"];
  expect(multiplicationPass(test2)).toStrictEqual({
    total: "4",
    deleteIndex: 1,
  });
  removeMultiplicationOnce(test);
  expect(test).toStrictEqual(["9", "+", "4"]);
  expect(getTotal(test)).toStrictEqual("13");
  removeMultiplicationOnce(test3);
  expect(getTotal(test3)).toBe("23");
  // test4 has two "x", so it must run twice to be accurate
  removeMultiplicationOnce(test4);
  removeMultiplicationOnce(test4);
  expect(getTotal(test4)).toBe("46");
  expect(getTotal(test5)).toBe("50");
});
test("follow PEMDAS for divi", () => {
  const test = ["9", "+", "2", "/", "2"];
  const test2 = ["2", "/", "2"];
  const test3 = ["9", "+", "2", "/", "2", "+", "10"];
  const test4 = ["10", "+", "50", "/", "5", "/", "2"];
  expect(divisionPass(test2)).toStrictEqual({
    total: "1",
    deleteIndex: 1,
  });
  removeDivisonOnce(test);
  expect(test).toStrictEqual(["9", "+", "1"]);
  expect(getTotal(test)).toStrictEqual("10");
  removeDivisonOnce(test3);
  expect(getTotal(test3)).toBe("20");
  // test4 has two "/", so it must be called twice
  removeDivisonOnce(test4);
  removeDivisonOnce(test4);
  expect(getTotal(test4)).toBe("15");
});

test("follow PEMDAS for both divi and multi", () => {
  const test = ["10", "+", "10", "x", "2", "/", "4", "+", "30"];
  const test2 = ["10", "+", "10", "x", "2", "/", "4", "+", "30"];
  expect(multiplicationPass(test)).toStrictEqual({
    total: "20",
    deleteIndex: 3,
  });
  removeMultiplicationOnce(test);
  expect(test).toStrictEqual(["10", "+", "20", "/", "4", "+", "30"]);
  expect(divisionPass(test)).toStrictEqual({
    total: "5",
    deleteIndex: 3,
  });
  removeDivisonOnce(test);
  expect(test).toStrictEqual(["10", "+", "5", "+", "30"]);
  // all ecompassing test
  expect(getTotal(test2)).toBe("45");
});
