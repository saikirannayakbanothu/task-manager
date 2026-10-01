"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../lib/db";
import Task from "../models/Task";

export type TaskActionState = {
  success: boolean;
  message: string;
};

export async function createTask(
  previousState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const title = formData.get("title");

  if (!title || typeof title !== "string") {
    return {
      success: false,
      message: "Task title is required.",
    };
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 3) {
    return {
      success: false,
      message: "Task title must contain at least 3 characters.",
    };
  }

  try {
    await connectDB();

    await Task.create({
      title: trimmedTitle,
    });

    revalidatePath("/tasks");

    return {
      success: true,
      message: "Task created successfully.",
    };

  } catch (error) {
    console.error("Create task error:", error);

    return {
      success: false,
      message: "Failed to create task.",
    };
  }
}

export async function deleteTask(taskId: string): Promise<TaskActionState> {
  try {
    await connectDB();
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return {
        success: false,
        message: "Task not found!",
      };
    }

    revalidatePath("/tasks");

    return {
      success: true,
      message: "Task deleted successfully",
    };
  } catch (error) {
    console.error("Delete task error:", error);
  }

  return {
    success: false,
    message: "Failed to delete Task",
  };
}


export async function updateTask(taskId: string, completed: boolean): Promise<TaskActionState> {
  
  try{
    await connectDB();

    const updatedTask = await Task.findByIdAndUpdate(taskId, {completed}, {new: true});

    if(!updateTask) {
      return {
        success: false,
        message: "Task not found"
      }
    }

    revalidatePath("/tasks");

    return {
      success: true,
      message: completed ? "Task updated successfully!" : "Task marked as incomplete!"
    }

  }
  catch (error) {
    console.error("Update task error", error);
  }

  return {
    success: false,
    message: "Failed to update the task.!"
  }
}