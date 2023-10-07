import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ThreeStageToggle } from "~/components/three-stage-toggle/three-stage-toggle";

export default component$(() => {
  return (
    <>
      <main class="">
        <div class="flex w-full  justify-between">
          <h1>Calc</h1>
          <div>
            <ThreeStageToggle></ThreeStageToggle>
          </div>
        </div>{" "}
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
