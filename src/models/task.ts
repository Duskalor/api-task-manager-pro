import type { Task } from '@prisma/client';
import { prisma } from 'db';

/**
 * Retrieves all tasks from the database.
 * @returns {Promise<Task[]>} A promise that resolves to an array of tasks.
 */
export const getTasks = async ({ id }: { id: string }): Promise<Task[]> => {
  const tasks = await prisma.task.findMany({ where: { userId: id } });
  return tasks;
};

/**
 * Adds a new task to the database.
 * @param {Task} task - The task data to create.
 * @returns {Promise<Task>} A promise that resolves to the newly created task.
 */
export const addTask = async (task: Task): Promise<Task> => {
  const newTask = await prisma.task.create({
    data: {
      name: task.name,
      description: task.description,
      userId: task.userId,
    },
  });
  return newTask;
};

/**
 * Updates an existing task in the database.
 * @param {Partial<Task>} task - The task data to update, must include the task id.
 * @returns {Promise<Task>} A promise that resolves to the updated task.
 */
export const updateTask = async (task: Partial<Task>): Promise<Task> => {
  const updatedTask = await prisma.task.update({
    where: {
      id: task.id,
    },
    data: task,
  });
  return updatedTask;
};

/**
 * Deletes a task by its ID.
 * @param {string} taskId - The ID of the task to delete.
 * @returns {Promise<Task>} A promise that resolves to the deleted task.
 */
export const deleteTask = async (taskId: string): Promise<Task> => {
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  return deletedTask;
};

/**
 * Retrieves a single task by its ID.
 * @param {string} taskId - The ID of the task to retrieve.
 * @returns {Promise<Task|null>} A promise that resolves to the task, or null if not found.
 */
export const getTaskById = async (taskId: string): Promise<Task | null> => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });
  return task;
};
