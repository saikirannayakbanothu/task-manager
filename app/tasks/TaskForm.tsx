"use client";

import React, { useActionState, useState } from 'react'
import { createTask, type TaskActionState } from './actions';

const TaskForm = () => {

    const initialState: TaskActionState = {
        success: false,
        message: ""
    }

    const [state, formAction, isPending] = useActionState(createTask, initialState);

    return (
        <div>
            <form action={formAction} className="task-form">
                <input
                    type='text'
                    name="title"
                    placeholder='Enter Task Title'
                />
                <button type='submit' disabled={isPending}>
                    {isPending ? "Adding..." : "Add Task"}
                </button>
            </form>

            {state.message && (
                <p className="task-message">
                    {state.message}
                </p>
            )}

        </div>
    )
}

export default TaskForm