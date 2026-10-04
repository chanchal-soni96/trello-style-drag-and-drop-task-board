import { useState } from "react";

import TaskBoard from "./components/board/TaskBoard";
import TaskModal from "./components/board/TaskModal";

import { initialTasks } from "./data/initialTasks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";

import type { Task } from "./types/task";
import BoardGuidelines from "./components/board/BoardGuidelines";


function App() {
  // ============================
  // TASK STATE
  // ============================

  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "task-board-tasks",
    initialTasks,
  );

  // ============================
  // MODAL STATE
  // ============================

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // ============================
  // THEME FROM CONTEXT
  // ============================

  // ============================
  // ADD TASK
  // ============================

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // ============================
  // EDIT TASK
  // ============================

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // ============================
  // SAVE TASK
  // ============================

  const handleSaveTask = (taskData: Omit<Task, "id">) => {
    if (editingTask) {
      // Update existing task
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...taskData,
              }
            : task,
        ),
      );
    } else {
      // Create new task
      const newTask: Task = {
        id: crypto.randomUUID(),
        ...taskData,
      };

      setTasks((currentTasks) => [...currentTasks, newTask]);
    }

    setIsModalOpen(false);
    setEditingTask(null);
  };

  // ============================
  // DELETE TASK
  // ============================

  const handleDeleteTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  // ============================
  // COMPLETE TASK
  // ============================

  const handleCompleteTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed",
            }
          : task,
      ),
    );
  };

  // ============================
  // CLOSE MODAL
  // ============================

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        text-slate-900
        transition-colors
        dark:bg-slate-950
        dark:text-white
      "
    >
      {/* ============================
          HEADER
      ============================ */}

      <Header onAddTask={handleAddTask} />

      <BoardGuidelines />

      {/* ============================
          TASK BOARD
      ============================ */}

      <TaskBoard
        tasks={tasks}
        onTasksChange={setTasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onCompleteTask={handleCompleteTask}
      />

      {/* ============================
          TASK MODAL
      ============================ */}

      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
      />
    </div>
  );
}

export default App;
