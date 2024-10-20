import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Tag, Avatar, Row, Col, Button, Divider } from "antd";
import { getTaskDetail, updateTaskStatus } from "../services/task-service";
import { TaskDetail } from "../interfaces/DetailTask";

const { Title, Text } = Typography;

const TaskDetailPage = () => {
  const { taskId } = useParams<{ taskId: string }>(); // Lấy taskId từ URL
  const [task, setTask] = useState<TaskDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (taskId) {
      getTaskDetail(parseInt(taskId))
        .then((response) => {
          setTask(response.data);
        })
        .catch((error) => {
          console.error("Error fetching task detail:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [taskId]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "blue";
    }
  };

  const handleStatusChange = async (newStatusId: number) => {
    if (task) {
      const updatedTask = { ...task, statusId: newStatusId };
      await updateTaskStatus(updatedTask)
        .then(() => {
          setTask(updatedTask);
        })
        .catch((error) => {
          console.error("Error updating task status:", error);
        });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <p>Loading...</p>
      ) : task ? (
        <Card
          title={<Title level={3}>{task.taskName}</Title>}
          bordered={false}
          style={{ maxWidth: "800px", margin: "auto", borderRadius: "8px" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Description:</Text>
              <p>{task.description}</p>
            </Col>
            <Col span={12}>
              <Text strong>Priority:</Text>
              <Tag color={getPriorityColor(task.priorityTask.priority)}>
                {task.priorityTask.priority}
              </Tag>
            </Col>
            <Col span={12}>
              <Text strong>Task Type:</Text>
              <Tag color="blue">{task.taskTypeDetail.taskType}</Tag>
            </Col>
            <Col span={12}>
              <Text strong>Status:</Text>
              <Tag color="green">{task.statusName}</Tag>
            </Col>
            <Col span={24}>
              <Divider />
              <Title level={5}>Assignees</Title>
              <Avatar.Group>
                {task.assigness.map((assignee) => (
                  <div
                    key={assignee.id}
                    style={{
                      display: "inline-block",
                      marginRight: "10px",
                      textAlign: "center",
                    }}
                  >
                    <Avatar src={assignee.avatar} />
                    <br />
                    <Text>{assignee.name}</Text>
                  </div>
                ))}
              </Avatar.Group>
            </Col>
            <Col span={24}>
              <Divider />
              <Title level={5}>Actions</Title>
              <Button
                type="primary"
                onClick={() => handleStatusChange(2)} // Ví dụ: chuyển trạng thái sang "In Progress"
              >
                Start Task
              </Button>
              <Button
                type="default"
                onClick={() => handleStatusChange(3)} // Ví dụ: chuyển trạng thái sang "Done"
                style={{ marginLeft: "10px" }}
              >
                Mark as Done
              </Button>
            </Col>
          </Row>
        </Card>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};

export default TaskDetailPage;
