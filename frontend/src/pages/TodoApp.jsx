import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col items-center p-8 transition-all", 
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      )}
    >
      {/* Navbar */}
      <nav className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </nav>

      {/* Task Input */}
      <div className="flex gap-2 w-full max-w-2xl">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      {/* Task List */}
      <div className="mt-6 w-full max-w-2xl grid gap-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card
              className={clsx(
                "p-4 flex justify-between items-center shadow-lg transition-all rounded-lg border",
                task.completed ? "border-green-500 bg-green-100" : "border-gray-300"
              )}
            >
              <span
                className={clsx(
                  "cursor-pointer", 
                  task.completed && "line-through text-gray-500"
                )}
                onClick={() => toggleComplete(task.id)}
              >
                {task.text}
              </span>
              <Button variant="ghost" onClick={() => removeTask(task.id)}>
                ✕
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
