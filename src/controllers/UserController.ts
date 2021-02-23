import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';

class UserController {
  async index(request: Request, response: Response) {
    try {
      const users = await db.select('id', 'username', 'email', 'role', 'active').from('users');
      return response.status(201).json(users);
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while selected Users'
      })
    }
  }

  async create(request: Request, response: Response) {
    const { username, email, password, role } = request.body;
    const hash = await bcrypt.hash(password, 10);

    if (!username || username === "")
      return response.status(400).json({
        error: 'Insira um nome'
      })
    if (!email || email === "")
      return response.status(400).json({
        error: 'Insira um email'
      })
    if (!password || password === "")
      return response.status(400).json({
        error: 'Insira uma senha'
      })
    if (!role || role === "")
      return response.status(400).json({
        error: 'Insira um role'
      })

    try {

      await db('users').insert({
        username,
        email,
        password_hash: hash,
        role
      });

      return response.status(201).send();

    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while creating new User'
      })
    }

  }

  async show(request: Request, response: Response) {
    const id = request.params.id;
    if (!id)
      return response.status(400).json({
        error: 'Insira um Id'
      });

    try {
      const user = await db.select('id', 'username', 'email', 'role').from('users').where({ id });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({
        error: 'Unexpected error while selected Users'
      })
    }

  }

  async update(request: Request, response: Response) {
    const { email, password, newPassoword } = request.body;
    const id = request.params.id;
    if (!id || id === "")
      return response.status(400).json({
        error: 'Insira um Id'
      });

    try {
      const user = await db.select('password_hash', 'email', 'role').from('users').where({ id }).first();
      if (!user)
        return response.status(400).json({
          error: 'Invalid user'
        });

      const { password_hash } = user;
      if (!await bcrypt.compare(password, password_hash)) {
        return response.status(400).json({
          error: 'Invalid password'
        });
      }

      if (user.email !== email) {
        return response.status(400).json({
          error: 'Invalid email'
        });
      }
      const hash = await bcrypt.hash(newPassoword, 10);

      await db('users').where('id', '=', id).update({
        password_hash: hash,

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
      await db('users').where('id', '=', id).update({
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

export default new UserController();
