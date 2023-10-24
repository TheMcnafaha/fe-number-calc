import {
  component$,
  PropFunction,
  Signal,
  $,
  useStore,
  useSignal,
} from "@builder.io/qwik";
import {
  commafier,
  MathArr,
  type MathNode,
  type MathType,
  type Sides,
} from "~/routes";

type magic = {
  value: MathArr;
};
export interface NumberInputProps {
  input: number;
  currentMathNode: MathNode;
  mathArr: magic;
}

export const NumberInput = component$<NumberInputProps>(
  ({ input, currentMathNode, mathArr }) => {
    return (
      <button
        class="w-12  bg-key-bg border-key-border border-b-[3px] font-bold rounded-md   text-3xl text-key-text"
        value={input}
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
