import express, { Request, Response, NextFunction} from 'express';
import 'dotenv/config';
import cors from 'cors';
import mainRouter from './routers';
import {AppError} from './utils/AppError'
import {errorHandler} from './utils/errorHandler';
import {PORT} from './config';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', mainRouter);

app.get('/', (req, res) => {
  res.send('Steam ativa!');
});

app.use((req: Request, res: Response, next: NextFunction)=>{
  next(new AppError('Rota não encontrada', 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});