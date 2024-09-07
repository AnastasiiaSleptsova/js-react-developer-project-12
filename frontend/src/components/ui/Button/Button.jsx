import BootstrapButton from "react-bootstrap/Button";

export const Button = (props) => {
  return <BootstrapButton {...props}>{props.children}</BootstrapButton>;
};
