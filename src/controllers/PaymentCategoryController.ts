import { Request, Response } from 'express';
import db from '../database/connection';


class PaymentCategoryController {
  async index(request: Request, response: Response) {
    try {
      const payment_category = await db.select('id', 'description', 'active').from('payment_category').where({active: true});
      return response.status(201).json(payment_category);
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while selected description'
      })
    }
  }

  async create(request: Request, response: Response) {
    const { description } = request.body;


    if (!description || description === "")
      return response.status(400).json({
        error: 'Insira um nome'
      })

    try {

      await db('payment_category').insert({
        description
      });

      return response.status(201).send();

    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while creating new description'
      })
    }

  }

  async show(request: Request, response: Response) {
    const id = request.params.id;
    if (!id || id === "")
      return response.status(400).json({
        error: 'Insira um Id'
      });

    try {
      const user = await db.select('id', 'description').from('payment_category').where({ id, active: true });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while selected Users'
      })
    }

  }

  async update(request: Request, response: Response) {
    const { description } = request.body;
    const id = request.params.id;
    if (!id || id === "")
      return response.status(400).json({
        error: 'Insira um Id'
      });

    try {
      const category = await db.select('description').from('payment_category').where({ id }).first();
      if (!category)
        return response.status(400).json({
          error: 'Invalid category'
        });

      await db('payment_category').where('id', '=', id).update({
        description,

      });

      return response.status(201).json("OK");
    } catch (error) {
      console.log(error)
      return response.status(400).json({
        error: 'Unexpected error while update User'
      })
    }

  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    if (!id || id === "")
      return response.status(400).json({
        error: 'Insira um Id'
      });

    try {
      await db('payment_category').where('id', '=', id).update({
        active: false,
      });
      return response.status(201).json("OK");
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while delete User'
      })
    }
  }
}

export default new PaymentCategoryController();
