import { Slot, component$ } from "@builder.io/qwik";

export interface ThreeStageToggleProps {
  index: number;
}

export const ThreeStageToggle = component$<ThreeStageToggleProps>(
  ({ index }) => {
    let className: string = "";

    if (index === 0) {
      className =
        "flex justify-start bg-keypad-bg rounded-xl items-center px-1 py-1";
    } else if (index === 1) {
      className =
        "flex justify-center bg-keypad-bg rounded-xl items-center px-1 py-1";
    } else {
      className =
        " flex justify-end bg-keypad-bg rounded-xl items-center px-1 py-1";
    }
    return (
      <div class="w-[60px] justify-self-end text-sm">
        <ul class="flex justify-between p-1 text-display-text">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
        <div class={className}>
          <Slot></Slot>
        </div>
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
