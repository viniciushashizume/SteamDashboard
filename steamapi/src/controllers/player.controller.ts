import { Request, Response, NextFunction } from 'express';
import { getFullPlayerProfile, getGameStatsForPlayer, getPlayerGames } from '../services/player.services';
import { playerIdentifierSchema, gameStatsParamsSchema } from '../validators/player.validator';

// Controller para buscar o perfil completo do jogador
export const handleGetPlayerProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier } = playerIdentifierSchema.parse(req.params); // Nova linha
    const profileData = await getFullPlayerProfile(identifier); // Passa o identificador
    
    res.status(200).json(profileData);
  } catch (error) {
    // 4. Se ocorrer um erro (validação ou serviço), passar para o errorHandler
    next(error);
  }
};

// Controller para buscar estatísticas de um jogo
export const handleGetGameStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier } = playerIdentifierSchema.parse(req.params); // Nova linha
    const gamesData = await getPlayerGames(identifier); // Passa o identificador
    
    res.status(200).json(gamesData);
  } catch (error) {
    next(error);
  }
}

export const handleGetPlayerGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier } = playerIdentifierSchema.parse(req.params);
    const gamesData = await getPlayerGames(identifier);
    res.status(200).json(gamesData);
  } catch (error) {
    next(error);
  }
};