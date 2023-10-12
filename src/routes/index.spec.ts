import { expect, test } from "vitest";
import { CheckedMathType, MathNode, MathGalactusStack, MathType, doMath, getStackDisplay, isCheckedMathType, resetMathOperation, addNewMathNode, getDisplayOfMathNode, newLeftShiftMathNode, leftShift } from ".";
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
const MathNodeSubmitted: CheckedMathType = {
  leftSide: 10,
  operation: "+",
  rightSide: 10,
  action: "=",
  total: "default",
  isRightSide: true,
};
const defaultMathOperation: MathType = {
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
// display logic
test("return a display of 10+10 from two mathNode with a total of 10 each", () => {
  expect(getStackDisplay(mockMathStack)).toBe("10+10");
});
// display logic: left-shifting

test("correctly leftshit a math node", ()=>{
	const answer:MathType={
  leftSide: 20,
  operation: "default",
  rightSide: "default",
  action: "default",
  total: "default",
  isRightSide: true,
}
	expect(leftShift(MathNodeSubmitted)).toStrictEqual(answer)
})
test("when input is submitted, create a new mathNode that's left-shifted", () => {
  let test: MathGalactusStack = [{ mathOperation: MathNodeSubmitted }];
  const answer = [
    { mathOperation: MathNodeSubmitted },
    {
      mathOperation: {
	leftSide: 20,
	operation:"default",
        rightSide: "default",
        action: "default",
        total: "default",
        isRightSide: true,
      },
    },
  ];
	expect(newLeftShiftMathNode(MathNodeSubmitted,test)).toStrictEqual(answer)
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
