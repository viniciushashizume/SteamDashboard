// DENTRO DE: src/routers/player.routes.ts

import { Router } from 'express';
// Garanta que os controladores corretos estão sendo importados
import { 
  handleGetPlayerProfile, 
  handleGetPlayerGames 
} from '../controllers/player.controller';

const playerRouter = Router();

playerRouter.get('/:identifier', handleGetPlayerProfile);
playerRouter.get('/:identifier/games', handleGetPlayerGames);

export default playerRouter;