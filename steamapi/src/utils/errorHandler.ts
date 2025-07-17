// DENTRO DE: src/utils/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError'; // <-- Importa do arquivo correto!
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Dados de entrada inválidos.',
      issues: err.flatten().fieldErrors,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor.',
  });
};