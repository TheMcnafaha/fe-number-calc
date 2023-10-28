import { component$ } from "@builder.io/qwik";

export interface CalculatorDisplayProps {
  input: string;
}

export const CalculatorDisplay = component$<CalculatorDisplayProps>(
  ({ input }) => {
    return (
      <section class="bg-display-bg min-h-[74px] md:min-h-[100px] flex justify-end items-center px-4 text-display-text  text-3xl  font-bold pt-4  my-3 md:w-[400px] w-[260px] md:text-5xl md:my-5 rounded-md ">
        <div class=" overflow-auto pb-5">{input}</div>
      </section>
    );
  },
);
