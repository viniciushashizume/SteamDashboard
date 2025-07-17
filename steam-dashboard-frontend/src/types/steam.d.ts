// src/types/steam.d.ts

// Tipo para o resumo do perfil que nosso backend retorna
export interface IPlayerSummary {
    steamid: string;
    personaname: string;
    profileurl: string;
    avatarfull: string;
  }
  
  // Tipo para os dados combinados do perfil
export interface IPlayerProfile {
    summary: IPlayerSummary;
    game_count: number;
    totalPlaytimeHours: number;
  }
  
  // Tipo para um único jogo
  export interface IOwnedGame {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
  }
  
  // Tipo para a resposta da lista de jogos
  export interface IOwnedGamesResponse {
    game_count: number;
    games: IOwnedGame[];
  }