import type { Request, Response } from 'express';
import { getTaskById } from 'models/task';

export const taskController = {
  async getTasks(req: Request, res: Response) {
    res.send('Hello World!');
  },

  async createTask(req: Request, res: Response) {
    res.send('Hello World!');
  },

  async updateTask(req: Request, res: Response) {
    res.send('Hello World!');
  },
  async deleteTask(req: Request, res: Response) {
    res.send('Hello World!');
  },
  async getTaskById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Id is required' });
    }
    try {
      const task = await getTaskById(id);
      res.status(200).json({
        data: task,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
