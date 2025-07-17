import { getPlayerSummary, getOwnedGames, getPlayerAchievements, resolveVanityURL } from '../api/steam.client';
import { AppError } from '../utils/AppError';
import { IOwnedGame, IPlayerSummary, IPlayerStats, IOwnedGamesResponse } from '../@types/steam/interfaceSteam';

const resolveUserInput = async (userInput: string): Promise<string> => {
  if (/^\d{17}$/.test(userInput)) {
    return userInput;
  }

  // Esta chamada agora deve funcionar
  const resolvedId = await resolveVanityURL(userInput);

  if (resolvedId) {
    return resolvedId;
  }

  throw new AppError('Usuário ou SteamID não encontrado', 404);
};


// Serviço para combinar informações do perfil do jogador e seus jogos
export const getFullPlayerProfile = async (userInput: string) => {
  // A primeira coisa que fazemos é resolver a entrada do usuário!
  const steamid = await resolveUserInput(userInput);

  // O resto da função continua exatamente o mesmo, usando o 'steamid' resolvido
  const [summary, ownedGamesResponse] = await Promise.all([
    getPlayerSummary(steamid),
    getOwnedGames(steamid),
  ]);

  if (!summary) {
    throw new AppError('Jogador não encontrado', 404);
  }
  
  // Calcula o total de horas jogadas
  const totalPlaytimeHours = ownedGamesResponse.games.reduce((acc, game) => acc + game.playtime_forever, 0) / 60;
  
  // Ordena os jogos por tempo de jogo
  const sortedGames = ownedGamesResponse.games.sort((a, b) => b.playtime_forever - a.playtime_forever);

  // Retorna um objeto combinado e formatado
  return {
    summary,
    game_count: ownedGamesResponse.game_count,
    totalPlaytimeHours: Math.round(totalPlaytimeHours),
    mostPlayedGames: sortedGames.slice(0, 5), // Retorna o top 5
  };
};

// Serviço para obter as estatísticas de um jogo
export const getGameStatsForPlayer = async (steamid: string, appid: string): Promise<IPlayerStats> => {
    const stats = await getPlayerAchievements(steamid, appid);

    if(!stats || !stats.achievements) {
        throw new AppError('Estatísticas ou conquistas não encontradas para este jogo ou jogador. O perfil pode ser privado.', 404);
    }
    
    // Calcula a porcentagem de conquistas obtidas
    const totalAchievements = stats.achievements.length;
    const unlockedAchievements = stats.achievements.filter(ach => ach.achieved === 1).length;
    const achievementPercentage = totalAchievements > 0 ? (unlockedAchievements / totalAchievements) * 100 : 0;

    return {
        ...stats,
        unlockedAchievements,
        totalAchievements,
        achievementPercentage: parseFloat(achievementPercentage.toFixed(1))
    };
}

export const getPlayerGames = async (userInput: string): Promise<IOwnedGamesResponse> => {
  // Resolve a entrada do usuário primeiro
  const steamid = await resolveUserInput(userInput);

  // O resto da função continua exatamente o mesmo
  const ownedGames = await getOwnedGames(steamid);

  if (!ownedGames || ownedGames.game_count === 0) {
    return { game_count: 0, games: [] };
  }

  // Ordena os jogos do mais jogado para o menos jogado
  const sortedGames = ownedGames.games.sort(
    (a, b) => b.playtime_forever - a.playtime_forever
  );

  return {
    game_count: ownedGames.game_count,
    games: sortedGames,
  };
};