import s from './styles.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { SandboxFiles } from '@interfaces/sandbox';
import { SandboxSWEventType } from '@enums/service-worker';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';

const LOG_PREFIX = 'SandboxPreview';

interface IProps {
  sandboxFiles: SandboxFiles | null;
}

const SandboxPreview: React.FC<IProps> = ({
  sandboxFiles,
}: IProps): React.ReactElement => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const workerReg = useRef<ServiceWorkerRegistration | null>(null);
  const [id, setId] = useState<string>('0');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sandbox/sw.js', {
          scope: '/sandbox',
        })
        .then(reg => {
          workerReg.current = reg;
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

      const id = (Math.random() * 1000000).toFixed(0);

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
  }, [sandboxFiles]);

  useEffect(() => {
    if (iframeRef.current && id !== '0') {
      const previewUrl = `${location.origin}/sandbox/preview.html?id=${id}`;
      iframeRef.current.src = previewUrl;
    }
  }, [id]);

  return (
    <div>
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts allow-same-origin"
        className={s.sandboxPreview}
      />
    </div>
  );
};

export default SandboxPreview;
