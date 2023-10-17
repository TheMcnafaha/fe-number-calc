import { component$ } from "@builder.io/qwik";
import { Actions, MathType, Operators } from "~/routes";

export interface LargeTextInputProps {
  input: string;
  color: "accent" | "normal";
  mathOperation: MathType;
}

export const LargeTextInput = component$<LargeTextInputProps>(
  ({ input, color, mathOperation }) => {
    const colorOptions = {
      accent:
        " py-[.5rem] px-[.5rem]  bg-accent-bg border-accent-border  border-b-[3px] font-bold rounded-md   text-2xl text-alt-key-text",
      normal:
        " py-[.5rem] px-[.5rem]  bg-key-blue border-key-blue-bg border-b-[3px] font-bold rounded-md   text-md text-alt-key-text",
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
