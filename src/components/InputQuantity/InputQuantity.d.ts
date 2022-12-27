import React from 'react';

declare namespace IInputQuantity {
  export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    name?: string;
    className?: string;
    size?: 'sm' | '';
    defaultValue?: number;
    maxLength?: number;
    maxValue?: number;
    maxValueErrorMessage?: string;
    onChange?: function;
    onMouseEnter?: function;
    onMouseLeave?: function;
    isLoading?: boolean;
    isShowIconLoading?: boolean;
    disabledChangeQuantity?: boolean;
  }
}

export { IInputQuantity };
