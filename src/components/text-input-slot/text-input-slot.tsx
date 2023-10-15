import { component$, Slot } from "@builder.io/qwik";

export interface TextInputProps {
  color: "blue" | "normal";
}

export const TextInputSlot = component$<TextInputProps>(({ color }) => {
  const colorOptions = {
    blue: "w-12 py-[.5rem] bg-key-blue border-key-blue-bg border-b-[3px] font-bold rounded-md   text-md text-white flex  justify-center",
    normal:
      " bg-key w-12 py-[.5rem] border-key-border border-b-[3px] font-bold rounded-md   text-2xl text-key-text flex  justify-center",
  };
  return (
    <div class={colorOptions[color]}>
      <Slot />
    </div>
  );
});
