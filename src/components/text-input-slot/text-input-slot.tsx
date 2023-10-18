import { component$, Slot } from "@builder.io/qwik";

export interface TextInputProps {
  color: "alt" | "normal";
}

export const TextInputSlot = component$<TextInputProps>(({ color }) => {
  const colorOptions = {
    alt: "w-12 py-[.5rem] bg-alt-key-bg border-alt-key-border border-b-[3px] font-bold rounded-md   text-lg  text-alt-key-text flex  justify-center",
    normal:
      "w-12 py-[.5rem] bg-key-bg border-key-border border-b-[3px] font-bold rounded-md   text-3xl text-key-text flex  justify-center",
  };
  return (
    <div class={colorOptions[color]}>
      <Slot />
    </div>
  );
});
