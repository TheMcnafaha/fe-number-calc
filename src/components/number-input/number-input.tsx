import { component$, PropFunction, Signal } from "@builder.io/qwik";
import type { MathNode, MathType, Sides } from "~/routes";

export interface NumberInputProps {
  input: number;
  currentMathNode: MathNode;
}

export const NumberInput = component$<NumberInputProps>(
  ({ input, currentMathNode }) => {
    return (
      <button
        class="w-12  bg-key-bg border-key-border border-b-[3px] font-bold rounded-md   text-3xl text-key-text"
        value={input}
        onClick$={(event, currentTarget) => {
          const target = currentTarget as HTMLInputElement;
          if (currentMathNode.operation === undefined) {
            currentMathNode.leftInput =
              currentMathNode.leftInput === undefined
                ? target.value
                : currentMathNode.leftInput.concat(target.value);
          } else {
            currentMathNode.rightInput =
              currentMathNode.rightInput === undefined
                ? target.value
                : currentMathNode.rightInput.concat(target.value);
          }
        }}
      >
        {input}
      </button>
    );
  },
);
