import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import bcrypt from 'bcryptjs'
import db from '../database/connection';
import config from "../../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }


    try {
      const user = await db.select('id', 'username', 'email', 'password_hash').from('users').where({ email }).first();
      const compare = await bcrypt.compare(password, user.password_hash);
      console.log(user.password_hash)
      //Check if encrypted password match
      if (!compare) {
        res.status(401).send();
        return;
      }

      //Sing JWT, valid for 1 hour
      const token = jwt.sign( 
        { userId: user.id, username: user.username },
        config.jwtSecret,
        { expiresIn: "1h" }
      );

      //Send the jwt in the response
      res.send({
        token: token,
        user: {
          id: user.id,
          name: user.username,
          email: user.email,
        }
      });

    } catch (error) {
      res.status(401).send();
    }

  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    try {

      const user = await db.select('id', 'username', 'email', 'password_hash').from('users').where({ id }).first();
      const compare = bcrypt.compareSync(oldPassword, user.password_hash)
      //Check if old password matchs
      if (!compare) {
        res.status(401).send();
        return;
      }

      //Validate de model (password lenght)
      user.password = newPassword;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
      //Hash the new password and save
      const newPassordHash = bcrypt.hashSync(newPassword, 8);
      await db('users').where('id', '=', id).update({
        password_hash: newPassordHash,

      });

      res.status(204).send();

    } catch (id) {
      res.status(401).send();
    }


  };
}
export default AuthController;
