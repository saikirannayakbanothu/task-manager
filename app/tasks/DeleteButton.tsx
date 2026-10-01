"use client";

import { startTransition } from "react";
import { deleteTask } from "./actions";


type DeleteButtonProps = {
    taskId: string;
    onOptimisticDelete: (taskId: string) => void;
};

export default function DeleteButton({
    taskId,
    onOptimisticDelete,
}: DeleteButtonProps) {
    async function handleDelete() {
        startTransition(async () => {
            onOptimisticDelete(taskId);
            await deleteTask(taskId);
        })
    }

    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    );
}