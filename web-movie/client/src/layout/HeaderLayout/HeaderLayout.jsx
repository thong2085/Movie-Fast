import React from "react";
import { Layout, Menu } from "antd";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import logo from "../../assets/images/logo.png";
import "./styles.css";

const { Header } = Layout;
const items = [
  {
    icon: <CaretRightOutlined />,
    label: "Clicking me will not close the menu.",
    key: "1",
  },
  {
    icon: <CaretRightOutlined />,
    label: "Clicking me will not close the menu also.",
    key: "2",
  },
  {
    icon: <CaretRightOutlined />,
    label: "Clicking me will close the menu.",
    key: "3",
  },
];

const onSearch = (value, _e, info) => console.log(info?.source, value);
const HeaderLayout = () => {
  return (
    <Header>
      <div className="logo">
        <img src={logo} alt="#" style={{ height: "50px" }} />
      </div>
      <Menu
        className="Menu-header"
        theme="dark"
        mode="horizontal"
        style={{ width: "100%" }}
      >
        <li key="1" className="Menu-item">
          Phim mới
        </li>
        <li key="2" className="Menu-item">
          Phim lẻ
        </li>
        <li key="3" className="Menu-item">
          Phim bộ
        </li>
        <li key="4" className="Menu-item">
          <Dropdown className="dropdown-item" menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Thể loại
                <CaretDownOutlined />
              </Space>
            </a>
          </Dropdown>
        </li>
        <li key="5" className="Menu-item">
          <Dropdown className="dropdown-item" menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Quốc gia
                <CaretDownOutlined />
              </Space>
            </a>
          </Dropdown>
        </li>
      </Menu>
      <div className="search-form">
        <input
          className="search-input"
          placeholder="Tìm kiếm..."
          onSearch={onSearch}
          style={{ width: "100%" }}
        />
        <SearchOutlined className="icon-search" />
      </div>
    </Header>
  );
};

export default HeaderLayout;
