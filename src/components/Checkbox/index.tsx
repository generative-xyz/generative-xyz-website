import React, { useState } from 'react';
import styles from './styles.module.scss';

type CheckboxProps = {
  id: string;
  label: string;
  checked?: boolean;
};

const Checkbox = ({ id, label, checked, ...props }: CheckboxProps) => {
  const defaultChecked = checked ? checked : false;

  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <div className={styles.wrapper}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev: boolean) => !prev)}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
