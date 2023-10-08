import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CalculatorDisplay } from "~/components/calculator-display/calculator-display";
import { LargeTextInput } from "~/components/large-text-input/large-text-input";
import { NumberInput } from "~/components/number-input/number-input";
import { TextInput } from "~/components/text-input/text-input";
import { ThreeStageToggle } from "~/components/three-stage-toggle/three-stage-toggle";
export type MathType = {
  rightSide: number | "default";
  operation: "+" | "-" | "default";
  leftSide: number | "default";
};
type Display = {
  rightSide: string;
  operation: string;
  leftSide: string;
};
function getDisplay(math: MathType): string {
  let responseString: Display = {
    rightSide: "",
    operation: "",
    leftSide: "",
  };
  if (math.rightSide != "default") {
    responseString.rightSide = math.rightSide.toString();
  }
  if (math.operation != "default") {
    responseString.operation = math.operation.toString();
  }
  if (math.leftSide != "default") {
    responseString.leftSide = math.leftSide.toString();
  }

  return (
    responseString.leftSide +
    responseString.operation +
    responseString.rightSide
  );
}
export default component$(() => {
  const mathOperation = useSignal<MathType>({
    rightSide: "default",
    operation: "default",
    leftSide: "default",
  });
  const isRigthSide = useSignal(false);
  const display = getDisplay(mathOperation.value);
  const goRigthSide = $(() => {
    if (
      mathOperation.value.operation != "default" &&
      mathOperation.value.leftSide != "default"
    ) {
      isRigthSide.value = true;
    }
    isRigthSide.value = !isRigthSide.value;
  });
  const defineSides = $((input: number) => {
    if (isRigthSide) {
      mathOperation.value.rightSide = input;
    }
    mathOperation.value.leftSide = input;
  });
  return (
    <>
      <main class=" px-4 flex flex-col items-center">
        <div class="flex w-full   justify-between">
          <h1>Calc</h1>

          <div>
            <ThreeStageToggle></ThreeStageToggle>
            <div class="text-white">
              <p> isR: {`${isRigthSide.value}`}</p>
              <p> leftS: {`${mathOperation.value.leftSide}`}</p>
            </div>
          </div>
        </div>{" "}
        <CalculatorDisplay input="399,981"></CalculatorDisplay>
        <section class="bg-keypad-bg   flex flex-col items-center rounded-lg gap-3 py-4">
          <div class="flex justify-center  gap-3 px-4">
            <NumberInput input={7}></NumberInput>
            <NumberInput input={8}></NumberInput>
            <NumberInput input={9}></NumberInput>
            <TextInput input="DEL" color="blue" />
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <NumberInput input={4}></NumberInput>
            <NumberInput input={5}></NumberInput>
            <NumberInput input={6}></NumberInput>
            <TextInput input="+" onClick$={goRigthSide} color="normal" />
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <NumberInput
              input={1}
              mathOperation={mathOperation}
              side="leftSide"
            ></NumberInput>
            <NumberInput input={2}></NumberInput>
            <NumberInput input={3}></NumberInput>
            <TextInput input="-" onClick$={goRigthSide} color="normal" />
          </div>
          <div class="flex justify-center  gap-3 px-4">
            <TextInput input="." color="normal" />
            <NumberInput input={0}></NumberInput>
            <TextInput input="/" color="normal" />
            <TextInput input="x" color="normal">
              {" "}
            </TextInput>
          </div>
          <div class="grid px-4 grid-cols-2 gap-3  justify-between w-full">
            <LargeTextInput input="RESET" color="normal"></LargeTextInput>
            <LargeTextInput input="=" color="red"></LargeTextInput>
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

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
