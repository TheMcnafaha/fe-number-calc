import { component$ } from "@builder.io/qwik";

export interface NumberInputProps {
  input: number;
}

export const NumberInput = component$<NumberInputProps>(({ input }) => {
  return (
    <button class="w-12 py-[.5rem] bg-key border-key-border border-b-[3px] font-bold rounded-md   text-2xl text-key-text">
      {input}
    </button>
  );
});
