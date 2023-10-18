import { component$, PropFunction, Signal } from "@builder.io/qwik";
import type { MathType, Sides } from "~/routes";

export interface NumberInputProps {
  input: number;
  mathOperation: MathType;
  side: Sides;
}

export const NumberInput = component$<NumberInputProps>(
  ({ input, side, mathOperation }) => {
    console.log("side is: ", side);

    return (
      <button
        class="w-12  bg-key-bg border-key-border border-b-[3px] font-bold rounded-md   text-3xl text-key-text"
        value={input}
        onClick$={(event, currentTarget) => {
          const target = currentTarget as HTMLInputElement;
          if (typeof mathOperation[side] === "number") {
            mathOperation[side] = Number(
              mathOperation[side].toString() + input,
            );
            return;
          }
          if (mathOperation.isRightSide) {
            mathOperation[side] = Number(target.value);
          }

          mathOperation[side] = Number(target.value);
        }}
      >
        {input}
      </button>
    );
  },
);
