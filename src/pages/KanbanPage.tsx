// import { useEffect, useState } from 'react';
// import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
// import { Card, Col, Row, Typography } from 'antd';
// import { ProjectDetail } from '../interfaces/ProjectInterface';
// import { getAllStatus } from '../services/status-service';
// import { TaskStatus } from '../interfaces/TaskInterface';

// const { Title } = Typography;

// const KanbanPage = () => {
//     const [columns, setColumns] = useState<TaskStatus[]>([]);
//     const [project, setProject] = useState<ProjectDetail>();
//     const [kanban, setKanban] = useState<any>({});

//     useEffect(() => {
//         if (!project) {
//             const data: ProjectDetail = JSON.parse(localStorage.getItem("project-detail") || "{}");
//             console.log(data);

//             setProject(data);
//             initKanban();
//             console.log(project);

//         }
//     }, [project]);

//     const onDragEnd = (result: DropResult) => {
//         const { source, destination } = result;

//         if (!destination) return; // Task was dropped outside of any list

//         const sourceCol = kanban[source.droppableId];
//         const destCol = kanban[destination.droppableId];
//         const [movedTask] = sourceCol.tasks.splice(source.index, 1);

//         destCol.tasks.splice(destination.index, 0, movedTask);

//         // Update task status in backend
//         // updateTaskStatus(movedTask.id, destination.droppableId);

//         setKanban(kanban);
//     };

//     const initKanban = async () => {
//         const updatedColumns: TaskStatus[] = [];
//         await getAllStatus().then((response) => {
//             response.data.forEach((status) => {
//                 updatedColumns.push(status);
//             });
//             setColumns(updatedColumns);
//             console.log(project);

//             const tmp = updatedColumns.reduce((acc: any, status) => {
//                 acc[status.statusId] = { title: status.statusName, tasks: [] };
//                 return acc;
//             }, {});
//             setKanban(tmp);
//         });
//     }

//     return (
//         <DragDropContext onDragEnd={onDragEnd}>
//             <Row gutter={16}>
//                 {Object.entries(kanban).map(([columnId, k]: any) => (
//                     <Col key={columnId} span={6}>
//                         <Title level={4}>{k.title}</Title>
//                         <Droppable droppableId={columnId}>
//                             {(provided) => (
//                                 <div {...provided.droppableProps} ref={provided.innerRef} style={{ minHeight: '200px' }}>
//                                     {k.tasks.map((task: any, index: any) => (
//                                         <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
//                                             {(provided) => (
//                                                 <Card
//                                                     ref={provided.innerRef}
//                                                     {...provided.draggableProps}
//                                                     {...provided.dragHandleProps}
//                                                     style={{ marginBottom: '8px' }}
//                                                 >
//                                                     {task.name}
//                                                 </Card>
//                                             )}
//                                         </Draggable>
//                                     ))}
//                                     {provided.placeholder}
//                                 </div>
//                             )}
//                         </Droppable>
//                     </Col>
//                 ))}
//             </Row>
//         </DragDropContext>
//     );
// };

// export default KanbanPage;
