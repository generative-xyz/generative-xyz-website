import s from './styles.module.scss';
import React, {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import useAsyncEffect from 'use-async-effect';
import { ISandboxRef, SandboxFiles } from '@interfaces/sandbox';
import { SandboxSWEventType } from '@enums/service-worker';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { generateID } from '@utils/generate-data';

const LOG_PREFIX = 'SandboxPreview';

interface IProps {
  sandboxFiles: SandboxFiles | null;
  rawHtml: string | null;
  hash: string | null;
  onLoaded?: () => void;
  showIframe?: boolean;
}

const SandboxPreview = React.forwardRef<ISandboxRef, IProps>(
  (props: IProps, ref: ForwardedRef<ISandboxRef>) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const workerReg = useRef<ServiceWorkerRegistration | null>(null);
    const { sandboxFiles, rawHtml, hash, onLoaded, showIframe = true } = props;
    const [id, setId] = useState<string>('0');
    const [workerIns, setWorkerIns] =
      useState<ServiceWorkerRegistration | null>(null);

    const reloadIframe = () => {
      if (iframeRef.current) {
        // eslint-disable-next-line no-self-assign
        iframeRef.current.src = iframeRef.current.src;
      }
    };

    const getHtmlIframe = (): HTMLIFrameElement | null => {
      return iframeRef.current;
    };

    useImperativeHandle(ref, () => ({
      reloadIframe,
      getHtmlIframe,
    }));

    useEffect(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js', {
            scope: '/',
          })
          .then(reg => {
            workerReg.current = reg;
            setWorkerIns(reg);
          })
          .catch((err: Error) => {
            log(err, LogLevel.Error, LOG_PREFIX);
          });
      }
    }, []);

    useAsyncEffect(async () => {
      if (sandboxFiles && workerReg.current) {
        const worker = workerReg.current;

        if (!worker.active) {
          return;
        }

        const id = generateID(6);

        worker.active.postMessage({
          type: SandboxSWEventType.REGISTER_REFERRER,
          data: {
            id: id,
            referrer: {
              base: `${location.origin}/sandbox/preview.html`,
              root: `${location.origin}/sandbox/`,
            },
          },
        });

        worker.active.postMessage({
          type: SandboxSWEventType.REGISTER_URLS,
          data: {
            id,
            record: sandboxFiles,
          },
        });

        setId(id);
      }
    }, [sandboxFiles, workerIns]);

    useAsyncEffect(async () => {
      if (rawHtml && workerReg.current) {
        const worker = workerReg.current;

        if (!worker.active) {
          return;
        }

        const id = generateID(6);

        worker.active.postMessage({
          type: SandboxSWEventType.REGISTER_REFERRER,
          data: {
            id: id,
            referrer: {
              base: `${location.origin}/sandbox/preview.html`,
              root: `${location.origin}/sandbox/`,
            },
          },
        });

        worker.active.postMessage({
          type: SandboxSWEventType.REGISTER_HTML,
          data: {
            id: id,
            html: rawHtml,
          },
        });

        setId(id);
      }
    }, [rawHtml, workerIns]);

    useEffect(() => {
      if (iframeRef.current && id !== '0' && showIframe === true) {
        const previewUrl = `${location.origin}/sandbox/preview.html?id=${id}&seed=${hash}`;
        iframeRef.current.src = previewUrl;
      }
    }, [id, hash, showIframe]);

    return (
      <div className={s.sandboxPreview}>
        {showIframe && (
          <iframe
            ref={iframeRef}
            sandbox="allow-scripts allow-same-origin"
            className={s.iframeContainer}
            onLoad={onLoaded}
            style={{ overflow: 'hidden' }}
          />
        )}
      </div>
    );
  }
);

export default SandboxPreview;
SandboxPreview.displayName = 'SandboxPreview';
