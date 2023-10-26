import { component$, Slot } from "@builder.io/qwik";

export interface TextInputProps {
  color: "alt" | "normal";
}

export const TextInputSlot = component$<TextInputProps>(({ color }) => {
  const colorOptions = {
    alt: "w-12  hover:bg-alt-key-focus md:text-3xl py-[.5rem] bg-alt-key-bg border-alt-key-border border-b-[3px] font-bold rounded-md  md:w-20 text-lg  child:h-full child:w-full text-alt-key-text flex  justify-center",
    normal:
      "w-12 py-[.5rem] md:w-20 bg-key-bg hover:bg-key-focus border-key-border border-b-[3px] font-bold rounded-md   text-3xl md:text-4xl text-key-text flex child:h-full child:w-full  justify-center",
  };
  return (
    <div class={colorOptions[color]}>
      <Slot />
    </div>
  );
});
