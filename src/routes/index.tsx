import { component$, useSignal, useStore } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { CalculatorDisplay } from "~/components/calculator-display/calculator-display";
import { NumberInput } from "~/components/number-input/number-input";
import { ThreeStageToggle } from "~/components/three-stage-toggle/three-stage-toggle";
import { TextInputSlot } from "~/components/text-input-slot/text-input-slot";
import { LargeTextInputSlot } from "~/components/large-text-input-slot/large-text-input-slot";
export type Sides = "leftSide" | "rightSide";
export type MathType = {
  rightSide: number | "default";
  operation: Operators;
  leftSide: number | "default";
  action: Actions;
  total: number | "default";
  isRightSide: boolean;
  // right
  rightSideDecimalOffSet?: number;
  leftSideDecimalOffSet?: number;
};
export type MathNode = {
  leftInput: string;
  rightInput: string;
  operation?: Operators;
  total?: number;
};
export type MathInputType = {
  rightSide: number | "default";
  operation: Operators;
  leftSide: number | "default";
  action: Actions;
  total: number | "default";
  isRightSide: boolean;
};
export type MathArr = Array<string | NeoOperators>;
export type CheckedMathType = {
  rightSide: number;
  operation: Operators;
  leftSide: number;
  action: Actions;
  total: number | "default";
  isRightSide: boolean;
  rightSideDecimalOffSet?: number;
  leftSideDecimalOffSet?: number;
};
// we use arrs bc we can
export type MathGalactusStack = Array<MathNode>;
export type NeoGalactusStack = {
  head: number;
  MathNodes: Array<MathType>;
};
// operators are all arethmetic operators in nature
export type Operators = "+" | "-" | "x" | "/" | "default";
export type NeoOperators = "+" | "-" | "x" | "/" | undefined;
// actions are non-arethmetic display actions
export type Actions = "=" | "." | "delete" | "default";
type Display = {
  rightSide: string;
  operation: string;
  leftSide: string;
};
type Theme = {
  key_text: string;
  alt_key_text: string;
  key_bg: string;
  alt_key_bg: string;
  key_border: string;
  alt_key_border: string;
  keypad_bg: string;
  accent_bg: string;
  accent_border: string;
  display_bg: string;
  display_text: string;
  bg_color: string;
};
export const themeArr: Array<Theme> = [
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
    display_text: "hsl(0, 0%, 100%)",
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
    display_text: "hsl(60, 10%, 19%)",
    bg_color: "hsl(0, 0%, 90%)",
  },
  {
    // - Very dark blue: hsl(198, 20%, 13%)
    key_text: "hsl(52, 100%, 62%)",
    alt_key_text: "  hsl(0, 0%, 100%)",
    key_bg: "hsl(268, 47%, 21%)",
    alt_key_bg: "hsl(281, 89%, 26%)",
    key_border: "hsl(290, 70%, 36%)",
    alt_key_border: "hsl(285, 91%, 52%)",
    keypad_bg: "hsl(268, 71%, 12%)",
    accent_bg: "hsl(176, 100%, 44%)",
    accent_border: "hsl(177, 92%, 70%)",
    display_bg: "hsl(268, 71%, 12%)",
    display_text: "hsl(52, 100%, 62%)",
    bg_color: "hsl(268, 75%, 9%)",
  },
];
export default component$(() => {
  // remove this as its duplicate state
  const currentMathNode = useStore<MathNode>({
    // string must be initialized as empty strg so that concatination can happen smoothly
    leftInput: "",
    rightInput: "",
  });
  const mathArr = useSignal<MathArr>([]);
  const themeIndex = useSignal<number>(0);

  // const mathStack = useStore<MathGalactusStack>([]);
  // add commans when state changes,
  // could be optimazid but is no big deal
  return (
    <>
      <main class=" px-4 flex flex-col items-center">
        <div class="flex    justify-center">
          <div class="grid w-[260px] grid-cols-3 py-4">
            <h1 class="self-end text-display-text">Calc</h1>
            <p class="text-xs place-self-end uppercase text-display-text">
              Theme
            </p>
            <ThreeStageToggle index={themeIndex.value} id="toggle">
              <button
                id="toggle"
                class="w-3 h-3 bg-accent-bg rounded-full"
                onClick$={() => {
                  // toggleRootCSSVar("--bg-color", "red");
                  themeIndex.value = themeIndex.value + 1;
                  if (themeIndex.value > themeArr.length - 1) {
                    themeIndex.value = 0;
                  }
                  for (const key_name of Object.keys(
                    themeArr[themeIndex.value],
                  )) {
                    toggleRootCSSVar(
                      CSSvarfy(key_name),
                      themeArr[themeIndex.value][key_name as keyof Theme],
                    );
                  }
                  // Object.keys(themeArr[themeIndex.value]).forEach(
                  //   (key_name) => {
                  //     toggleRootCSSVar(
                  //       CSSvarfy(key_name),
                  //       themeArr[themeIndex.value][key_name],
                  //     );
                  //   },
                  // );
                }}
              ></button>
            </ThreeStageToggle>
            {
              <div class="text-display-text flex flex-wrap gap-3 w-[260px] mx-0 my-auto">
                <p>mathArr: {mathArr}</p>
              </div>
            }
          </div>
        </div>{" "}
        <CalculatorDisplay
          input={getDisplayFromMathArr(mathArr.value)}
        ></CalculatorDisplay>
        <section class="bg-keypad-bg   grid grid-rows-5 grid-cols-1 items-center rounded-lg gap-2 py-4">
          <div class="flex justify-center  h-full gap-3 px-4">
            <NumberInput
              input={7}
              currentMathNode={currentMathNode}
            ></NumberInput>
            <NumberInput
              input={8}
              currentMathNode={currentMathNode}
            ></NumberInput>

            <NumberInput
              input={9}
              currentMathNode={currentMathNode}
              // mathStore={mathStore}
              mathArr={mathArr}
            ></NumberInput>
            <TextInputSlot color="alt">
              <button
                value={"DEL"}
                onClick$={() => {
                  if (
                    currentMathNode.operation === undefined &&
                    currentMathNode.leftInput !== ""
                  ) {
                    currentMathNode.leftInput = currentMathNode.leftInput.slice(
                      0,
                      -1,
                    );
                    return;
                  }
                  if (
                    currentMathNode.operation !== undefined &&
                    currentMathNode.rightInput === ""
                  ) {
                    currentMathNode.operation = undefined;
                    return;
                  }
                  if (currentMathNode.rightInput !== "") {
                    currentMathNode.rightInput =
                      currentMathNode.rightInput.slice(0, -1);
                    return;
                  }
                }}
              >
                {"DEL"}
              </button>
            </TextInputSlot>
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <NumberInput
              input={4}
              currentMathNode={currentMathNode}
            ></NumberInput>
            <NumberInput
              input={5}
              currentMathNode={currentMathNode}
            ></NumberInput>
            <NumberInput
              input={6}
              currentMathNode={currentMathNode}
            ></NumberInput>
            <TextInputSlot color="normal">
              <button
                onClick$={() => {
                  mathArr.value = getOperator("+", mathArr.value);
                  // setOperator("+", currentMathNode);
                }}
              >
                +
              </button>
            </TextInputSlot>
            {
              // <TextInput input="+" color="normal" mathOperation={mathOperation} />
            }
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <NumberInput
              input={1}
              currentMathNode={currentMathNode}
            ></NumberInput>
            <NumberInput
              input={2}
              currentMathNode={currentMathNode}
            ></NumberInput>
            <NumberInput
              input={3}
              currentMathNode={currentMathNode}
            ></NumberInput>
            <TextInputSlot color="normal">
              <button
                onClick$={() => {
                  mathArr.value = getOperator("-", mathArr.value);
                  setOperator("-", currentMathNode);
                }}
              >
                -
              </button>
            </TextInputSlot>
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <TextInputSlot color="normal">
              <button
                value={"."}
                onClick$={() => {
                  if (currentMathNode.operation === undefined) {
                    if (!currentMathNode.leftInput.includes(".")) {
                      currentMathNode.leftInput =
                        currentMathNode.leftInput.concat(".");
                    }
                    return;
                  }
                  if (!currentMathNode.rightInput.includes(".")) {
                    currentMathNode.rightInput =
                      currentMathNode.rightInput.concat(".");
                  }
                }}
              >
                {"."}
              </button>
            </TextInputSlot>
            <NumberInput
              input={0}
              currentMathNode={currentMathNode}
            ></NumberInput>
            <TextInputSlot color="normal">
              <button
                onClick$={() => {
                  setOperator("/", currentMathNode);
                }}
              >
                /
              </button>
            </TextInputSlot>
            <TextInputSlot color="normal">
              <button
                onClick$={() => {
                  setOperator("x", currentMathNode);
                }}
              >
                x
              </button>
            </TextInputSlot>
          </div>
          <div class="grid px-4  grid-cols-2 gap-3  justify-between w-full">
            <LargeTextInputSlot color="normal">
              <button
                value={"reset"}
                onClick$={() => {
                  console.log("reseteted");
                  const resetted: MathNode = {
                    leftInput: "",
                    rightInput: "",
                    operation: undefined,
                    total: undefined,
                  };
                  Object.assign(currentMathNode, resetted);
                }}
              >
                {"RESET"}
              </button>
            </LargeTextInputSlot>
            <LargeTextInputSlot color="accent">
              <button
                onClick$={() => {
                  mathArr.value = [getTotal(mathArr.value)];
                  currentMathNode.total = doMath(currentMathNode);
                  Object.assign(currentMathNode, leftShift(currentMathNode));
                }}
              >
                =
              </button>
            </LargeTextInputSlot>
            {
              //
              // <LargeTextInput
              //   input="="
              //   color="accent"
              //   mathOperation={mathOperation}
              //   isPurpleTheme={themeIndex.value === 2}
              // ></LargeTextInput>
            }
          </div>
        </section>
      </main>
    </>
  );
});
export function doMath(mathOperation: MathNode): number {
  if (
    mathOperation.leftInput === "default" ||
    mathOperation.rightInput === "default"
  ) {
    return 0;
  }
  switch (mathOperation.operation) {
    case "+":
      return Number(mathOperation.leftInput) + Number(mathOperation.rightInput);
    case "-":
      return Number(mathOperation.leftInput) - Number(mathOperation.rightInput);
    case "x":
      return Number(mathOperation.leftInput) * Number(mathOperation.rightInput);
    case "/":
      if (Number(mathOperation.rightInput) === 0) {
        // :)
        return 0;
      }
      return Number(mathOperation.leftInput) / Number(mathOperation.rightInput);
    case "default":
    default:
      // this should make it clear something went wrong to the user without making it my problem lol
      return -10000;
  }
}
export function getDisplayOfMathNode(math: MathType): string {
  let responseString: Display = {
    rightSide: "",
    operation: "",
    leftSide: "",
  };
  if (math.total != "default") {
    return math.total.toString();
  }
  // TODO: refactor the double check of default on  setSideString
  if (math.leftSide != "default") {
    responseString.leftSide = setSideString("left", math);
  }
  if (math.operation != "default") {
    responseString.operation = math.operation.toString();
  }
  if (math.rightSide != "default") {
    responseString.rightSide = setSideString("right", math);
  }
  return (
    commafier(responseString.leftSide) +
    responseString.operation +
    commafier(responseString.rightSide)
  );
}
function getDisplayText(mathNode: MathNode): string {
  if (mathNode.operation === undefined) {
    return mathNode.leftInput;
  }
  return mathNode.leftInput + mathNode.operation + mathNode.rightInput;
}
// export function getStackDisplay(mathStack: MathGalactusStack) {
//   return mathStack.reduce((display: string, mathNode, i, a) => {
//     const currentTotal = getDisplayOfMathNode(mathNode.mathOperation);
//     if (i < a.length && i > 0) {
//       return display.concat("+", currentTotal.toString());
//     }
//     return display.concat(currentTotal.toString());
//   }, "");
// }
export function isCheckedMathType(mathOperation: MathType): boolean {
  const leftValue = mathOperation.leftSide;
  const rightValue = mathOperation.rightSide;
  if (leftValue != "default" && rightValue != "default") {
    return true;
  }
  return false;
}

