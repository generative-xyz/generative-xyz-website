import s from './styles.module.scss';
import Select from 'react-select';
import React from 'react';
import { StateManagerProps } from 'react-select/dist/declarations/src/stateManager';

export const CsSelect = (props: StateManagerProps): JSX.Element => {
  return (
    <div className={s.dropDownWrapper}>
      <Select className={s.selectInput} {...props} />
    </div>
  );
};
