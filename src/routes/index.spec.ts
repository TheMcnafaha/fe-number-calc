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
