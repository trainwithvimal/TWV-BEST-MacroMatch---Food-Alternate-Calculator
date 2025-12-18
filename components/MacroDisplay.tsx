
import React from 'react';
import { Macros } from '../types';

interface MacroDisplayProps {
  macros: Macros;
  title?: string;
}

const MacroDisplay: React.FC<MacroDisplayProps> = ({ macros, title }) => {
  return (
    <div className="space-y-3">
      {title && <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</div>}
      <div className="grid grid-cols-2 gap-3">
        {/* Calories - Grey/White */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calories</span>
            <span className="text-xl font-black text-slate-700">{Math.round(macros.calories)}</span>
          </div>
          <span className="text-[10px] font-bold text-slate-300 self-end mb-1 uppercase">kcal</span>
        </div>
        
        {/* Protein - Blue */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Protein</span>
            <span className="text-xl font-black text-blue-700">{macros.protein.toFixed(1)}</span>
          </div>
          <span className="text-[10px] font-bold text-blue-300 self-end mb-1 uppercase">g</span>
        </div>

        {/* Carbs - Yellow */}
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-yellow-600/60 uppercase tracking-wider">Carbs</span>
            <span className="text-xl font-black text-yellow-700">{macros.carbs.toFixed(1)}</span>
          </div>
          <span className="text-[10px] font-bold text-yellow-500/40 self-end mb-1 uppercase">g</span>
        </div>

        {/* Fats - Red/Pink */}
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Fats</span>
            <span className="text-xl font-black text-rose-700">{macros.fats.toFixed(1)}</span>
          </div>
          <span className="text-[10px] font-bold text-rose-300 self-end mb-1 uppercase">g</span>
        </div>
      </div>
    </div>
  );
};

export default MacroDisplay;
