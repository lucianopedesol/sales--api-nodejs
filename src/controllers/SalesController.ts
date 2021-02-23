import { Request, Response } from 'express';
import db from '../database/connection';

interface Sales{
  id: number,
  value:number,
  payment_category_id: number,
  user_id: number,
  active: boolean,
}

class SalesController {
  async index(request: Request, response: Response) {
    try {
      const sales = await db.select('id', 'value', 'payment_category_id', 'user_id', 'active').from('sales').where({ active: true });


      return response.status(201).json(sales);
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while selected Sales'
      })
    }
  }

  async create(request: Request, response: Response) {
    const { value, payment_category_id, user_id } = request.body;


    if (!value || value === "")
      return response.status(400).json({
        error: 'Insira um valor'
      });

    if (!payment_category_id || payment_category_id === "")
      return response.status(400).json({
        error: 'Insira uma categoria de pagamento'
      });

    try {

      await db('sales').insert({
        value, payment_category_id, user_id
      });

      return response.status(201).send();

    } catch (error) {
      console.log(error)
      return response.status(400).json({
        error: 'Unexpected error while creating new Sales'
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
      const sale = await db.select('id', 'value', 'payment_category_id', 'user_id', 'active').from('sales').where({ id }).first();
      const paymentCategory = await db.select('id', 'description').from('payment_category').where({id: sale.payment_category_id}).first();
      const user = await db.select('id', 'username').from('users').where({ id: sale.user_id }).first();
      const salesDto ={
        id: sale.id,
        value: sale.value,
        paymentCategory,
        user,
        active: sale.active
      }

      return response.status(201).json(salesDto);
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while selected Sales'
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
      await db('sales').where('id', '=', id).update({
        active: false,
      });
      return response.status(201).json("OK");
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while delete Sales'
      })
    }
  }
}

export default new SalesController();
