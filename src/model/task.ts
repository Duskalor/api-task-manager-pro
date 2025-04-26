import type { Task } from '@prisma/client';
import { prisma } from 'db';

export const addTask = async (task: Task) => {
  const newTask = await prisma.task.create({
    data: {
      name: task.name,
      description: task.description ?? '',
      userId: task.userId,
    },
  });
  return newTask;
};

export const updateTask = async (task: Partial<Task>) => {
  const updatedTask = await prisma.task.update({
    where: {
      id: task.id,
    },
    data: task,
  });
  return updatedTask;
};

export const deleteTask = async (taskId: string) => {
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  return deletedTask;
};

export const getTaskById = async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });
  return task;
};
