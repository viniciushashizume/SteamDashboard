// DENTRO DE: src/routers/index.ts

import { Router } from 'express';
import playerRouter from './player.routes'; // Importa as rotas de jogador

const mainRouter = Router();

// Diz ao roteador principal que qualquer rota que comece com /player
// deve ser gerenciada pelo playerRouter.
// Ex: /api/player/:steamid
mainRouter.use('/player', playerRouter);

export default mainRouter;