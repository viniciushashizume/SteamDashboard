import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPlayerProfile, getPlayerGames } from './api/steamApi';
import { SearchForm } from './components/SearchForm';
import { PlayerProfileCard } from './components/PlayerProfileCard';
import { PlaytimeChart } from './components/PlaytimeChart';
import { Spinner } from './components/Spinner';
import { AlertTriangle, BarChartHorizontal } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: profile, isLoading: isLoadingProfile, isError: isErrorProfile } = useQuery({
    queryKey: ['playerProfile', searchTerm],
    queryFn: () => getPlayerProfile(searchTerm),
    enabled: !!searchTerm,
  });
  
  const { data: gamesData, isLoading: isLoadingGames, isError: isErrorGames } = useQuery({
    queryKey: ['playerGames', searchTerm],
    queryFn: () => getPlayerGames(searchTerm),
    enabled: !!searchTerm,
  });

  const handleSearch = (id: string) => {
    setSearchTerm(id);
  };
  
  const isLoading = isLoadingProfile || isLoadingGames;
  const isError = isErrorProfile || isErrorGames;
  const showResults = !isLoading && !isError && !!profile && !!gamesData;

  return (
    // Alteração: Adicionado overflow-x-hidden para evitar scroll horizontal do efeito de fundo
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-8 font-sans overflow-x-hidden">
      {/* Alteração: Efeito de Fundo "Aurora" mais sutil */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-blue-900/40 rounded-full filter blur-3xl opacity-30 animate-pulse duration-[6000ms]"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[80vw] h-[80vh] bg-purple-900/40 rounded-full filter blur-3xl opacity-30 animate-pulse duration-[6000ms] delay-2000"></div>
      
      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Steam Dashboard
          </h1>
          <p className="text-slate-400 mt-3 text-base sm:text-lg max-w-2xl mx-auto">
            Encontre perfis da Steam e visualize estatísticas de jogos e tempo de uso.
          </p>
        </header>

        <main className="max-w-4xl mx-auto w-full">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          
          <div className="mt-8">
            {isLoading ? (
              <Spinner />
            ) : isError ? (
              // Alteração: Estilo do card de erro para combinar com o resto da UI
              <div className="w-full max-w-2xl mx-auto flex items-center justify-center gap-4 text-center text-lg bg-red-900/20 backdrop-blur-md border border-red-500/50 text-red-300 p-6 rounded-2xl shadow-lg">
                <AlertTriangle size={28} />
                <span>Erro ao buscar dados. O perfil pode ser privado ou o ID inválido.</span>
              </div>
            ) : showResults ? (
              <div className="flex flex-col items-center space-y-8 animate-fade-in">
                <PlayerProfileCard profile={profile} />
                
                {gamesData.games.length > 0 && (
                  <PlaytimeChart games={gamesData.games} />
                )}
              </div>
            ) : (
              // Alteração: Estilo do card inicial para combinar com o resto da UI
              <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 text-center text-slate-500 p-8 rounded-2xl bg-slate-800/30 backdrop-blur-md border border-slate-700/50">
                <BarChartHorizontal size={40} />
                <h3 className="text-xl font-semibold text-slate-300">Pronto para Analisar</h3>
                <p className="mt-1">
                  Digite um SteamID64 ou um nome de usuário.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Lembre-se de adicionar isso ao seu tailwind.config.js para a animação funcionar!
/*
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
    },
  },
  // ...
};
*/

export default App;