export function resetMathOperation(mathOperation: MathType): MathType {
  mathOperation.leftSide =
    mathOperation.operation =
    mathOperation.rightSide =
    mathOperation.action =
    mathOperation.total =
      "default";
  mathOperation.isRightSide = false;
  mathOperation.leftSideDecimalOffSet = mathOperation.rightSideDecimalOffSet =
    undefined;
  return mathOperation;
}
export function addNewMathNode(
  mathNode: MathNode,
  mathStack: MathGalactusStack,
) {
  mathStack.push(mathNode);
  return mathStack;
}

export function leftShift(mathNode: MathNode): MathNode {
  if (mathNode.total === undefined) {
    return mathNode;
  }
  return {
    // TODO: find more less sketchy rounding xdd
    leftInput: (Math.round(mathNode.total * 10000) / 10000).toString(),
    rightInput: "",
    operation: undefined,
  };
}
// export function newLeftShiftMathNode(
//   newNode: MathType,
//   mathStack: MathGalactusStack,
// ): MathGalactusStack {
//   mathStack.push({ mathOperation: leftShift(newNode) });
//   return mathStack;
// }
//
// export function neoAddLeftShiftMathNoe(
//   newNode: MathType,
//   mathStack: NeoGalactusStack,
// ): NeoGalactusStack {
//   mathStack.MathNodes.push(leftShift(newNode));
//   return mathStack;
// }

