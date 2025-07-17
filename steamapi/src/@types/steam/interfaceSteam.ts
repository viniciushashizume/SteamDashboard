// Tipagem para o resumo do perfil do jogador
export interface IPlayerSummary {
    steamid: string;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarfull: string;
    realname?: string;
    loccountrycode?: string;
    timecreated: number;
  }
  
  // Tipagem para um jogo que o jogador possui
  export interface IOwnedGame {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    img_logo_url: string;
  }
  
  // Tipagem para a resposta da API de jogos possuídos
  export interface IOwnedGamesResponse {
    game_count: number;
    games: IOwnedGame[];
  }
  
export interface IPlayerAchievement {
      apiname: string;
      achieved: number; // 1 para sim, 0 para não
      unlocktime: number;
      name: string;
      description: string;
  }
  
  // Tipagem para as estatísticas de um jogador em um jogo
  export interface IPlayerStats {
      gameName: string;
      steamID: string;
      achievements: IPlayerAchievement[];
      unlockedAchievements: number;
      totalAchievements: number;
      achievementPercentage: number;
  }