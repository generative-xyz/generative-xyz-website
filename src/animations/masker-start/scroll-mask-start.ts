import { gsap } from 'gsap';

export class ScrollMaskStart {
  tl?: GSAPTimeline;
  tl2?: GSAPTimeline;
  funs: Record<string, () => void>;
  resizeObserver: ResizeObserver;
  Dom: Record<string, HTMLElement>;
  timeOut?: NodeJS.Timeout;

  constructor(el: HTMLElement, afterSetup: () => void) {
    this.funs = { afterSetup };
    this.Dom = { el };
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ScrollTrigger = require('gsap/ScrollTrigger').default;
    gsap.registerPlugin(ScrollTrigger);

    this.init();
    this.resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
      if (this.timeOut) clearTimeout(this.timeOut);
      this.tl?.kill();
      if (this.tl2) this.tl2.kill();
      this.init();
    });
    this.resizeObserver.observe(this.Dom?.el);
  }

  init() {
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.Dom.el,
        start: 'top bottom',
        scrub: true,
        anticipatePin: 1,
        end: 'top center',
      },
      defaults: { ease: 'none' },
    });

    this.timeOut = setTimeout(() => {
      this.tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: this.Dom.el,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
          anticipatePin: 1,
        },
        defaults: { ease: 'none' },
      });

      this.funs.afterSetup();
    }, 100);
  }

  kill() {
    if (this.timeOut) clearTimeout(this.timeOut);
    this.tl?.kill();
    if (this.tl2) this.tl2.kill();
    if (this.Dom.el) this.resizeObserver.unobserve(this.Dom.el);
  }
}
