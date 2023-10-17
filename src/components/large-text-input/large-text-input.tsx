import { component$ } from "@builder.io/qwik";
import { Actions, MathType, Operators } from "~/routes";

export interface LargeTextInputProps {
  input: string;
  color: "accent" | "normal";
  mathOperation: MathType;
  isPurpleTheme?: boolean;
}

export const LargeTextInput = component$<LargeTextInputProps>(
  ({ input, color, mathOperation, isPurpleTheme = false }) => {
    const super_magic = isPurpleTheme
      ? " py-[.5rem] px-[.5rem]  bg-accent-bg border-accent-border  border-b-[3px] font-bold rounded-md   text-2xl text-[hsl(60,10%,19%)]"
      : " py-[.5rem] px-[.5rem]  bg-accent-bg border-accent-border  border-b-[3px] font-bold rounded-md   text-2xl text-alt-key-text";
    const colorOptions = {
      accent: super_magic,
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
