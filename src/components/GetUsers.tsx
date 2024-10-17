import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/user-service"; // Đảm bảo đường dẫn đúng
import { Table, Spin, Alert, Layout } from "antd";
import { User } from "../interfaces/UserInterface";
import MenuBar from "./MenuBar";
const { Sider } = Layout;
import JiraHeader from "../components/Header";
const { Header } = Layout;

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers(""); // Truyền vào keyword nếu cần
        setUsers(result.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <Layout>
      <Header>
        <JiraHeader />
      </Header>
      {/* Sidebar Menu */}
      <Sider>
        <MenuBar />
      </Sider>
      <Layout>
        <Table
          dataSource={users}
          columns={[
            { title: "ID", dataIndex: "id", key: "id" },
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Email", dataIndex: "email", key: "email" },
            // Các cột khác nếu cần
          ]}
          rowKey="id"
        />
      </Layout>
    </Layout>
  );
};

export default UsersList;
