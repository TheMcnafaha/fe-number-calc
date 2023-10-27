import { component$ } from "@builder.io/qwik";
import type { MathArr } from "~/routes";

export type MathStore = {
  value: MathArr;
};
export interface NumberInputProps {
  input: number;
  mathArr: MathStore;
}

export const NumberInput = component$<NumberInputProps>(
  ({ input, mathArr }) => {
    return (
      <button
        class="w-12 md:w-20 md:text-4xl  hover:bg-key-focus bg-key-bg border-key-border border-b-[3px] pt-[3px] font-bold rounded-md    text-3xl text-key-text"
        value={input}
        name={input.toString()}
        onClick$={(event, currentTarget) => {
          const target = currentTarget as HTMLInputElement;
          const currentStrng = mathArr.value[mathArr.value.length - 1];
          mathArr.value = mathArr.value =
            currentStrng === undefined
              ? [target.value]
              : [
                  ...mathArr.value.slice(0, -1),
                  currentStrng.concat(target.value),
                ];
          return;
        }}
      >
        {input}
      </button>
    );
  },
);
