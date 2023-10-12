import { PropFunction, component$, $ } from "@builder.io/qwik";
import type { MathType, Operators } from "~/routes";

export interface TextInputProps {
  input: string;
  mathOperation: MathType;
  color: "blue" | "normal";
}

export const TextInput = component$<TextInputProps>(
  ({ input, color, mathOperation }) => {
    const colorOptions = {
      blue: "w-12 py-[.5rem] bg-key-blue border-key-blue-bg border-b-[3px] font-bold rounded-md   text-md text-white",
      normal:
        "w-12 py-[.5rem] bg-key border-key-border border-b-[3px] font-bold rounded-md   text-2xl text-key-text",
    };
    return (
      <button
        class={colorOptions[color]}
        value={input}
        onClick$={(event, currentTarget: HTMLButtonElement) => {
          const target = currentTarget as HTMLInputElement;
          if (target.value === ".") {
            mathOperation.action = target.value;
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
