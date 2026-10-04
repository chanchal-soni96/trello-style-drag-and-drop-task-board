// DragDropContext - Controls the entire drag-and-drop system.

import {
  DragDropContext,
  type DropResult,
} from "@hello-pangea/dnd";

import type {
  Task,
  TaskStatus,
} from "../../types/task";

import TaskColumn from "./TaskColumn";

interface TaskBoardProps {
  tasks: Task[];
  onTasksChange: (
    tasks: Task[] |
    ((currentTasks: Task[]) => Task[])
  ) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export default function TaskBoard({
  tasks,
  onTasksChange,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
}: TaskBoardProps) {
  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  const handleDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;

    // If task is dropped outside a valid column
    if (!destination) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;

    const updatedTasks = tasks.map((task) => {  //Because we want to create a new array so we use map().
      if (task.id === draggableId) {
        return {
          ...task,
          status: newStatus,
        };
      }

      return task;
    });

    onTasksChange(updatedTasks);
  };

  return (
    <main
      className="
        mx-auto
        max-w-7xl
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >
      

      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-3
          "
        >
          <TaskColumn
  title="Todo"
  status="todo"
  tasks={todoTasks}
  onEditTask={onEditTask}
  onDeleteTask={onDeleteTask}
  onCompleteTask={onCompleteTask}
/>

<TaskColumn
  title="In Progress"
  status="in-progress"
  tasks={inProgressTasks}
  onEditTask={onEditTask}
  onDeleteTask={onDeleteTask}
  onCompleteTask={onCompleteTask}
/>

<TaskColumn
  title="Completed"
  status="completed"
  tasks={completedTasks}
  onEditTask={onEditTask}
  onDeleteTask={onDeleteTask}
  onCompleteTask={onCompleteTask}
/>
        </div>
      </DragDropContext>
    </main>
  );
}