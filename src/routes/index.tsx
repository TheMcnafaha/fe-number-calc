import { component$, useSignal, $, useStore, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { server$, type DocumentHead } from "@builder.io/qwik-city";
import { CalculatorDisplay } from "~/components/calculator-display/calculator-display";
import { LargeTextInput } from "~/components/large-text-input/large-text-input";
import { NumberInput } from "~/components/number-input/number-input";
import { TextInput } from "~/components/text-input/text-input";
import { ThreeStageToggle } from "~/components/three-stage-toggle/three-stage-toggle";
export type Sides = "leftSide" | "rightSide";
export type MathType = {
  rightSide: number | "default";
  operation: Operators;
  leftSide: number | "default";
  action: Actions;
  total: number | "default";
  isRightSide: boolean;
};

export type CheckedMathType = {
  rightSide: number;
  operation: Operators;
  leftSide: number;
  action: Actions;
  total: number | "default";
  isRightSide: boolean;
};
export type MathNode = {
  mathOperation: MathType;
  prev?: MathNode;
};
// we use arrs bc we can
export type MathGalactusStack = Array<MathNode>;
export type NeoGalactusStack = {
  head: number;
  MathNodes: Array<MathType>;
};
export type Operators = "+" | "-" | "default";
export type Actions = "=" | "default";
type Display = {
  rightSide: string;
  operation: string;
  leftSide: string;
};
export function doMath(mathOperation: CheckedMathType): number {
  switch (mathOperation.operation) {
    case "+":
      return mathOperation.leftSide + mathOperation.rightSide;
    case "-":
      return mathOperation.leftSide - mathOperation.rightSide;
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
    math.isRightSide = false;
    return math.total.toString();
  }
  if (math.rightSide != "default") {
    responseString.rightSide = math.rightSide.toString();
  }
  if (math.operation != "default") {
    responseString.operation = math.operation.toString();
  }
  if (math.leftSide != "default") {
    responseString.leftSide = math.leftSide.toString();
  }
  const allResponseAreFilled =
    responseString.leftSide != "default" &&
    responseString.operation != "default" &&
    responseString.rightSide != "default";
  if (allResponseAreFilled && math.action != "default") {
    if (isCheckedMathType(math)) {
      const answer: number = doMath(math as CheckedMathType);
      math.total = answer;
      // addNewMathNode({ mathOperation: math }, mathStack);
      // resetMathOperation(math);
      return answer.toString();
    }
    return "lol";
  }
  return (
    responseString.leftSide +
    responseString.operation +
    responseString.rightSide
  );
}
export function getStackDisplay(mathStack: MathGalactusStack) {
  return mathStack.reduce((display: string, mathNode, i, a) => {
    const currentTotal = getDisplayOfMathNode(mathNode.mathOperation);
    if (i < a.length && i > 0) {
      return display.concat("+", currentTotal.toString());
    }
    return display.concat(currentTotal.toString());
  }, "");
}
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
  return mathOperation;
}
export function addNewMathNode(
  mathNode: MathNode,
  mathStack: MathGalactusStack,
) {
  mathStack.push(mathNode);
  return mathStack;
}

export function leftShift(math: CheckedMathType): MathType {
  return {
    leftSide: doMath(math),
    operation: "default",
    rightSide: "default",
    action: "default",
    total: "default",
    isRightSide: true,
  };
}
export function newLeftShiftMathNode(
  newNode: CheckedMathType,
  mathStack: MathGalactusStack,
): MathGalactusStack {
  mathStack.push({ mathOperation: leftShift(newNode) });
  return mathStack;
}

export default component$(() => {
  const mathOperation = useStore<MathType>({
    rightSide: "default",
    operation: "default",
    leftSide: "default",
    action: "default",
    total: "default",
    isRightSide: false,
  });

  const mathStack = useStore<NeoGalactusStack>({
    head: 0,
    MathNodes: [mathOperation],
  });
  // const mathStack = useStore<MathGalactusStack>([]);
  const display = useSignal<string>("");
  useTask$(({ track }) => {
    track(() => mathOperation.operation);
    if (isServer) {
      return;
    }
    console.log("changed ops");
    mathOperation.isRightSide = !mathOperation.isRightSide;
  });
  useTask$(({ track }) => {
    // this does log/track :)
    track(mathOperation);
    console.log("im tracking!!!");
    display.value = getDisplayFromMathStack(mathStack);
  });
  return (
    <>
      <main class=" px-4 flex flex-col items-center">
        <div class="flex w-full   justify-between">
          <h1>Calc</h1>

          <div>
            <ThreeStageToggle></ThreeStageToggle>
            <div class="text-white flex flex-wrap gap-3 w-[260px]">
              <p> isR: {`${mathOperation.isRightSide}`}</p>
              <p>
                {" "}
                side: {mathOperation.isRightSide ? "rightSide" : "leftSide"}
              </p>
              <p> leftS: {`${mathOperation.leftSide}`}</p>
              <p> rightS: {`${mathOperation.rightSide}`}</p>
              <p> opeation: {`${mathOperation.operation}`}</p>
              <p> action: {`${mathOperation.action}`}</p>
              <p> total: {`${mathOperation.total}`}</p>
            </div>
          </div>
        </div>{" "}
        <CalculatorDisplay input={display.value}></CalculatorDisplay>
        <section class="bg-keypad-bg   flex flex-col items-center rounded-lg gap-3 py-4">
          <div class="flex justify-center  gap-3 px-4">
            <NumberInput
              input={7}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <NumberInput
              input={8}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <NumberInput
              input={9}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <TextInput input="DEL" color="blue" mathOperation={mathOperation} />
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <NumberInput
              input={4}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <NumberInput
              input={5}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <NumberInput
              input={6}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <TextInput input="+" color="normal" mathOperation={mathOperation} />
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <NumberInput
              input={1}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <NumberInput
              input={2}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <NumberInput
              input={3}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <TextInput input="-" mathOperation={mathOperation} color="normal" />
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <TextInput input="." color="normal" mathOperation={mathOperation} />
            <NumberInput
              input={0}
              mathOperation={mathOperation}
              side={mathOperation.isRightSide ? "rightSide" : "leftSide"}
            ></NumberInput>
            <TextInput input="/" color="normal" mathOperation={mathOperation} />
            <TextInput input="x" color="normal" mathOperation={mathOperation}>
              {" "}
            </TextInput>
          </div>
          <div class="grid px-4 grid-cols-2 gap-3  justify-between w-full">
            <LargeTextInput
              input="RESET"
              color="normal"
              mathOperation={mathOperation}
            ></LargeTextInput>
            <LargeTextInput
              input="="
              color="red"
              mathOperation={mathOperation}
            ></LargeTextInput>
          </div>
        </section>
        <h1 class="bg-red-400">Hi 👋</h1>
        <p>
          Can't wait to see what you build with qwik!
          <br />
          Happy coding.
        </p>
      </main>
      <div class="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </>
  );
});
function getDisplayFromMathStack(mathStack: NeoGalactusStack): string {
  return getDisplayOfMathNode(mathStack.MathNodes[mathStack.head]);
}
export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
