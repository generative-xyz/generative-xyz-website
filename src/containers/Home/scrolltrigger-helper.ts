import { gsap } from 'gsap';

export class ScrollTriggerHelper {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ScrollTrigger = require('gsap/ScrollTrigger').default;
    gsap.registerPlugin(ScrollTrigger);

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);
  }
}
