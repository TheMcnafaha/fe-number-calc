import { component$ } from "@builder.io/qwik";

export interface CalculatorDisplayProps {
  input: string;
}

export const CalculatorDisplay = component$<CalculatorDisplayProps>(
  ({ input }) => {
    return (
      <section class="bg-display-bg min-h-[68px] flex justify-end px-4 text-white  text-2xl  font-bold pt-4  my-3 w-[260px] rounded-md">
        <div class=" overflow-auto pb-5">{input}</div>
      </section>
    );
  },
);
