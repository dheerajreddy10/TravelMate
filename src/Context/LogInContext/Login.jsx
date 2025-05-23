import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const LogInContext = createContext(null);

export const LogInContextProvider = ({ children }) => { // Destructure props
    const { user, loginWithPopup, logout, isAuthenticated } = useAuth0();
    const [trip, setTrip] = useState([]);

    return (
        <LogInContext.Provider value={{ user, loginWithPopup, logout, isAuthenticated, trip, setTrip }}>
            {children}
        </LogInContext.Provider>
    );   
};

// **Add PropTypes validation**
LogInContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensures children are passed correctly
};

export default LogInContextProvider;
