import { gsap } from 'gsap';
import store from '@redux';
import { default as ScrollTrigger } from 'gsap/ScrollTrigger';

export class Anim {
  DOM: Record<string, HTMLElement>;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ScrollTrigger: any;

  constructor(el: HTMLElement, onEnter: () => void, offsetPercent = 0) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.ScrollTrigger = require('gsap/ScrollTrigger').default;
    gsap.registerPlugin(this.ScrollTrigger);
    this.id = (Math.random() * 1000000000).toString();

    this.DOM = { el };
    this.ScrollTrigger.create({
      trigger: el,
      id: this.id,
      start: `${offsetPercent}% bottom`,
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

  kill() {
    const trigger = this.ScrollTrigger.getById(this.id);
    trigger?.kill();
  }
}
