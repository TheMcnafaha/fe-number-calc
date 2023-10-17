import { expect, test } from "vitest";
import {
  CheckedMathType,
  MathNode,
  MathGalactusStack,
  MathType,
  doMath,
  getStackDisplay,
  isCheckedMathType,
  resetMathOperation,
  addNewMathNode,
  getDisplayOfMathNode,
  newLeftShiftMathNode,
  leftShift,
  NeoGalactusStack,
  head,
  manageMathActions,
  getHeadNode,
  decimator,
  trueIfAllInputFilled,
  decimalAdjustAndReset,
  deleteDigit,
  isDeletingOnDecimal,
  handleDelete,
  nextTheme,
} from ".";
const mockMathNodeNumber: MathNode = {
  mathOperation: {
    leftSide: 10,
    operation: "+",
    rightSide: 10,
    action: "=",
    //the total is porposefully wrong to test display logic outside of calc logic
    total: 10,
    isRightSide: true,
  },
};
const mockMathNodeDefault: MathNode = {
  mathOperation: {
    leftSide: "default",
    operation: "+",
    rightSide: 10,
    action: "=",
    //the total is porposefully wrong to test display logic outside of calc logic
    total: 10,
    isRightSide: true,
  },
};
const mockMathTypeDecimal: MathType = {
  leftSide: 10,
  operation: "default",
  rightSide: "default",
  action: ".",
  total: "default",
  isRightSide: true,
  leftSideDecimalOffSet: 2,
};

const MathNodeSubmitted: CheckedMathType = {
  leftSide: 10,
  operation: "+",
  rightSide: 10,
  action: "=",
  total: "default",
  isRightSide: true,
};
const mathNodeDecimalSubmitted: CheckedMathType = {
  leftSide: 123,
  leftSideDecimalOffSet: 2,
  operation: "+",
  rightSide: 123,
  rightSideDecimalOffSet: 1,
  action: "=",
  total: "default",
  isRightSide: true,
};
const correctDecimalSubmitted: CheckedMathType = {
  leftSide: 12.3,
  leftSideDecimalOffSet: undefined,
  operation: "+",
  rightSide: 1.23,
  rightSideDecimalOffSet: undefined,
  action: "=",
  total: "default",
  isRightSide: true,
};
export const defaultMathOperation: MathType = {
  rightSide: "default",
  operation: "default",
  leftSide: "default",
  action: "default",
  total: "default",
  isRightSide: false,
};
const mockMathStack: MathGalactusStack = [
  mockMathNodeNumber,
  mockMathNodeNumber,
];

const themeArr = [
  {
    key_text: "  hsl(221, 14%, 31%)",
    alt_key_text: "  hsl(0, 0%, 100%)",
    key_bg: "  hsl(30, 25%, 89%)",
    alt_key_bg: "  hsl(225, 21%, 49%)",
    key_border: "  hsl(28, 16%, 65%)",
    alt_key_border: "  hsl(224, 28%, 35%)",
    keypad_bg: "  hsl(223, 31%, 20%)",
    accent_bg: "  hsl(6, 63%, 50%)",
    accent_border: "  hsl(6, 70%, 34%)",
    display_bg: "  hsl(224, 36%, 15%)",
    bg_color: "  hsl(222, 26%, 31%)",
  },
  {
    key_text: "hsl(60, 10%, 19%)",
    alt_key_text: "  hsl(0, 0%, 100%)",
    key_bg: "hsl(45, 7%, 89%)",
    alt_key_bg: "hsl(185, 42%, 37%) ",
    key_border: "hsl(35, 11%, 61%)",
    alt_key_border: "hsl(185, 58%, 25%)",
    keypad_bg: "hsl(0, 5%, 81%) ",
    accent_bg: "hsl(25, 98%, 40%) ",
    accent_border: "hsl(25, 99%, 27%)",
    display_bg: "hsl(0, 0%, 93%) ",
    bg_color: "hsl(0, 0%, 90%)",
  },
];
// display logic

test("return true on submmited node", () => {
  expect(trueIfAllInputFilled(MathNodeSubmitted)).toBe(true);
});
test("return false on mostly submmited node", () => {
  const mostlyFIlled: MathType = { ...MathNodeSubmitted, rightSide: "default" };
  expect(trueIfAllInputFilled(mostlyFIlled)).toBe(false);
});
test("return a display of 10+10 from two mathNode with a total of 10 each", () => {
  expect(getStackDisplay(mockMathStack)).toBe("10+10");
});
// display logic: left-shifting