// function getDisplayFromMathStack(
//   mathStack: NeoGalactusStack,
//   mathOperations: MathType,
// ): string {
//   // handle actions here before they are passed to the display node
//   if (mathOperations.action === "=") {
//     // TODO: refactor this code into the mageMathActions fn
//     // TODO: deprecated manageMathActions
//     manageMathActions(mathOperations.action, mathStack, mathOperations);
//     console.log("im better", getHeadNode(mathStack));
//     const newMathNode = getHeadNode(mathStack);
//     Object.assign(mathOperations, newMathNode);
//     return getDisplayOfMathNode(mathOperations);
//   }
//   manageMathActions(mathOperations.action, mathStack, mathOperations);
//
//   return getDisplayOfMathNode(mathOperations);
// }
export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
export function getHeadNode(mathStack: NeoGalactusStack | undefined): MathType {
  if (mathStack === undefined) {
    return {
      rightSide: "default",
      operation: "default",
      leftSide: "default",
      action: "default",
      total: "default",
      isRightSide: false,
    };
  }
  return mathStack.MathNodes[mathStack.head];
}
// export function manageMathActions(
//   type: Actions,
//   mathStack: NeoGalactusStack,
//   mathOperation: MathType,
// ) {
//   switch (type) {
//     case "=":
//       neoAddLeftShiftMathNoe(decimalAdjustAndReset(mathOperation), mathStack);
//       mathStack.head++;
//       console.log("new head ", getHeadNode(mathStack));
//
//       // newMathOperation(mathOperation, mathStack);
//       return mathStack;
//
//     case ".":
//       return;
//       if (mathOperation.isRightSide) {
//         if (mathOperation.rightSideDecimalOffSet === undefined) {
//           setDecimalOffSet(mathOperation, "right");
//         }
//       }
//       if (mathOperation.leftSideDecimalOffSet === undefined) {
//         setDecimalOffSet(mathOperation, "left");
//       }
//
//       // house-keeping
//       mathOperation.action = "default";
//
//     case "default":
//     default:
//       break;
//   }
// }
function newMathOperation(
  mathOperation: MathType,
  mathStack: NeoGalactusStack,
) {
  const newMathOperation = getHeadNode(mathStack);
  mathOperation.action = newMathOperation.action;
  mathOperation.leftSide = newMathOperation.leftSide;
  mathOperation.action = newMathOperation.action;
  mathOperation.rightSide = newMathOperation.rightSide;
  mathOperation.total = newMathOperation.total;
  mathOperation.isRightSide = newMathOperation.isRightSide;
}

