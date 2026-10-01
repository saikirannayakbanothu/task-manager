

import { connectDB } from "../lib/db";
import Task from "../models/Task";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default async function TasksPage() {
  await connectDB();

  const tasks = await Task.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="tasks-page">

      <section className="page-header">
        <p className="eyebrow">TASK MANAGER</p>

        <h1>My Tasks</h1>

        <p className="page-description">
          Organize your work and stay productive.
        </p>
      </section>

      <section className="task-card">

        <TaskForm />

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✓</div>

            <h3>No tasks yet</h3>

            <p>
              Create your first task and start getting things done.
            </p>
          </div>
        ) : (
          <TaskList
            tasks={tasks.map((task) => ({
              _id: task._id.toString(),
              title: task.title,
              completed: task.completed,
            }))}
          />
        )}

      </section>

    </div>
  );
}