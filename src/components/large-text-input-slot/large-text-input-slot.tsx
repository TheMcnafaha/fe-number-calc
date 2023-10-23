import { Slot, component$ } from "@builder.io/qwik";
export interface LargeTextInputSlotProps {
  color: "accent" | "normal";
}

export const LargeTextInputSlot = component$<LargeTextInputSlotProps>(
  ({ color }) => {
    const colorOptions = {
      accent:
        " py-[.5rem] px-[.5rem]  bg-accent-bg border-accent-border  border-b-[3px] font-bold rounded-md  flex justify-center text-3xl text-alt-key-text",
      normal:
        " py-[.5rem] px-[.5rem]  bg-alt-key-bg border-alt-key-border border-b-[3px] font-bold rounded-md   flex justify-center text-lg text-alt-key-text",
    };
    return (
      <div class={colorOptions[color]}>
        <Slot />
      </div>
    );
  },
);
