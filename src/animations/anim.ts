import { gsap } from 'gsap';
import store from '@redux';
import { default as ScrollTrigger } from 'gsap/ScrollTrigger';

export class Anim {
  DOM: Record<string, HTMLElement>;

  constructor(el: HTMLElement, onEnter: () => void) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ScrollTrigger = require('gsap/ScrollTrigger').default;
    gsap.registerPlugin(ScrollTrigger);

    this.DOM = { el };
    ScrollTrigger.create({
      trigger: el,
      onEnter: function (target: ScrollTrigger) {
        const isScrolling = store.getState()?.general.isScrolling;
        if (!isScrolling) {
          onEnter();
          target.kill();
        }
      },
      onEnterBack: function (target: ScrollTrigger) {
        const isScrolling = store.getState()?.general.isScrolling;
        if (!isScrolling) {
          onEnter();
          target.kill();
        }
      },
    });
  }
}
