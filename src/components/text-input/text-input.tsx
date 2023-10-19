import { PropFunction, component$, $ } from "@builder.io/qwik";
import { isOperatorEmpty, type MathType, type Operators } from "~/routes";

export interface TextInputProps {
  input: string;
  mathOperation: MathType;
  color: "alt" | "normal";
}

export const TextInput = component$<TextInputProps>(
  ({ input, color, mathOperation }) => {
    const colorOptions = {
      alt: "w-12 py-2 bg-alt-key-bg border-alt-key-border border-b-[3px] font-bold rounded-md   text-md text-white",
      normal:
        "w-12 py-2 bg-key-bg border-key-border border-b-[3px] font-bold rounded-md   text-3xl text-key-text",
    };
    return (
      <button
        class={colorOptions[color]}
        value={input}
        onClick$={(event, currentTarget: HTMLButtonElement) => {
          const target = currentTarget as HTMLInputElement;
          if (isOperatorEmpty(mathOperation)) {
            return;
          }
          mathOperation.operation = target.value as Operators;
        }}
      >
        {input}
      </button>
    );
  },
);
