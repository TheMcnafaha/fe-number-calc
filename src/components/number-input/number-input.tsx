import { component$, PropFunction, Signal } from "@builder.io/qwik";
import type { MathType, Sides } from "~/routes";

export interface NumberInputProps {
  input: number;
  mathOperation: MathType;
  side: Sides;
}

export const NumberInput = component$<NumberInputProps>(
  ({ input, side, mathOperation }) => {
    return (
      <button
        class="w-12 py-[.5rem] bg-key border-key-border border-b-[3px] font-bold rounded-md   text-2xl text-key-text"
        value={input}
        onClick$={(event, currentTarget) => {
          const target = currentTarget as HTMLInputElement;
          mathOperation[side] = Number(target.value);
        }}
      >
        {input}
      </button>
    );
  },
);
