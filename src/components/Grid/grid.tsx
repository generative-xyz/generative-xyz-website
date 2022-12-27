import React, { useCallback, useEffect, useState } from 'react';

export const GridDebug = (): any => {
  const [isGird, setIsGrid] = useState(false);
  const handleKeyDown = useCallback(
    (ev: any) => {
      const key = ev.which || ev.keyCode;
      const isShift = !!ev.shiftKey;
      if (isShift && key === 71) {
        window.localStorage.setItem('isGrid', String(!isGird));
        setIsGrid(!isGird);
      }
    },
    [isGird]
  );

  useEffect(() => {
    const localIsGrid = window.localStorage.getItem('isGrid');
    if (localIsGrid === 'true') {
      setIsGrid(true);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isGird]);

  return (
    <div className={`grid-debug ${isGird ? '' : 'd-none'}`}>
      <div className="container container__extract">
        <div className="row">
          <div className="col-sm-1 col col--1">
            <div className="grid-col" />
          </div>
          <div className="col-sm-1 col col--2">
            <div className="grid-col" />
          </div>
          <div className="col-sm-1 col col--3">
            <div className="grid-col" />
          </div>
          <div className="col-sm-1 col col--4">
            <div className="grid-col" />
          </div>
          <div className="col-1 col--5 d-sm-block d-none">
            <div className="grid-col" />
          </div>
          <div className="col-1 col--6 d-sm-block d-none">
            <div className="grid-col" />
          </div>
          <div className="col-1 col--7 d-sm-block d-none">
            <div className="grid-col" />
          </div>
          <div className="col-1 col--8 d-sm-block d-none">
            <div className="grid-col" />
          </div>
          <div className="col-1 col--9 d-sm-block d-none">
            <div className="grid-col" />
          </div>
          <div className="col-1 col--10 d-sm-block d-none">
            <div className="grid-col" />
          </div>
          <div className="col-1 col--11 d-sm-block d-none">
            <div className="grid-col" />
          </div>
          <div className="col-1 col--12 d-sm-block d-none">
            <div className="grid-col" />
          </div>
        </div>
      </div>
    </div>
  );
};
