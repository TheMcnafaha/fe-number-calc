import { component$ } from "@builder.io/qwik";

export interface NumberInputProps {
  input: number;
}

export const NumberInput = component$<NumberInputProps>(({ input }) => {
  return (
    <button class="w-12 py-[.5rem] border-tp-key-border border-b-2 font-bold rounded-lg  bg-tp-key text-2xl text-tp1-main-bg">
      {input}
    </button>
  );
});
