// src/api/steamApi.ts
import axios from 'axios';
import type { IPlayerProfile, IOwnedGamesResponse } from '../types/steam.d.ts';

const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api', // A URL base do seu back-end
});

export const getPlayerProfile = async (identifier: string): Promise<IPlayerProfile> => {
  const { data } = await apiClient.get(`/player/${identifier}`);
  return data;
};

export const getPlayerGames = async (identifier: string): Promise<IOwnedGamesResponse> => {
  const { data } = await apiClient.get(`/player/${identifier}/games`);
  return data;
};