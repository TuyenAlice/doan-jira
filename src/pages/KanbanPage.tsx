import { useEffect, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Row, Col, Card, Typography, Tag, Avatar, Divider, Layout } from "antd";
import { getAllStatus } from "../services/status-service";
import { TaskDetail, TaskStatus } from "../interfaces/TaskInterface";
import {
  getProjectDetail,
  updateTaskStatus,
} from "../services/project-service";
import MenuBar from "../components/MenuBar";
import { useSearchParams } from "react-router-dom";

const { Sider } = Layout;

const { Title } = Typography;

const KanbanDashboard = () => {
  let projectId: any = {};
  const [columns, setColumns] = useState<any>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    projectId = Number.parseInt(searchParams.get("projectId")!);

    let tasksByStatus: any = {};

    getProjectDetail(projectId).then((response) => {
      tasksByStatus = response.data.lstTask.reduce((acc: any, item: any) => {
        acc[item.statusName] = item.lstTaskDeTail;
        return acc;
      }, {});

      getAllStatus().then((response) => {
        const updatedColumns: TaskStatus[] = [];
        response.data.forEach((status) => {
          updatedColumns.push(status);
        });

        const tmp = updatedColumns.reduce((acc: any, status) => {
          acc[status.statusId] = {
            title: status.statusName,
            tasks: tasksByStatus[status.statusName],
          };
          return acc;
        }, {});
        console.log(tmp);
        setColumns(tmp);
      });
    });
  }, []);

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) return;

    const fromColumn = active.data.current.task.statusId;
    const toColumn = over.id;

    if (fromColumn !== toColumn) {
      const draggedTask: TaskDetail = active.data.current.task;

      setColumns((prevColumns: any) => {
        const updatedFromColumn: any = prevColumns[fromColumn];
        const updatedToColumn: any = prevColumns[toColumn];

        updatedFromColumn.tasks = updatedFromColumn.tasks?.filter(
          (t: any) => t.taskId !== draggedTask.taskId
        );
        draggedTask.statusId = toColumn;
        updatedToColumn.tasks.push(draggedTask);

        updateStatus(draggedTask);

        return {
          ...prevColumns,
          [fromColumn]: updatedFromColumn,
          [toColumn]: updatedToColumn,
        };
      });
    }
  };

  const DraggableCard = ({ task }: any) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: task.taskId.toString(),
      data: { task },
    });

    return (
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Translate.toString(transform),
          marginBottom: "16px",
          cursor: "move",
        }}
        {...listeners}
        {...attributes}
      >
        <Card
          hoverable
          style={{
            backgroundColor: "#fefefe",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
          title={<strong>{task.taskName}</strong>}
        >
          <Tag color={getPriorityColor(task.priorityTask.priority)}>
            {task.priorityTask.priority}
          </Tag>
          <Tag color="blue">{task.taskTypeDetail.taskType}</Tag>
          <Divider />
          <p>{task.description}</p>
          <div>
            <Avatar.Group>
              {task.assigness.map((assignee: any) => (
                <Avatar key={assignee.id} src={assignee.avatar} />
              ))}
            </Avatar.Group>
          </div>
        </Card>
      </div>
    );
  };

  //   const renderTaskAssignee = (assignees: any) => {
  //     return assignees.map((assignee: any) => (
  //       <li key={assignee.id}>
  //         {assignee.name}
  //         <br />
  //         <img src={assignee.avatar} alt="" />
  //       </li>
  //     ));
  //   };

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

  const updateStatus = async (task: TaskDetail) => {
    await updateTaskStatus(task)
      .then((response) => {
        console.log(response);
      })
      .catch();
  };

  const DroppableColumn = ({ id, children }: any) => {
    const { setNodeRef } = useDroppable({ id });

    return (
      <Col span={6}>
        <Title level={4} style={{ color: "#1890ff" }}>
          {columns[id].title}
        </Title>
        <div
          ref={setNodeRef}
          style={{
            minHeight: "800px",
            padding: "16px",
            backgroundColor: "#f0f2f5",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {children}
        </div>
      </Col>
    );
  };

  return (
    <Layout>
      <Sider>
        <MenuBar />
      </Sider>
      <Layout style={{ margin: "0 16px" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Item>Project</Item>
          <Item>Dashboard</Item>
        </Breadcrumb> */}
        <DndContext onDragEnd={handleDragEnd}>
          <Row gutter={24}>
            {Object.entries(columns).map((item: any) => (
              <DroppableColumn key={item[0]} id={item[0]}>
                {item[1].tasks?.map((task: any) => (
                  <DraggableCard key={task.taskId} task={task} />
                ))}
              </DroppableColumn>
            ))}
          </Row>
        </DndContext>
      </Layout>
    </Layout>
  );
};

export default KanbanDashboard;
