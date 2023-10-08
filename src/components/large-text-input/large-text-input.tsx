import { component$ } from "@builder.io/qwik";

export interface LargeTextInputProps {
  input: string;
  color: "red" | "normal";
}

export const LargeTextInput = component$<LargeTextInputProps>(
  ({ input, color }) => {
    const colorOptions = {
      red: " py-[.5rem] px-[.5rem]  bg-key-red border-key-red-bg border-b-[3px] font-bold rounded-md   text-2xl text-white",
      normal:
        " py-[.5rem] px-[.5rem]  bg-key-blue border-key-blue-bg border-b-[3px] font-bold rounded-md   text-2xl text-white",
    };
    return <button class={colorOptions[color]}>{input}</button>;
  },
);
