import { Slot, component$ } from "@builder.io/qwik";
export interface LargeTextInputSlotProps {
  color: "red" | "normal";
}

export const LargeTextInputSlot = component$<LargeTextInputSlotProps>(
  ({ color }) => {
    const colorOptions = {
      red: " py-[.5rem] px-[.5rem]  bg-key-red border-key-red-bg  border-b-[3px] font-bold rounded-md   flex justify-center text-2xl text-white",
      normal:
        " py-[.5rem] px-[.5rem]  bg-key-blue border-key-blue-bg border-b-[3px] font-bold rounded-md   flex justify-center text-md text-white",
    };
    return (
      <div class={colorOptions[color]}>
        <Slot />
      </div>
    );
  },
);
