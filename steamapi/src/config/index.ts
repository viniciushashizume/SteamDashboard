import 'dotenv/config';

export const PORT = process.env.PORT || 3333;

export const STEAM_API_KEY = process.env.STEAM_API_KEY;

if (!STEAM_API_KEY) {
  console.error("ERRO: A variável de ambiente STEAM_API_KEY não foi definida.");
  process.exit(1);
}