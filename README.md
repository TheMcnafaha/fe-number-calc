# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division(I got PEMDAS to work)
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Screenshot

![](./screen_shot.png)

### Links

- Solution URL: [https://github.com/TheMcnafaha/fe-number-calc](https://your-live-site-url.com)
- Live Site URL: [https://fe-number-calc-git-main-themcnafaha.vercel.app/](https://your-solution-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Qwik](https://qwik.builder.io/) - JS framework
- [Tailwind](https://tailwindcss.com/) - CSS framework

### What I learned

This project quickly showed the iterative process of software.

I fist tackeld this problem with an overly engenieered solution. This was fine until I needed to add the next feature and the code buckled under its own weight. So I began from 0 again, but now I had two stone that I could step on: what my old code could do and where it failed.

Repeat this process 3-5 times and you get a much more simple, yet more capable, program.

```js
export function removeMultiplicationOnce(mathArr: MathArr) {
  const mutationGuide = multiplicationPass(mathArr);
  if (mutationGuide.deleteIndex !== undefined) {
    mathArr.splice(mutationGuide.deleteIndex - 1, 3, mutationGuide.total);
  }
}

```

I like this fn because of how good its ratio of code to functionality is. It has really good abstraction while still being readable. I also like the names I came up with because they're very intutitive for me.

### Continued development

I really want to add and E2E test. Playwright alreasy has support in Qwik, so I'd only need to learn how to use it.

This feeling comes from how much easier Vitest made it to write the calculator logic. Being able to have that tool for emulated user input sounds like the next logical step.

### Useful resources

- [Qwik Discord](https://qwik.builder.io/chat) - Really helpfull channels. My nooby questions were answered fast and I never felt like I had hit a wall.

## Author

- Frontend Mentor - [@TheMcnafaha](https://www.frontendmentor.io/profile/TheMcnafaha)

## Acknowledgments
