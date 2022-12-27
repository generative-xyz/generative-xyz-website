declare namespace IButton {
  interface IProps {
    className?: string;
    variant?:
      | 'black'
      | 'outline-black'
      | 'white'
      | 'outline-white'
      | 'cta-anim'
      | 'cta-border'
      | 'cta-none';
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  }
}

export default IButton;
