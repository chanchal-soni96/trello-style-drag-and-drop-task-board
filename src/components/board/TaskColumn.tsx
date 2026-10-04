// Droppable - Defines an area where something can be dropped.

import { Droppable } from "@hello-pangea/dnd";

import type { Task, TaskStatus } from "../../types/task";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];

  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export default function TaskColumn({
  title,
  status,
  tasks,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
}: TaskColumnProps) {
  return (
    <section
      aria-labelledby={`${status}-heading`}
      className="
        flex
        min-h-[500px]
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          id={`${status}-heading`}
          className="
            text-lg
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          {title}
        </h2>

        <span
          className="
            rounded-full
            bg-slate-200
            px-2.5
            py-1
            text-xs
            font-semibold
            text-slate-700
            dark:bg-slate-700
            dark:text-slate-200
          "
        >
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex
              flex-1
              min-h-[420px]
              flex-col
              gap-3
              rounded-xl
              p-2
              transition
              ${snapshot.isDraggingOver ? "bg-blue-50 dark:bg-blue-950" : ""}
            `}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onComplete={onCompleteTask}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
