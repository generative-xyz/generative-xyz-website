import { gsap } from 'gsap';
import store from '@redux';
import { setDisabledMenu } from '@redux/general/action';

export class ScrollFixed {
  tl: GSAPTimeline;
  timeClear?: NodeJS.Timeout;

  constructor(
    el: HTMLElement,
    endSize: number,
    onUpdate?: (self: ScrollTrigger) => void,
    start = 'center center',
    toggle?: (self: ScrollTrigger) => void
  ) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ScrollTrigger = require('gsap/ScrollTrigger').default;
    gsap.registerPlugin(ScrollTrigger);

    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        // markers: true,
        start: start,
        end: () => '+=' + endSize,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: onUpdate,
        onToggle: self => {
          if (this.timeClear) clearTimeout(this.timeClear);
          this.timeClear = setTimeout(() => {
            store.dispatch(setDisabledMenu(self.isActive));
            toggle && toggle(self);
          }, 100);
        },
      },
      defaults: { ease: 'none' },
    });
  }

  kill() {
    this.tl.kill();
  }
}
