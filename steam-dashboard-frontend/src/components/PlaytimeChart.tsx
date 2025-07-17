import React from 'react';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { IOwnedGame } from '../types/steam.d.ts';

interface PlaytimeChartProps {
  games: IOwnedGame[];
}

export const PlaytimeChart: React.FC<PlaytimeChartProps> = ({ games }) => {
  const chartData = games.slice(0, 10).map(game => ({
    name: game.name,
    Horas: parseFloat((game.playtime_forever / 60).toFixed(1)),
  }));

  return (
    // Alteração aqui: Adicionadas classes de transição e hover
    <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-700 transition-all duration-300 hover:border-slate-600 hover:scale-[1.02]">
      <div className="flex items-center gap-3 mb-4">
        <BarChart3 className="text-blue-400" />
        <h3 className="text-xl font-bold text-white">Top 10 Jogos por Tempo</h3>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis dataKey="name" type="category" width={150} stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }}/>
          <Tooltip
            cursor={{fill: 'rgba(30,41,59,0.5)'}}
            contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem'}}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Legend wrapperStyle={{color: '#94a3b8'}}/>
          <Bar dataKey="Horas" fill="#3b82f6" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};