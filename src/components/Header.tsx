import React, { useEffect, useState } from "react";
import { Avatar, Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/UserInterface";

const JiraHeader: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const user: User = storedUser;
    setUser(user);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  const loginContent = (
    <Button type="primary" onClick={() => navigate("/")}>
      Login
    </Button>
  );

  const logoutContent = (
    <div>
      <div className="flex items-center mb-2">
        <Avatar src={user?.avatar} size={32} />
        <div className="ml-2">
          <p className="font-bold">{user?.name || "No Name"}</p>{" "}
          <p className="text-gray-400">{user?.email || "No Email"}</p>{" "}
        </div>
      </div>
      <Button danger onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  const renderUserSection = () => {
    if (!user) {
      return (
        <div className="account flex items-center float-right">
          <Popover content={loginContent} trigger="click">
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              size={60}
            />
          </Popover>
          <div className="account-info ml-2 text-white">
            <p className="font-bold">Chưa đăng nhập</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="account flex items-center">
          <Popover content={logoutContent} trigger="click">
            <Avatar src={user.avatar} size={32} />
          </Popover>
          {/* <div className="account-info ml-2 text-white">
            <p className="font-bold  text-white">{user.name || "No Name"}</p>{" "}
          </div> */}
        </div>
      );
    }
  };

  return (
    <header className="flex justify-between items-center] p-4 h-16">
      <div className="ml-auto flex items-center">{renderUserSection()}</div>
    </header>
  );
};

export default JiraHeader;