export function decimator(input: number, offset: number): number {
  const stringRepresentation = input.toString();
  return Number(
    stringRepresentation.substring(0, offset) +
      "." +
      stringRepresentation.substring(offset),
  );
}
export function strgDecimator(input: number, offset: number): string {
  const stringRepresentation = input.toString();
  return (
    stringRepresentation.substring(0, offset) +
    "." +
    stringRepresentation.substring(offset)
  );
}
function setSideString(
  side: "left" | "right",
  mathOperation: MathType,
): string {
  if (side === "left") {
    if (
      mathOperation.leftSideDecimalOffSet !== undefined &&
      mathOperation.leftSide != "default"
    ) {
      return strgDecimator(
        mathOperation.leftSide,
        mathOperation.leftSideDecimalOffSet,
      );
    }
    return mathOperation.leftSide.toString();
  }

  if (
    mathOperation.rightSideDecimalOffSet !== undefined &&
    mathOperation.rightSide != "default"
  ) {
    return strgDecimator(
      mathOperation.rightSide,
      mathOperation.rightSideDecimalOffSet,
    );
  }
  return mathOperation.rightSide.toString();
}
export function decimalAdjustAndReset(
  mathOperation: CheckedMathType,
): CheckedMathType {
  if (mathOperation.leftSideDecimalOffSet !== undefined) {
    mathOperation.leftSide = decimator(
      mathOperation.leftSide,
      mathOperation.leftSideDecimalOffSet,
    );
    mathOperation.leftSideDecimalOffSet = undefined;
  }

  if (mathOperation.rightSideDecimalOffSet !== undefined) {
    mathOperation.rightSide = decimator(
      mathOperation.rightSide,
      mathOperation.rightSideDecimalOffSet,
    );
    mathOperation.rightSideDecimalOffSet = undefined;
  }

  return mathOperation;
}

