import { Slot, component$ } from "@builder.io/qwik";

export interface ThreeStageToggleProps {
  index: number;
  id: string;
}

export const ThreeStageToggle = component$<ThreeStageToggleProps>(
  ({ index, id }) => {
    let className: string = "";

    if (index === 0) {
      className =
        "flex justify-start  bg-keypad-bg rounded-xl items-center px-1 py-1";
    } else if (index === 1) {
      className =
        "flex justify-center bg-keypad-bg rounded-xl items-center px-1 py-1";
    } else {
      className =
        " flex justify-end bg-keypad-bg rounded-xl items-center px-1 py-1";
    }
    return (
      <div class="w-[60px] justify-self-end text-sm">
        <ul class="flex text-center justify-between text-display-text p-1 md:text-lg">
          <li class=" w-[12px] ">1</li>
          <li class=" w-[12px]">2</li>
          <li class=" w-[12px]">3</li>
        </ul>
        <label class={className} for={id}>
          <Slot></Slot>
        </label>
      </div>
    );
  },
);

// <div class="w-3 h-3 bg-accent-bg rounded-full"> </div>
function getPlacement(index: number) {
  if (index === 0) {
    return " justify-start";
  }
  if (index === 1) {
    return " justify-center";
  }
  return " justify-end";
}
