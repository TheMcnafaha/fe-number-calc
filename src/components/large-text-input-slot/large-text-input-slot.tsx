import { Slot, component$ } from "@builder.io/qwik";
export interface LargeTextInputSlotProps {
  color: "accent" | "normal";
}

export const LargeTextInputSlot = component$<LargeTextInputSlotProps>(
  ({ color }) => {
    const colorOptions = {
      accent:
        " child:h-full md:text-4xl child:w-full py-[.5rem] px-[.5rem]  bg-accent-bg border-accent-border hover:bg-accent-focus  border-b-[3px] font-bold rounded-md  flex justify-center text-3xl text-alt-key-text",
      normal:
        " child:h-full child:w-full py-[.5rem] px-[.5rem] hover:bg-alt-key-focus  bg-alt-key-bg border-alt-key-border border-b-[3px] font-bold rounded-md   flex justify-center text-lg text-alt-key-text md:text-2xl",
    };
    return (
      <div class={colorOptions[color]}>
        <Slot />
      </div>
    );
  },
);
