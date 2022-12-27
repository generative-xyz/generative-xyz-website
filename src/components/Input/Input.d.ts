declare namespace IInput {
  interface IProps {
    clearable?: boolean;
    usingFormik?: boolean;
    onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  }
}
