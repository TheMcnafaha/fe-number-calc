import { component$, PropFunction, Signal } from "@builder.io/qwik";
import type { MathType } from "~/routes";

export interface NumberInputProps {
  input: number;
  mathOperation: Signal<MathType>;
  side: "leftSide" | "rightSide";
}

export const NumberInput = component$<NumberInputProps>(
  ({ input, side, mathOperation }) => {
    return (
      <button
        class="w-12 py-[.5rem] bg-key border-key-border border-b-[3px] font-bold rounded-md   text-2xl text-key-text"
        value={input}
        onClick$={(event, currentTarget) => {
          const target = currentTarget as HTMLInputElement;
          alert(target.value);
          mathOperation.value = {
            ...mathOperation.value,
            [side]: target.value,
          };
        }}
      >
        {input}
      </button>
    );
  },
);
