import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateSessionStore = (validations = []) => {
    validations = [
        body('email').isEmail(),
        body('password').isLength({ min: 8 })
    ];

    return async (req: Request, res: Response, next: NextFunction) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  };

const getValidations = () => {
    return  [
        body('email').isEmail(),
        body('password').isLength({ min: 8 })
      ];
}

export { validateSessionStore };