/* /context/AppContext.js */

import React from "react";
import { User } from "../schemas";
// create auth context with default value

// set backup default for isAuthenticated if none is provided in Provider
const AppContext = React.createContext({
  user: null,
  setUser: (user: User) => {},
  isAuthenticated: false,
});
export default AppContext;
