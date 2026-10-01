"use client";

import { useOptimistic } from "react";
import DeleteButton from "./DeleteButton";
import CompleteButton from "./CompleteButton";

type Task = {
    _id: string;
    title: string;
    completed: boolean;
};

type TaskListProps = {
    tasks: Task[];
};

export default function TaskList({
    tasks,
}: TaskListProps) {
    const [optimisticTasks, optimisticUpdate] =
        useOptimistic(
            tasks,
            (
                currentTasks,
                action:
                    | {
                        type: "delete";
                        taskId: string;
                    }
                    | {
                        type: "update";
                        taskId: string;
                        completed: boolean;
                    }
            ) => {
                if (action.type === "delete") {
                    return currentTasks.filter(
                        (task) => task._id !== action.taskId
                    );
                }

                return currentTasks.map((task) =>
                    task._id === action.taskId
                        ? {
                            ...task,
                            completed: action.completed,
                        }
                        : task
                );
            }
        );

    return (
        <ul className="task-list">
            {optimisticTasks.map((task) => (
                <li
                    key={task._id}
                    className="task-item"
                >
                    <div className="task-info">
                        <span
                            className={
                                task.completed
                                    ? "task-completed"
                                    : ""
                            }
                        >
                            {task.completed ? "✓" : "○"}
                        </span>

                        <span
                            className={
                                task.completed
                                    ? "task-title completed"
                                    : "task-title"
                            }
                        >
                            {task.title}
                        </span>
                    </div>

                    <div className="task-actions">
                        <CompleteButton
                            taskId={task._id}
                            completed={task.completed}
                            onOptimisticUpdate={(
                                taskId,
                                completed
                            ) =>
                                optimisticUpdate({
                                    type: "update",
                                    taskId,
                                    completed,
                                })
                            }
                        />

                        <DeleteButton
                            taskId={task._id}
                            onOptimisticDelete={(taskId) =>
                                optimisticUpdate({
                                    type: "delete",
                                    taskId,
                                })
                            }
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}