import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (steamId: string) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-slate-500" size={20} />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite o SteamID64 ou nome de usuário..."
          // Alteração: Estilo de foco mais pronunciado e suave
          className="w-full pl-12 pr-32 py-3 border border-slate-700 bg-slate-800/60 placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          // Alteração: Melhor feedback visual para os estados do botão
          className="absolute inset-y-0 right-0 px-5 py-2 m-1.5 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-colors disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  );
};