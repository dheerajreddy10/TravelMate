import { createContext, useContext, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const RefContext = createContext(null);

export const RefProvider = ({ children }) => { // Destructure props
  const locationInfoRef = useRef(null);
  const hotelsRef = useRef(null); // Fixed typo: "holetsRef" -> "hotelsRef"
  const placesRef = useRef(null);

  return (
    <RefContext.Provider value={{ locationInfoRef, hotelsRef, placesRef }}>
      {children}
    </RefContext.Provider>
  );
};

// **Add PropTypes validation**
RefProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are passed correctly
};

export const useRefContext = () => useContext(RefContext);

export default RefProvider;
