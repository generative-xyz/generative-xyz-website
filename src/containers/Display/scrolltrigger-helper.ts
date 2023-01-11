import { gsap } from 'gsap';

export class ScrollTriggerHelper {
  resizeObserver: ResizeObserver;
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ScrollTrigger = require('gsap/ScrollTrigger').default;
    gsap.registerPlugin(ScrollTrigger);

    this.resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    const main = document.querySelector('main');
    main && this.resizeObserver.observe(main);
  }

  kill() {
    const main = document.querySelector('main');
    main && this.resizeObserver.unobserve(main);
  }
}
