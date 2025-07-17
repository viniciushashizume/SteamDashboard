import { z } from 'zod';

// Validador para rotas que agora usam um 'identificador' genérico
export const playerIdentifierSchema = z.object({
  identifier: z.string().min(1, "O identificador não pode ser vazio"),
});

// Você pode criar um novo validador para stats ou ajustar o existente
export const gameStatsParamsSchema = z.object({
  identifier: z.string().min(1),
  appid: z.string().regex(/^\d+$/, "O AppID deve conter apenas números"),
});