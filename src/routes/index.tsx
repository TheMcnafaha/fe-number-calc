import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NumberInput } from "~/components/number-input/number-input";
import { ThreeStageToggle } from "~/components/three-stage-toggle/three-stage-toggle";

export default component$(() => {
  return (
    <>
      <main class=" px-4 flex flex-col items-center">
        <div class="flex w-full  justify-between">
          <h1>Calc</h1>
          <div>
            <ThreeStageToggle></ThreeStageToggle>
          </div>
        </div>{" "}
        <section class="bg-tp1-alt-bg max-w-fit flex flex-col items-center rounded-lg gap-3 py-4">
          <div class="flex justify-center  gap-3 px-6">
            <NumberInput input={7}></NumberInput>
            <NumberInput input={8}></NumberInput>
            <NumberInput input={9}></NumberInput>
            <NumberInput input={"D"}></NumberInput>
          </div>
          <div class="flex justify-center  gap-3 px-6">
            <NumberInput input={4}></NumberInput>
            <NumberInput input={5}></NumberInput>
            <NumberInput input={6}></NumberInput>
            <NumberInput input={"+"}></NumberInput>
          </div>
          <div class="flex justify-center  gap-3 px-6">
            <NumberInput input={1}></NumberInput>
            <NumberInput input={2}></NumberInput>
            <NumberInput input={3}></NumberInput>
            <NumberInput input={"-"}></NumberInput>
          </div>
          <div class="flex justify-center  gap-3 px-6">
            <NumberInput input={"."}></NumberInput>
            <NumberInput input={0}></NumberInput>
            <NumberInput input={"/"}></NumberInput>
            <NumberInput input={"x"}></NumberInput>
          </div>
        </section>
        <h1>Hi 👋</h1>
        <p>
          Can't wait to see what you build with qwik!
          <br />
          Happy coding.
        </p>
      </main>
      <div class="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
