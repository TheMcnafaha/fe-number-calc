import { component$ } from "@builder.io/qwik";
import { Actions, MathType, Operators } from "~/routes";

export interface LargeTextInputProps {
  input: string;
  color: "red" | "normal";
  mathOperation: MathType;
}

export const LargeTextInput = component$<LargeTextInputProps>(
  ({ input, color, mathOperation }) => {
    const colorOptions = {
      red: " py-[.5rem] px-[.5rem]  bg-key-red border-key-red-bg  border-b-[3px] font-bold rounded-md   text-2xl text-white",
      normal:
        " py-[.5rem] px-[.5rem]  bg-key-blue border-key-blue-bg border-b-[3px] font-bold rounded-md   text-md text-white",
    };
    return (
      <button
        value={input}
        class={colorOptions[color]}
        onClick$={(event, currentTarget: HTMLButtonElement) => {
          const target = currentTarget as HTMLInputElement;
          mathOperation.action = target.value as Actions;
        }}
      >
        {input}
      </button>
    );
  },
);
