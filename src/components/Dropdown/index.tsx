import React from 'react';
import Select, { SelectProps } from 'react-dropdown-select';
import cn from 'classnames';

import s from './Dropdown.module.scss';

const Dropdown: React.FC<SelectProps<object | string>> = ({
  className,
  ...rest
}): JSX.Element => {
  return <Select className={cn(s.Dropdown, className)} {...rest} />;
};

export default Dropdown;
