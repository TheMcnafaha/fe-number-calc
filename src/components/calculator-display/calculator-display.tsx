import { component$ } from "@builder.io/qwik";

export interface CalculatorDisplayProps {
  input: string;
}

export const CalculatorDisplay = component$<CalculatorDisplayProps>(
  ({ input }) => {
    return (
      <section class="bg-display-bg flex justify-end px-4 text-white  text-2xl font-bold pt-4 pb-5 my-3 w-[260px] rounded-md">
        {input}
      </section>
    );
  },
);
