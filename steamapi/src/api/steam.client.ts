import axios from 'axios';
import { STEAM_API_KEY } from '../config';
import { IPlayerSummary, IOwnedGamesResponse, IPlayerStats } from '../@types/steam/interfaceSteam';

const steamApiClient = axios.create({
  baseURL: 'https://api.steampowered.com',
});

// Função para buscar o resumo do perfil do jogador
export const getPlayerSummary = async (steamid: string): Promise<IPlayerSummary | null> => {
  const response = await steamApiClient.get('/ISteamUser/GetPlayerSummaries/v0002/', {
    params: {
      key: STEAM_API_KEY,
      steamids: steamid,
    },
  });
  return response.data.response.players[0] || null;
};

// Função para buscar os jogos que um jogador possui
export const getOwnedGames = async (steamid: string): Promise<IOwnedGamesResponse> => {
  const response = await steamApiClient.get('/IPlayerService/GetOwnedGames/v0001/', {
    params: {
      key: STEAM_API_KEY,
      steamid: steamid,
      include_appinfo: true, // Inclui nome e imagens dos jogos
      format: 'json',
    },
  });
  return response.data.response;
};

// Função para buscar as conquistas de um jogador em um jogo específico
export const getPlayerAchievements = async (steamid: string, appid: string): Promise<IPlayerStats> => {
    const response = await steamApiClient.get('/ISteamUserStats/GetPlayerAchievements/v0001/', {
        params: {
            key: STEAM_API_KEY,
            steamid: steamid,
            appid: appid,
            l: 'brazilian' // Traz nome e descrição em português, se disponível
        }
    });
    return response.data.playerstats;
}

export const resolveVanityURL = async (vanityName: string): Promise<string | null> => {
  const response = await steamApiClient.get('/ISteamUser/ResolveVanityURL/v0001/', {
    params: {
      key: STEAM_API_KEY,
      vanityurl: vanityName,
    },
  });

  if (response.data.response.success === 1) {
    return response.data.response.steamid;
  }
  
  return null;
};
