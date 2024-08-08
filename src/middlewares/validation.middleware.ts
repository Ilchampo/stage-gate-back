import type { Request, Response } from 'express';
import type { ObjectSchema } from 'joi';

import { NextFunction } from 'express';

const validationMiddleware =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

export default validationMiddleware;
