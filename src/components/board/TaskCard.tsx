// Draggable - Defines an item that can be dragged.

import { Draggable } from "@hello-pangea/dnd";
import { Check, Pencil, Trash2, GripVertical } from "lucide-react";

import type { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
  index: number;

  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}
export default function TaskCard({
  task,
  index,
  onEdit,
  onDelete,
  onComplete,
}: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`
            rounded-xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            transition
            dark:border-slate-700
            dark:bg-slate-800
            ${snapshot.isDragging ? "rotate-2 shadow-xl" : "hover:shadow-md"}
          `}
        >
          <div className="mb-3 flex items-start gap-3">
            <button
              type="button"
              {...provided.dragHandleProps}
              aria-label={`Drag ${task.title}`}
              className="
                mt-1
                cursor-grab
                rounded
                p-1
                text-slate-400
                hover:bg-slate-100
                hover:text-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                active:cursor-grabbing
                dark:hover:bg-slate-700
                dark:hover:text-slate-200
              "
            >
              <GripVertical size={18} />
            </button>

            <div className="min-w-0 flex-1">
              <h3
                className="
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                {task.title}
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {task.description}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <span
              className="
                inline-flex
                rounded-full
                bg-slate-100
                px-2.5
                py-1
                text-xs
                font-medium
                text-slate-700
                dark:bg-slate-700
                dark:text-slate-200
              "
            >
              {task.priority}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(task)}
              aria-label={`Edit ${task.title}`}
            >
              <Pencil size={16} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete ${task.title}`}
            >
              <Trash2 size={16} />
            </button>

            <button
              type="button"
              onClick={() => onComplete(task.id)}
              aria-label={`Mark ${task.title} as complete`}
            >
              <Check size={16} />
            </button>
          </div>
        </article>
      )}
    </Draggable>
  );
}
