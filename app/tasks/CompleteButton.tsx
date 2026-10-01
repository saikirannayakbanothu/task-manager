import { startTransition } from "react";
import { updateTask } from "./actions";

type CompleteButtonProps = {
    taskId: string;
    completed: boolean;
    onOptimisticUpdate: (
        taskId: string,
        completed: boolean
    ) => void;
}

const CompleteButton = ({ taskId, completed, onOptimisticUpdate }: CompleteButtonProps) => {

    async function handleToggle() {
        const newCompleted = !completed;

        startTransition(async () => {
            onOptimisticUpdate(taskId, newCompleted)
            await updateTask(taskId, newCompleted);
        })
    }

    return (
        <button onClick={handleToggle}>
            {completed ? "Undo" : "Complete"}
        </button>
    );
}


export default CompleteButton