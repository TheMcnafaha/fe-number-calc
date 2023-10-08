import { PropFunction, component$ } from "@builder.io/qwik";

export interface TextInputProps {
  input: string;
  color: "blue" | "normal";
  onClick$?: PropFunction<() => void>;
}

export const TextInput = component$<TextInputProps>(
  ({ input, color, onClick$ }) => {
    const colorOptions = {
      blue: "w-12 py-[.5rem] bg-key-blue border-key-blue-bg border-b-[3px] font-bold rounded-md   text-md text-white",
      normal:
        "w-12 py-[.5rem] bg-key border-key-border border-b-[3px] font-bold rounded-md   text-2xl text-key-text",
    };
    return (
      <button onClick$={onClick$} class={colorOptions[color]}>
        {input}
      </button>
    );
  },
);
