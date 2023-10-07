import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NumberInput } from "~/components/number-input/number-input";
import { ThreeStageToggle } from "~/components/three-stage-toggle/three-stage-toggle";

export default component$(() => {
  return (
    <>
      <main class=" px-4">
        <div class="flex w-full  justify-between">
          <h1>Calc</h1>
          <div>
            <ThreeStageToggle></ThreeStageToggle>
          </div>
        </div>{" "}
        <section class="bg-tp1-main-bg">
          <div class="flex justify-center  gap-3 px-6">
            <NumberInput input={7}></NumberInput>
            <NumberInput input={8}></NumberInput>
            <NumberInput input={9}></NumberInput>
            <NumberInput input={0}></NumberInput>
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
