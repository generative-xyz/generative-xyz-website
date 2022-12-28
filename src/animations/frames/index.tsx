import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollFixed } from '../scroll-fixed';
import { MathLerp, MathMap } from '@helpers/functions.helpers';
import classNames from 'classnames';
import s from './frame.module.scss';
import {
  isMobileAndTablet,
  registerLoading,
  unRegisterLoading,
  webpSupported,
} from '@helpers/anim.helpers';

interface IProps {
  className: string;
  urlFrame: string;
  webmFrame?: string;
  totalFrames: number;
  children: ReactNode;
  height: number;
  width: 1920;
  onProcessing?: (n: number) => void;
  onEnter?: () => void;
}

interface IRefDomFrames {
  currentFrame: number;
  images: { image: HTMLImageElement; frame: number }[];
  lastFrame: number;
  progress: number;
  framesFirstLoad: number;
  currentUrlFrame?: string;
  ctx: CanvasRenderingContext2D | null;
  canvas?: HTMLCanvasElement;
  scrollFixed?: ScrollFixed;
}

export const Frames = ({
  className = '',
  urlFrame = '',
  webmFrame = '',
  totalFrames = 0,
  children,
  height = 1080,
  width = 1920,
  onProcessing,
  onEnter,
}: IProps): JSX.Element => {
  const comp = useRef<HTMLDivElement>(null);
  const refDom = useRef<IRefDomFrames>({
    currentFrame: 0,
    images: [],
    lastFrame: 1,
    progress: 0,
    framesFirstLoad: 50,
    ctx: null,
  });

  const registerImgDom = (frame: number) => {
    if (frame > totalFrames) return;
    if (refDom.current.currentUrlFrame && !refDom.current.images[frame]) {
      refDom.current.images[frame] = {
        image: document.createElement('img'),
        frame,
      };
      refDom.current.images[frame].image.src =
        refDom.current.currentUrlFrame.replace(
          '%d',
          Math.floor(frame).toString()
        );
    }
  };

  const drawFrame = (image: HTMLImageElement) => {
    refDom.current.ctx?.clearRect(
      0,
      0,
      refDom.current.canvas?.width || window.innerWidth,
      refDom.current.canvas?.height || window.innerHeight
    );
    refDom.current.ctx?.drawImage(image, 0, 0);
  };

  const loadFrame = async (frame: number, onLoaded?: () => void | null) => {
    if (!refDom.current.currentUrlFrame) {
      refDom.current.currentUrlFrame =
        (await webpSupported()) && webmFrame !== '' ? webmFrame : urlFrame;
    }

    if (frame > totalFrames || refDom.current.images[frame]) return;
    registerImgDom(frame);
    refDom.current.images[frame].image.onload = () => {
      if (!onLoaded) {
        if (
          refDom.current.currentFrame === refDom.current.images[frame].frame
        ) {
          drawFrame(refDom.current.images[frame].image);
        }
      } else {
        onLoaded && onLoaded();
      }
    };
  };

  const loadFirstFrame = () => {
    registerLoading();
    const checkLoaded: Record<string, number> = { value: 0 };
    for (let i = 1; i <= refDom.current.framesFirstLoad; i++) {
      loadFrame(i, () => {
        checkLoaded.value++;
        if (checkLoaded.value >= refDom.current.framesFirstLoad) {
          unRegisterLoading();
          drawFrame(refDom.current.images[1].image);
        }
      });
    }
  };

  const runFrame = () => {
    const progress = refDom.current.progress || 0;

    const frameTmp: number = MathMap(progress, 0, 1, 1, totalFrames);
    refDom.current.lastFrame = Math.floor(
      MathLerp(refDom.current.lastFrame, frameTmp, 0.1)
    );
    const frame = refDom.current.lastFrame;

    if (frame !== refDom.current.currentFrame) {
      onProcessing && onProcessing(frame);

      refDom.current.currentFrame = frame;
      if (!refDom.current.images[frame]) {
        loadFrame(frame);
      } else if (
        refDom.current.images[frame] &&
        refDom.current.currentFrame === refDom.current.images[frame].frame
      ) {
        registerImgDom(frame + refDom.current.framesFirstLoad);
        drawFrame(refDom.current.images[frame].image);
      }
    }
  };

  const runCanvas = async () => {
    if (!comp.current) return;

    const wrapper: HTMLElement | null =
      comp.current.querySelector('.js-frames');
    refDom.current.canvas =
      comp.current.querySelector('canvas') || document.createElement('canvas');
    wrapper?.classList.add(s['wrap-canvas']);
    wrapper?.append(refDom.current.canvas);
    const rect: DOMRect | undefined = wrapper?.getBoundingClientRect();

    refDom.current.canvas.width = width || rect?.width || window.innerWidth;
    refDom.current.canvas.height = height || rect?.height || window.innerHeight;

    refDom.current.ctx = refDom.current.canvas.getContext('2d');
    const scrollHeight = MathMap(totalFrames, 0, 30, 0, window.innerHeight);

    runFrame();
    if (!refDom.current.scrollFixed) {
      refDom.current.scrollFixed = new ScrollFixed(
        comp.current,
        scrollHeight,
        (self: ScrollTrigger) => {
          refDom.current.progress = self.progress;
        },
        'top top',
        (self: ScrollTrigger) => {
          if (self.isActive) {
            onEnter && onEnter();
            gsap.ticker.add(runFrame);
          } else {
            gsap.ticker.remove(runFrame);
          }
        }
      );
    }
  };

  useEffect(() => {
    const anim = gsap.context(() => {
      if (isMobileAndTablet()) return;
      loadFirstFrame();
      runCanvas();
    }, [comp]);

    return () => {
      anim.revert();
      if (isMobileAndTablet()) return;
      refDom.current.scrollFixed?.kill();
      refDom.current.canvas && refDom.current.canvas.remove();
      gsap.ticker.remove(runFrame);
      refDom.current.scrollFixed = undefined;
      unRegisterLoading();
    };
  }, []);

  return (
    <div className={classNames(className, s.frames)} ref={comp}>
      {children}
    </div>
  );
};
