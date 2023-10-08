import { component$ } from "@builder.io/qwik";

export interface LargeTextInputProps {
  input: string;
  color: "blue" | "normal";
}

export const LargeTextInput = component$<LargeTextInputProps>(
  ({ input, color }) => {
    const colorOptions = {
      blue: "w-12 py-[.5rem] bg-key-blue border-key-blue-bg border-b-[3px] font-bold rounded-md   text-md text-white",
      normal:
        " py-[.5rem] px-[.5rem]  bg-key border-key-border border-b-[3px] font-bold rounded-md   text-2xl text-key-text",
    };
    return <button class={colorOptions[color]}>{input}</button>;
  },
);