export function trueIfAllInputFilled(math: MathType): boolean {
  /* 
              /=\\
             /===\ \
            /=====\' \
           /=======\'' \
          /=========\ ' '\
         /===========\''   \
        /=============\ ' '  \
       /===============\   ''  \
      /=================\' ' ' ' \
     /===================\' ' '  ' \
    /=====================\' '   ' ' \
   /=======================\  '   ' /
  /=========================\   ' /
 /===========================\'  /
/=============================\/

*/
  if (math.leftSide !== "default") {
    if (math.operation !== "default") {
      if (math.rightSide !== "default") {
        if (math.action !== "default") {
          if (math.total === "default") {
            return true;
          }
        }
      }
    }
  }
  return false;
}
export function setDecimalOffSet(input: MathType, side: "left" | "right") {
  if (side === "right") {
    input.rightSideDecimalOffSet = input.rightSide.toString().length;
    return;
  }
  input.leftSideDecimalOffSet = input.leftSide.toString().length;
}

export function deleteDigit(mathNode: MathType) {
  // house-keeping
  mathNode.action = "default";
  if (mathNode.isRightSide && mathNode.rightSide !== "default") {
    if (isDeletingOnDecimal(mathNode)) {
      mathNode.rightSideDecimalOffSet = undefined;
      return;
    }
    const number_string = mathNode.rightSide.toString();
    if (number_string.length <= 1) {
      mathNode.rightSide = "default";
      return;
    }
    mathNode.rightSide = Number(number_string.slice(0, -1));
    return;
  }
  if (mathNode.leftSide !== "default") {
    if (isDeletingOnDecimal(mathNode)) {
      mathNode.leftSideDecimalOffSet = undefined;
      return;
    }
    const number_string = mathNode.leftSide.toString();
    if (number_string.length <= 1) {
      mathNode.leftSide = "default";
      return;
    }
    mathNode.leftSide = Number(number_string.slice(0, -1));
    return;
  }
}

export function isDeletingOnDecimal(mathNode: MathType): boolean {
  if (mathNode.isRightSide) {
    if (mathNode.rightSideDecimalOffSet === undefined) {
      return false;
    }
    return (
      mathNode.rightSide.toString().length === mathNode.rightSideDecimalOffSet
    );
  }
  if (mathNode.leftSideDecimalOffSet === undefined) {
    return false;
  }
  return mathNode.leftSide.toString().length === mathNode.leftSideDecimalOffSet;
}

function deleteOperator(mathNode: MathType) {
  mathNode.operation = "default";
  mathNode.action = "default";
}