test("correctly leftshit a math node", () => {
  const answer: MathType = {
    leftSide: 20,
    operation: "default",
    rightSide: "default",
    action: "default",
    total: "default",
    isRightSide: true,
  };
  expect(leftShift(MathNodeSubmitted)).toStrictEqual(answer);
});
test("when input is submitted, create a new mathNode that's left-shifted", () => {
  let test: MathGalactusStack = [{ mathOperation: MathNodeSubmitted }];
  const answer = [
    { mathOperation: MathNodeSubmitted },
    {
      mathOperation: {
        leftSide: 20,
        operation: "default",
        rightSide: "default",
        action: "default",
        total: "default",
        isRightSide: true,
      },
    },
  ];
  expect(newLeftShiftMathNode(MathNodeSubmitted, test)).toStrictEqual(answer);
});
test('correctly "house-keep" the mathStack when the mathAction is submitted', () => {
  let test: NeoGalactusStack = {
    MathNodes: [MathNodeSubmitted],
    head: 0,
  };
  const answer: NeoGalactusStack = {
    head: 1,
    MathNodes: [
      MathNodeSubmitted,
      {
        leftSide: 20,
        operation: "default",
        rightSide: "default",
        action: "default",
        total: "default",
        isRightSide: true,
      },
    ],
  };
  expect(
    manageMathActions(getHeadNode(test).action, test, test.MathNodes[0]),
  ).toStrictEqual(answer);
});
test('correctly "house-keep" the mahtStack head when new mathNode is added', () => {
  let test: NeoGalactusStack = {
    MathNodes: [MathNodeSubmitted],
    head: 0,
  };
  const answer: NeoGalactusStack = {
    head: 1,
    MathNodes: [
      MathNodeSubmitted,
      {
        leftSide: 20,
        operation: "default",
        rightSide: "default",
        action: "default",
        total: "default",
        isRightSide: true,
      },
    ],
  };
  expect(
    getHeadNode(
      manageMathActions(getHeadNode(test).action, test, getHeadNode(test)),
    ),
  ).toStrictEqual(getHeadNode(answer));
});
// display logic: decimal pain

test("add correct decimal offset on first instance on mathNode", () => {
  expect(getDisplayOfMathNode(mockMathTypeDecimal)).toBe("10.");
});

// calc logic
test("add 10+10 (should return 20)", () => {
  let response: number | string = "failed";
  if (isCheckedMathType(mockMathNodeNumber.mathOperation)) {
    response = doMath(mockMathNodeNumber.mathOperation as CheckedMathType);
  }
  expect(response).toBe(20);
});
test("stop default values from doing math (failed response)", () => {
  let response: number | string = "failed";
  if (isCheckedMathType(mockMathNodeDefault.mathOperation)) {
    response = doMath(mockMathNodeDefault.mathOperation as CheckedMathType);
  }
  expect(response).toBe("failed");
});

test("reset the current mathOperation obj on submit/=", () => {
  let copy = {} as MathNode;
  Object.assign(copy, mockMathNodeDefault);
  expect(resetMathOperation(copy.mathOperation)).toStrictEqual(
    defaultMathOperation,
  );
});

test("add new node correctly", () => {
  let singleStack: MathGalactusStack = [mockMathNodeNumber];
  expect(addNewMathNode(mockMathNodeNumber, singleStack)).toStrictEqual(
    mockMathStack,
  );
});

test("decimate correctly", () => {
  expect(decimator(457, 0)).toBe(0.457);
  expect(decimator(457, 1)).toBe(4.57);
  expect(decimator(457, 2)).toBe(45.7);
});
test("convert decimal from mathNode correctly", () => {
  expect(decimalAdjustAndReset(mathNodeDecimalSubmitted)).toStrictEqual(
    correctDecimalSubmitted,
  );
});
test("dont mess with non-decimals", () => {
  expect(decimalAdjustAndReset(MathNodeSubmitted)).toStrictEqual(
    MathNodeSubmitted,
  );
});
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

test("return true if deleting on decimal point", () => {
  const testRigthSide: MathType = {
    leftSide: 10,
    operation: "default",
    rightSide: 123,
    rightSideDecimalOffSet: 3,
    action: "delete",
    total: "default",
    isRightSide: true,
    leftSideDecimalOffSet: 2,
  };
  const testLeftSide: MathType = {
    leftSide: 10,
    leftSideDecimalOffSet: 2,
    operation: "default",
    rightSide: "default",
    rightSideDecimalOffSet: undefined,
    action: "delete",
    total: "default",
    isRightSide: false,
  };

  expect(isDeletingOnDecimal(testRigthSide)).toBe(true);
  expect(isDeletingOnDecimal(testLeftSide)).toBe(true);
});
test("return false if not deliting on decimal point", () => {
  const testRightSide: MathType = {
    leftSide: 10,
    operation: "default",
    rightSide: 1234567,
    rightSideDecimalOffSet: 3,
    action: "delete",
    total: "default",
    isRightSide: true,
    leftSideDecimalOffSet: 2,
  };
  const testLeftSide: MathType = {
    leftSide: 101,
    leftSideDecimalOffSet: 2,
    operation: "default",
    rightSide: 1234567,
    rightSideDecimalOffSet: 3,
    action: "delete",
    total: "default",
    isRightSide: false,
  };

  expect(isDeletingOnDecimal(testRightSide)).toBe(false);
  expect(isDeletingOnDecimal(testLeftSide)).toBe(false);
});

