import { expect, test } from "vitest";
import {
  MathType,
  nextTheme,
  CSSvarfy,
  themeArr,
  commafier,
  isOperatorEmpty,
  getNonDecimalStrg,
  MathArr,
  getTotal,
  isOperator,
  deleteDigit,
} from ".";

// display logic: decimal pain

// calc logic: actions

test("correctly delete digits", () => {
  const deleteMockRight: MathType = {
    leftSide: 123,
    operation: "+",
    rightSide: 10,
    action: "delete",
    //the total is porposefully wrong to test display logic outside of calc logic
    total: "default",
    isRightSide: true,
  };
  const deleteMockLeft: MathType = {
    leftSide: 123,
    operation: "+",
    rightSide: 10,
    action: "delete",
    //the total is porposefully wrong to test display logic outside of calc logic
    total: "default",
    isRightSide: false,
  };
  const answerMockRight: MathType = {
    leftSide: 123,
    operation: "+",
    rightSide: 1,
    action: "default",
    //the total is porposefully wrong to test display logic outside of calc logic
    total: "default",
    isRightSide: true,
  };
  const answerMockLeft: MathType = {
    leftSide: 12,
    operation: "+",
    rightSide: 10,
    action: "default",
    //the total is porposefully wrong to test display logic outside of calc logic
    total: "default",
    isRightSide: false,
  };
  deleteDigit(deleteMockRight);
  deleteDigit(deleteMockLeft);
  expect(deleteMockRight).toStrictEqual(answerMockRight);
  expect(deleteMockLeft).toStrictEqual(answerMockLeft);
});

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

test("correct bool logic to math operators", () => {
  const shouldBeFalse: MathType = {
    leftSide: 123,
    operation: "default",
    rightSide: "default",
    action: "default",
    total: "default",
    isRightSide: true,
  };
  const shouldBeTrue1: MathType = {
    leftSide: "default",
    operation: "default",
    rightSide: "default",
    action: "default",
    total: "default",
    isRightSide: true,
  };
  const shouldBeTrue2: MathType = {
    leftSide: 123,
    operation: "default",
    rightSide: 456,
    action: "default",
    total: "default",
    isRightSide: false,
  };

  expect(isOperatorEmpty(shouldBeFalse)).toBe(false);
  expect(isOperatorEmpty(shouldBeTrue1)).toBe(true);
  // implementation detail: isRS is only changed on operation selection, so though this is the expected result, the current app behaviour would need to be changed/refactored
  expect(isOperatorEmpty(shouldBeTrue2)).toBe(false);
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
