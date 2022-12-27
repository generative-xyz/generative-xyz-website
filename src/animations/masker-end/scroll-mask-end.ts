import { gsap } from 'gsap';

export class ScrollMaskEnd {
  tl: GSAPTimeline;

  constructor(el: HTMLElement, endSize: number) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ScrollTrigger = require('gsap/ScrollTrigger').default;
    gsap.registerPlugin(ScrollTrigger);

    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        // markers: true,
        start: '+=102% top',
        scrub: true,
        // pin: true,
        anticipatePin: 1,
        end: () => '+=' + endSize,
      },
      defaults: { ease: 'none' },
    });
  }

  kill() {
    this.tl.kill();
  }
}
