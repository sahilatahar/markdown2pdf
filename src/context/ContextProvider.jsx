import { createContext } from "react";
import useText from "../hooks/useText";
import PropTypes from "prop-types";

const Context = createContext();

export default Context;

export const ContextProvider = ({ children }) => {
  const { text, setText } = useText();

  return (
    <Context.Provider value={{ text, setText }}>{children}</Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
