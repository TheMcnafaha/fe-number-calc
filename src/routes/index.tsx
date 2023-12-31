import { component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { CalculatorDisplay } from "~/components/calculator-display/calculator-display";
import { NumberInput } from "~/components/number-input/number-input";
import { ThreeStageToggle } from "~/components/three-stage-toggle/three-stage-toggle";
import { TextInputSlot } from "~/components/text-input-slot/text-input-slot";
import { LargeTextInputSlot } from "~/components/large-text-input-slot/large-text-input-slot";
export type MathNode = {
  leftInput: string;
  rightInput: string;
  operation?: Operators;
  total?: number;
};
export type MathArr = Array<string | NeoOperators>;
// operators are all arethmetic operators in nature
export type Operators = "+" | "-" | "x" | "/";
export type NeoOperators = "+" | "-" | "x" | "/" | undefined;
// actions are non-arethmetic display actions
export type Actions = "=" | "." | "delete" | "default";
type Theme = {
  key_text: string;
  key_focus: string;
  alt_key_text: string;
  key_bg: string;
  alt_key_bg: string;
  key_border: string;
  alt_key_border: string;
  alt_key_focus: string;
  keypad_bg: string;
  accent_bg: string;
  accent_focus: string;
  accent_border: string;
  display_bg: string;
  display_text: string;
  bg_color: string;
};
export const themeArr: Array<Theme> = [
  {
    key_text: "  hsl(221, 14%, 31%)",
    key_focus: "  hsl(0, 0%, 100%)",
    alt_key_text: "  hsl(0, 0%, 100%)",
    key_bg: "  hsl(30, 25%, 89%)",
    alt_key_bg: "  hsl(225, 21%, 49%)",
    key_border: "  hsl(28, 16%, 65%)",
    alt_key_border: "  hsl(224, 28%, 35%)",
    alt_key_focus: " #acb8e4",
    keypad_bg: "  hsl(223, 31%, 20%)",
    accent_bg: "  hsl(6, 63%, 50%)",
    accent_focus: " #ff6c5c",
    accent_border: "  hsl(6, 70%, 34%)",
    display_bg: "  hsl(224, 36%, 15%)",
    display_text: "hsl(0, 0%, 100%)",
    bg_color: "  hsl(222, 26%, 31%)",
  },
  {
    key_text: "hsl(60, 10%, 19%)",
    alt_key_text: "  hsl(0, 0%, 100%)",
    alt_key_focus: " #68b4bc",
    key_focus: "  hsl(0, 0%, 100%)",
    key_bg: "hsl(45, 7%, 89%)",
    alt_key_bg: "hsl(185, 42%, 37%) ",
    accent_focus: " #ff8c3c",
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
    key_focus: " #7034ac",
    accent_focus: " #98fcfc",
    alt_key_text: "  hsl(0, 0%, 100%)",
    alt_key_focus: " #8834b4",
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
  const mathArr = useSignal<MathArr>([]);
  const themeIndex = useSignal<number>(0);

  // add commans when state changes,
  // could be optimazid but is no big deal
  return (
    <>
      <main class=" px-4 flex flex-col items-center">
        <h1 class=" text-display-text text-center ">
          Hi Swee, I am inside your walls
        </h1>
        <div class="flex    justify-center">
          <div class="grid w-[260px] md:w-[400px]  grid-cols-3 py-4">
            <h1 class="self-end text-display-text">Calc</h1>
            <p class="text-xs place-self-end uppercase text-display-text">
              Theme
            </p>
            <ThreeStageToggle index={themeIndex.value} id="toggle">
              <button
                id="toggle"
                class="w-3 h-3 bg-accent-bg rounded-full hover:bg-accent-focus"
                aria-label="change calculator theme"
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
                }}
              ></button>
            </ThreeStageToggle>
          </div>
        </div>{" "}
        <CalculatorDisplay
          input={getDisplayFromMathArr(mathArr.value)}
        ></CalculatorDisplay>
        <section class="bg-keypad-bg md:w-[400px]   grid grid-rows-5 grid-cols-1 items-center rounded-lg gap-2 py-4">
          <div class="flex justify-center  h-full gap-3 px-4">
            <NumberInput input={7} mathArr={mathArr}></NumberInput>
            <NumberInput input={8} mathArr={mathArr}></NumberInput>
            <NumberInput input={9} mathArr={mathArr}></NumberInput>
            <TextInputSlot color="alt">
              <button
                value={"DEL"}
                onClick$={() => {
                  const head = mathArr.value[mathArr.value.length - 1];
                  if (head !== undefined) {
                    if (head.length > 1) {
                      mathArr.value = [
                        ...mathArr.value.slice(0, -1),
                        head.slice(0, -1),
                      ];
                      return;
                    }
                    mathArr.value = [...mathArr.value.slice(0, -1)];
                  }
                }}
              >
                {"DEL"}
              </button>
            </TextInputSlot>
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <NumberInput input={4} mathArr={mathArr}></NumberInput>
            <NumberInput input={5} mathArr={mathArr}></NumberInput>
            <NumberInput input={6} mathArr={mathArr}></NumberInput>
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
            <NumberInput input={1} mathArr={mathArr}></NumberInput>
            <NumberInput input={2} mathArr={mathArr}></NumberInput>
            <NumberInput input={3} mathArr={mathArr}></NumberInput>
            <TextInputSlot color="normal">
              <button
                onClick$={() => {
                  mathArr.value = getOperator("-", mathArr.value);
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
                  const headValue = mathArr.value[mathArr.value.length - 1];
                  if (
                    headValue !== undefined &&
                    !isOperator(mathArr.value[mathArr.value.length - 1])
                  ) {
                    if (!headValue.includes(".")) {
                      mathArr.value = [
                        ...mathArr.value.slice(0, -1),
                        headValue.concat("."),
                      ];
                    }
                  }
                }}
              >
                {"."}
              </button>
            </TextInputSlot>
            <NumberInput input={0} mathArr={mathArr}></NumberInput>
            <TextInputSlot color="normal">
              <button
                onClick$={() => {
                  mathArr.value = getOperator("/", mathArr.value);
                }}
              >
                /
              </button>
            </TextInputSlot>
            <TextInputSlot color="normal">
              <button
                onClick$={() => {
                  mathArr.value = getOperator("x", mathArr.value);
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
                  mathArr.value = [];
                }}
              >
                {"RESET"}
              </button>
            </LargeTextInputSlot>
            <LargeTextInputSlot color="accent">
              <button
                class={themeIndex.value === 2 ? "text-[#0c2828]" : ""}
                onClick$={() => {
                  mathArr.value = [getTotal(mathArr.value)];
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
    default:
      // this should make it clear something went wrong to the user without making it my problem lol
      return -10000;
  }
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

function getDisplayFromMathArr(mathArr: MathArr): string {
  if (mathArr === undefined) {
    return "";
  }
  return mathArr.reduce((t, n) => {
    if (n === undefined) {
      return "";
    }
    return t + commafier(n);
  }, "") as string;
}

export function getTotal(mathArr: MathArr): string {
  let total = "";
  // TODO: refactor logic to either use while loops or one big for loop
  // TODO: have a prevention for infinite loop on while loop
  while (mathArr.includes("x")) {
    removeMultiplicationOnce(mathArr);
  }
  while (mathArr.includes("/")) {
    removeDivisonOnce(mathArr);
  }
  if (mathArr.length === 1) {
    return mathArr[0]!;
  }
  for (let index = 0; index < mathArr.length; index++) {
    const strg = mathArr[index];

    if (strg !== undefined) {
      if (isOperator(strg)) {
        const leftSide = mathArr[index - 1];
        const rightSide = mathArr[index + 1];
        if (leftSide && rightSide) {
          if (rightSide === "0" && strg === "/") {
            total = "💀";
            break;
          }
          const mathNode: MathNode = {
            leftInput: leftSide,
            operation: strg as Operators,
            rightInput: rightSide,
          };
          const mathy_boi = doMath(mathNode);
          const significant = Math.pow(10, 5);
          // TODO: find more less sketchy rounding xdd
          const rounded_boi = (
            Math.round(mathy_boi * significant) / significant
          ).toString();
          total = rounded_boi;
          mathArr[index + 1] = rounded_boi;
        }
      }
    }
  }

  return total;
}

export function isOperator(input: string | undefined) {
  if (input === undefined) {
    return false;
  }
  return /^[+-/x]$/.test(input);
}
export const head: DocumentHead = {
  title: "FE Calculator",
  meta: [
    {
      name: "description",
      content: "This is as frontend project, a calculator.",
    },
  ],
};

export function multiplicationPass(mathArr: MathArr): {
  total: string;
  deleteIndex?: number;
} {
  if (mathArr.includes("x")) {
    const multIndex = mathArr.indexOf("x");
    const leftSide = mathArr[multIndex - 1];
    const rigthSide = mathArr[multIndex + 1];
    if (leftSide && rigthSide) {
      const mathNode: MathNode = {
        leftInput: leftSide,
        operation: "x",
        rightInput: rigthSide,
      };
      return {
        total: doMath(mathNode).toString(),
        deleteIndex: multIndex,
      };
    }
  }
  return {
    total: "",
  };
}
export function divisionPass(mathArr: MathArr): {
  total: string;
  deleteIndex?: number;
} {
  if (mathArr.includes("/")) {
    const multIndex = mathArr.indexOf("/");
    const leftSide = mathArr[multIndex - 1];
    const rigthSide = mathArr[multIndex + 1];
    if (leftSide && rigthSide) {
      const mathNode: MathNode = {
        leftInput: leftSide,
        operation: "/",
        rightInput: rigthSide,
      };
      return {
        total: doMath(mathNode).toString(),
        deleteIndex: multIndex,
      };
    }
  }
  return {
    total: "",
  };
}
// TODO: refactor removeMulti/Divi functions into either one fn or 3
// it would be 3 bc id refactor the arr mutation into its one piece of code
// ideally, that thoeritical arr mutation could also be used in the for loop
export function removeDivisonOnce(mathArr: MathArr) {
  const mutationGuide = divisionPass(mathArr);
  if (mutationGuide.deleteIndex !== undefined) {
    mathArr.splice(mutationGuide.deleteIndex - 1, 3, mutationGuide.total);
  }
}
export function removeMultiplicationOnce(mathArr: MathArr) {
  const mutationGuide = multiplicationPass(mathArr);
  if (mutationGuide.deleteIndex !== undefined) {
    mathArr.splice(mutationGuide.deleteIndex - 1, 3, mutationGuide.total);
  }
}
