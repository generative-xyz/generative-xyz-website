declare namespace IButton {
  interface IProps {
    className?: string;
    variant?:
      | 'black'
      | 'outline-black'
      | 'white'
      | 'outline-white'
      | 'cta-anim'
      | 'cta-anim__black'
      | 'cta-border'
      | 'cta-border__black'
      | 'cta-none';
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  }
}

export default IButton;