export function handleDelete(mathNode: MathType) {
  const isDeleteOperator: boolean =
    mathNode.rightSide === "default" && mathNode.operation !== "default";
  if (isDeleteOperator) {
    console.log("miss me with the operator");

    deleteOperator(mathNode);
    return;
  }
  deleteDigit(mathNode);
}

function toggleRootCSSVar(variable: string, new_value: string) {
  const root = document.querySelector(":root") as HTMLElement;
  root!.style.setProperty(variable, new_value);
}

export function nextTheme(themeObj: Theme) {
  const currentIndex = themeArr.findIndex(
    (e) => e.accent_bg === themeObj.accent_bg,
  );
  return currentIndex;
}
export function CSSvarfy(input: string): string {
  const textArr = input.split("_");
  // return `--${textArr[0]}-${textArr[1]}`;
  return textArr.reduce((str, key, i) => {
    if (i === 0) {
      return str.concat(`--${key}`);
    }

    return str.concat(`-${key}`);
  }, "");
}
export function commafier(input: string): string {
  let strg = input;
  if (strg.includes(".")) {
    let nonDecimalStrg = getNonDecimalStrg(strg);
    // changes in steps of 4 chars, but bc of 0-indexing, fn use 3 as the step count
    for (
      let replacenonDecimalStrg = nonDecimalStrg.length - 3;
      replacenonDecimalStrg > 0;
      replacenonDecimalStrg -= 3
    ) {
      nonDecimalStrg =
        nonDecimalStrg.substring(0, replacenonDecimalStrg) +
        "," +
        nonDecimalStrg.substring(replacenonDecimalStrg);
    }
    return nonDecimalStrg.concat(strg.substring(strg.indexOf(".")));
  }
  // changes in steps of 4 chars, but bc of 0-indexing, fn use 3 as the step count
  for (let replaceStrg = strg.length - 3; replaceStrg > 0; replaceStrg -= 3) {
    strg = strg.substring(0, replaceStrg) + "," + strg.substring(replaceStrg);
  }
  return strg;
}

export function isOperatorEmpty(mathNode: MathType): boolean {
  if (mathNode.leftSide != "default") {
    return false;
  }
  return true;
}

export function getNonDecimalStrg(input: string): string {
  const decimalIndex = input.indexOf(".");
  return decimalIndex === -1 ? input : input.substring(0, decimalIndex);
}

function getOperator(input: Operators, mathArr: MathArr): MathArr {
  const headValue = mathArr[mathArr.length - 1];
  if (headValue !== undefined) {
    // this condition is true when an operator is added, and we dont want to ever have more than one operator at the same time
    // see comment on next return statement
    if (headValue === "") {
      return mathArr;
    }
    // emtpy strg is added to  correctly concatenate
    return [...mathArr, input, ""];
  }
  return mathArr;
}
function setOperator(input: Operators, mathNode: MathNode) {
  if (mathNode.leftInput !== "" && mathNode.operation === undefined) {
    mathNode.operation = input;
  }
}

function getDisplayFromMathArr(mathArr: MathArr): string {
  let display = "";
  return mathArr.reduce((t, n) => {
    return t + n;
  }, "");
  for (const strg of mathArr) {
    console.log(strg);

    if (strg === undefined || strg === "") {
      continue;
    }
    display.concat(strg);
  }
  return display;
}

export function getTotal(mathArr: MathArr): string {
  let total = "";
  for (let index = 0; index < mathArr.length; index++) {
    const strg = mathArr[index];

    if (strg !== undefined) {
      if (isOperator(strg)) {
        const leftSide = mathArr[index - 1];
        const rightSide = mathArr[index + 1];
        if (leftSide && rightSide) {
          const mathNode: MathNode = {
            leftInput: leftSide,
            operation: strg as Operators,
            rightInput: rightSide,
          };
          console.log(mathNode);
          console.log(doMath(mathNode));

          console.log(total);
          const mathy_boi = doMath(mathNode).toString();
          total = mathy_boi;
          console.log(total);
          // todo: implement middle opartion
          // index += 2; good idea, is better done with a smart continue
          mathArr[index + 1] = mathy_boi;
        }
      }
    }
  }
  return total;
}

export function isOperator(input: string) {
  return /^[+-/x]$/.test(input);
}
