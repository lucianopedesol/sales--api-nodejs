import { Request, Response, NextFunction } from "express";

import db from '../database/connection';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;


    try {
      const user = await db.select('id', 'username', 'email', 'role').from('users').where({ id }).first();

      //Check if array of authorized roles includes the user's role
      if (roles.indexOf(user.role) > -1) next();
      else res.status(401).send();
    } catch (id) {
      res.status(401).send();
    }


  };
};