test("only delete the decimal point when deleting on decimal point", () => {
  const testRightSide: MathType = {
    leftSide: 10,
    operation: "default",
    rightSide: 123,
    rightSideDecimalOffSet: 3,
    action: "delete",
    total: "default",
    isRightSide: true,
    leftSideDecimalOffSet: 2,
  };
  const rightSideAnswer: MathType = {
    leftSide: 10,
    operation: "default",
    rightSide: 123,
    rightSideDecimalOffSet: undefined,
    action: "default",
    total: "default",
    isRightSide: true,
    leftSideDecimalOffSet: 2,
  };
  deleteDigit(testRightSide);
  expect(testRightSide).toStrictEqual(rightSideAnswer);

  const leftSideTest: MathType = {
    leftSide: 10,
    operation: "default",
    rightSide: "default",
    rightSideDecimalOffSet: undefined,
    action: "delete",
    total: "default",
    isRightSide: false,
    leftSideDecimalOffSet: 2,
  };
  const leftSideAnswer: MathType = {
    leftSide: 10,
    operation: "default",
    rightSide: "default",
    rightSideDecimalOffSet: undefined,
    action: "default",
    total: "default",
    isRightSide: false,
    leftSideDecimalOffSet: undefined,
  };
  deleteDigit(leftSideTest);
  expect(leftSideTest).toStrictEqual(leftSideAnswer);
});

test("delete operator", () => {
  const test: MathType = {
    leftSide: 10,
    operation: "+",
    rightSide: "default",
    rightSideDecimalOffSet: undefined,
    action: "delete",
    total: "default",
    isRightSide: false,
    leftSideDecimalOffSet: 2,
  };
  const answer: MathType = {
    leftSide: 10,
    operation: "default",
    rightSide: "default",
    rightSideDecimalOffSet: undefined,
    action: "default",
    total: "default",
    isRightSide: false,
    leftSideDecimalOffSet: 2,
  };

  handleDelete(test);
  expect(test).toStrictEqual(answer);
});
test("currect get currentIndex", () => {
  const index_0 = {
    key_text: "  hsl(221, 14%, 31%)",
    alt_key_text: "  hsl(0, 0%, 100%)",
    key_bg: "  hsl(30, 25%, 89%)",
    alt_key_bg: "  hsl(225, 21%, 49%)",
    key_border: "  hsl(28, 16%, 65%)",
    alt_key_border: "  hsl(224, 28%, 35%)",
    keypad_bg: "  hsl(223, 31%, 20%)",
    accent_bg: "  hsl(6, 63%, 50%)",
    accent_border: "  hsl(6, 70%, 34%)",
    display_bg: "  hsl(224, 36%, 15%)",
    bg_color: "  hsl(222, 26%, 31%)",
  };
  const index_1 = {
    key_text: "hsl(60, 10%, 19%)",
    alt_key_text: "  hsl(0, 0%, 100%)",
    key_bg: "hsl(45, 7%, 89%)",
    alt_key_bg: "hsl(185, 42%, 37%) ",
    key_border: "hsl(35, 11%, 61%)",
    alt_key_border: "hsl(185, 58%, 25%)",
    keypad_bg: "hsl(0, 5%, 81%) ",
    accent_bg: "hsl(25, 98%, 40%) ",
    accent_border: "hsl(25, 99%, 27%)",
    display_bg: "hsl(0, 0%, 93%) ",
    bg_color: "hsl(0, 0%, 90%)",
  };

  const index_2 = {
    // - Very dark blue: hsl(198, 20%, 13%)
    key_text: "hsl(52, 100%, 62%)",
    alt_key_text: "  hsl(0, 0%, 100%)",
    key_bg: "hsl(268, 47%, 21%)",
    alt_key_bg: "hsl(281, 89%, 26%)",
    key_border: "hsl(290, 70%, 36%)",
    alt_key_border: "hsl(285, 91%, 52%)",
    keypad_bg: "hsl(176, 100%, 44%)",
    accent_bg: "hsl(177, 92%, 70%)",
    accent_border: "hsl(25, 99%, 27%)",
    display_bg: "hsl(0, 0%, 93%) ",
    bg_color: "hsl(268, 75%, 9%)",
  };

  expect(nextTheme(0, index_0)).toBe(0);
  expect(nextTheme(0, index_1)).toBe(1);
  expect(nextTheme(0, index_2)).toBe(2);
});
