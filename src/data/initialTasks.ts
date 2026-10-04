import type { Task } from "../types/task";

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Learn React",
    description: "Study React component fundamentals",
    status: "todo",
    priority: "high",
  },
  {
    id: "2",
    title: "Build FastAPI API",
    description: "Create CRUD endpoints",
    status: "todo",
    priority: "medium",
  },
  {
    id: "3",
    title: "Create Dashboard",
    description: "Build the task dashboard UI",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "4",
    title: "Git Basics",
    description: "Practice Git commands",
    status: "completed",
    priority: "low",
  },
];