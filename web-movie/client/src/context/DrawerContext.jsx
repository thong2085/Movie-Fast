import { useState, createContext, useMemo } from "react";

export const SidebarContext = createContext();

const DrawerContext = ({ children }) => {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const toggleDrawer = () => setMobileDrawer(!mobileDrawer);
  const value = useMemo(() => ({ mobileDrawer, toggleDrawer }), [mobileDrawer]);
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export default DrawerContext;
