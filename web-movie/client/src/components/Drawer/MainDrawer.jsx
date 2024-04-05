import React from "react";
import Drawer from "rc-drawer";

const MainDrawer = ({ children, drawerOpen, closeDrawer }) => {
  return (
    <Drawer
      open={drawerOpen}
      onClose={closeDrawer}
      level={null}
      handler={false}
      placement="right"
      className="drawer-container"
      style={{ width: "100%", maxWidth: "378px" }} // Đặt kích thước cho Drawer
    >
      {children}
    </Drawer>
  );
};

export default MainDrawer;
