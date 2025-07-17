import React from 'react';
import type { IPlayerProfile } from '../types/steam.d.ts';
import { Library, Clock } from 'lucide-react';

export const PlayerProfileCard: React.FC<{ profile: IPlayerProfile }> = ({ profile }) => {
  return (
    // Alteração aqui: Adicionadas classes de transição e hover
    <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-lg border border-slate-700 transition-all duration-300 hover:border-slate-600 hover:scale-[1.02]">
      <img
        src={profile.summary.avatarfull}
        alt={profile.summary.personaname}
        className="w-28 h-28 rounded-full border-4 border-slate-600 flex-shrink-0 shadow-md"
      />
      <div className="w-full text-center sm:text-left">
        <a
          href={profile.summary.profileurl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl font-bold text-white hover:text-blue-400 transition-colors"
        >
          {profile.summary.personaname}
        </a>

        {/* Seção de estatísticas redesenhada com ícones */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 justify-center sm:justify-start border-t border-slate-700 pt-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Library size={18} className="text-slate-400" />
            <span className="font-bold text-white">{profile.game_count}</span>
            <span>jogos</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock size={18} className="text-slate-400" />
            <span className="font-bold text-white">~{profile.totalPlaytimeHours}h</span>
            <span>jogadas</span>
          </div>
        </div>
      </div>
    </div>
  );
};