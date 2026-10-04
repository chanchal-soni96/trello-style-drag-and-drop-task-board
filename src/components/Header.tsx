import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onAddTask: () => void;
}

function Header({ onAddTask }: HeaderProps) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header
      className="
        border-b
        border-slate-200
        bg-white
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          gap-6
          px-4
          py-6
          sm:px-6
          lg:px-8
        "
      >
        {/* LEFT SIDE */}

        <div>
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-blue-600
              dark:text-blue-400
            "
          >
            Task Management
          </p>

          <h1
            className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
              text-slate-900
              sm:text-3xl
              dark:text-white
            "
          >
            My Task Board
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Organize your work and keep track of
            your progress.
          </p>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-3">
          {/* THEME BUTTON */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDarkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-lg
              shadow-sm
              transition
              hover:bg-slate-100
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              dark:border-slate-700
              dark:bg-slate-800
              dark:hover:bg-slate-700
            "
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          {/* ADD TASK */}

          <button
            type="button"
            onClick={onAddTask}
            className="
              rounded-lg
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              dark:focus:ring-offset-slate-900
            "
          >
            + Add Task
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;