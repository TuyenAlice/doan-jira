import React, { useState } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
};

const items: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dự án",
    path: "/project",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Quản lý người dùng",
    path: "/usermanagement",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Dashboard",
    path: "/dashboard",
  },
];

const MenuBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onMenuClick = (e: { key: string }) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  return (
    <Layout className="flex" style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <Button
            type="text"
            onClick={toggleCollapsed}
            style={{ color: "white" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          items={items}
          onClick={onMenuClick} // Thêm hàm onClick vào Menu
        />
      </Sider>
    </Layout>
  );
};

export default MenuBar;
