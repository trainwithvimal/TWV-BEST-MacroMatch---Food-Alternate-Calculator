
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MatchType, Macros, FoodItem } from './types';
import MacroDisplay from './components/MacroDisplay';
import MacroChart from './components/MacroChart';

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1q3TkCNMbEECaR-rh_eeBIvrd04_TjmIwc5A5fqU27_E/export?format=csv&gid=537591964";

interface SourceSelection {
  id: string; 
  foodId: string;
  quantity: number;
}

const FoodSearch: React.FC<{
  foods: FoodItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  placeholder: string;
  accentColor: string;
}> = ({ foods, selectedId, onSelect, placeholder, accentColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedFood = useMemo(() => foods.find(f => f.id === selectedId), [foods, selectedId]);

  useEffect(() => {
    if (selectedFood && !isOpen) {
      setQuery(selectedFood.name);
    }
  }, [selectedFood, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredFoods = useMemo(() => {
    if (!query || query === selectedFood?.name) return foods.slice(0, 50);
    return foods
      .filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 100);
  }, [foods, query, selectedFood]);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className={`w-full bg-white border border-slate-200 rounded-lg pl-12 pr-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-${accentColor}-500/20 focus:border-${accentColor}-500 outline-none transition-all shadow-sm`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-[350px] overflow-y-auto">
          {filteredFoods.length > 0 ? (
            filteredFoods.map(food => (
              <button
                key={food.id}
                onClick={() => {
                  onSelect(food.id);
                  setQuery(food.name);
                  setIsOpen(false);
                }}
                className="w-full text-left px-5 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
              >
                <div className="font-semibold text-slate-700">{food.name}</div>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{food.category}</span>
                   <span className="text-[10px] text-blue-500 font-bold px-2 py-0.5 bg-blue-50 rounded-full">{food.baseUnit}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="px-5 py-6 text-slate-400 text-sm italic text-center">No items found matching "{query}"</div>
          )}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [sourceSelections, setSourceSelections] = useState<SourceSelection[]>([
    { id: 'initial-1', foodId: '', quantity: 1 }
  ]);
  const [targetFoodId, setTargetFoodId] = useState<string>('');
  const [matchBy, setMatchBy] = useState<MatchType>(MatchType.PROTEIN);

  const fetchSheetData = async (isManual = false) => {
    try {
      if (isManual) setIsRefreshing(true);
      else setLoading(true);

      const response = await fetch(`${SHEET_URL}&cb=${Date.now()}`); 
      if (!response.ok) throw new Error("Failed to fetch Google Sheet data");
      const csvText = await response.text();
      
      const rows = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
      const dataRows = rows.slice(1); 
      
      const parsedFoods: FoodItem[] = dataRows
        .map((row, index) => {
          const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if (columns.length < 8) return null;

          const clean = (val: string) => val ? val.replace(/^"|"$/g, '').trim() : '';
          const parseNum = (val: string) => {
            const cleaned = clean(val).replace(/[^0-9.]/g, '');
            const num = parseFloat(cleaned);
            return isNaN(num) ? 0 : num;
          };

          const name = clean(columns[1]);
          if (!name) return null;

          return {
            id: `food-${index}`,
            category: clean(columns[0]),
            name: name,
            baseUnit: clean(columns[2]), 
            baseAmount: Math.max(0.001, parseNum(columns[3])),
            protein: parseNum(columns[4]),
            carbs: parseNum(columns[5]),
            fats: parseNum(columns[6]),
            calories: parseNum(columns[7]),
          };
        })
        .filter((item): item is FoodItem => item !== null);

      setFoods(parsedFoods);
      
      if (!isManual && parsedFoods.length > 0) {
        const egg = parsedFoods.find(f => f.name.toLowerCase().includes('whole egg'));
        const soya = parsedFoods.find(f => f.name.toLowerCase().includes('soya chunks'));
        setSourceSelections([{ id: 'initial-1', foodId: egg?.id || parsedFoods[0].id, quantity: 1 }]);
        setTargetFoodId(soya?.id || (parsedFoods[1]?.id || parsedFoods[0].id));
      }
      
      setLoading(false);
      setIsRefreshing(false);
    } catch (err) {
      console.error(err);
      setError("Sync failed.");
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSheetData();
  }, []);

  const addSourceItem = () => {
    setSourceSelections(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), foodId: foods[0].id, quantity: 1 }]);
  };

  const removeSourceItem = (id: string) => {
    if (sourceSelections.length <= 1) return;
    setSourceSelections(prev => prev.filter(item => item.id !== id));
  };

  const updateSourceItem = (id: string, updates: Partial<SourceSelection>) => {
    setSourceSelections(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const targetFood = useMemo(() => foods.find(f => f.id === targetFoodId), [foods, targetFoodId]);

  const totalSourceMacros = useMemo((): Macros => {
    return sourceSelections.reduce((acc, sel) => {
      const food = foods.find(f => f.id === sel.foodId);
      if (!food) return acc;
      return {
        calories: acc.calories + (food.calories * sel.quantity),
        protein: acc.protein + (food.protein * sel.quantity),
        carbs: acc.carbs + (food.carbs * sel.quantity),
        fats: acc.fats + (food.fats * sel.quantity),
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }, [foods, sourceSelections]);

  const calculation = useMemo(() => {
    if (!targetFood) return { requiredQuantity: 0, targetMacros: { calories: 0, protein: 0, carbs: 0, fats: 0 } };
    
    let requiredPortions = 0;
    if (matchBy === MatchType.PROTEIN) {
      if (targetFood.protein === 0) return { requiredQuantity: 0, targetMacros: { calories: 0, protein: 0, carbs: 0, fats: 0 } };
      requiredPortions = totalSourceMacros.protein / targetFood.protein;
    } else {
      if (targetFood.calories === 0) return { requiredQuantity: 0, targetMacros: { calories: 0, protein: 0, carbs: 0, fats: 0 } };
      requiredPortions = totalSourceMacros.calories / targetFood.calories;
    }

    const requiredTotalGrams = requiredPortions * targetFood.baseAmount;

    return { 
      requiredQuantity: requiredTotalGrams, 
      targetMacros: {
        calories: targetFood.calories * requiredPortions,
        protein: targetFood.protein * requiredPortions,
        carbs: targetFood.carbs * requiredPortions,
        fats: targetFood.fats * requiredPortions,
      } 
    };
  }, [totalSourceMacros, targetFood, matchBy]);

  const dynamicSummaryText = useMemo(() => {
    const parts = sourceSelections
      .map(sel => {
        const food = foods.find(f => f.id === sel.foodId);
        if (!food) return '';

        // CLEANING LOGIC FOR UNITS
        // Remove parentheses and leading numbers: "1 egg (50g)" -> "egg", "100 g" -> "g"
        const rawUnit = food.baseUnit || "";
        const unitLabel = rawUnit.split('(')[0].replace(/^\d+\s*/, '').trim();
        
        // Calculate absolute quantity
        const unitNumberMatch = rawUnit.match(/^(\d+(\.\d+)?)/);
        const unitMultiplier = unitNumberMatch ? parseFloat(unitNumberMatch[0]) : 1;
        const absoluteQuantity = sel.quantity * unitMultiplier;
        
        const formattedQty = Number.isInteger(absoluteQuantity) ? absoluteQuantity.toString() : absoluteQuantity.toFixed(1);
        
        // Smart skip: Don't repeat "egg" if it's already in the food name "Whole Egg"
        const skipUnitLabel = ['pcs', 'unit', 'piece', 'pieces'].includes(unitLabel.toLowerCase()) || 
                             food.name.toLowerCase().includes(unitLabel.toLowerCase());

        return skipUnitLabel ? `${formattedQty} ${food.name}` : `${formattedQty} ${unitLabel} ${food.name}`;
      })
      .filter(p => p !== '');

    let jointSources = '';
    if (parts.length === 0) jointSources = 'your selection';
    else if (parts.length === 1) jointSources = parts[0];
    else if (parts.length === 2) jointSources = `${parts[0]} and ${parts[1]}`;
    else {
      const last = parts.pop();
      jointSources = `${parts.join(', ')}, and ${last}`;
    }

    return (
      <>
        To replace <span className="font-extrabold text-slate-800">{jointSources}</span>, take <span className="font-extrabold text-emerald-600 underline decoration-emerald-200 underline-offset-4">{calculation.requiredQuantity.toFixed(1)}g {targetFood?.name || 'Alternative'}</span> and cook in any style you want.
      </>
    );
  }, [sourceSelections, foods, calculation.requiredQuantity, targetFood]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-600 border-r-4 border-transparent"></div>
      <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-[10px]">Syncing Master Library...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 flex justify-center items-start">
      <div className="max-w-5xl w-full flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
            Food Alternate Calculator by TWV
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-blue-200"></span>
            <p className="text-blue-600 text-xs uppercase tracking-[0.2em] font-black">Portion-Based Substitution</p>
            <span className="h-px w-8 bg-blue-200"></span>
          </div>
        </div>

        {/* 1. Source Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 pb-0">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-lg shadow-blue-200">1</div>
                <div>
                   <h2 className="text-xl font-black text-slate-800">Foods You Are Eating</h2>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Select one or more items to replace</p>
                </div>
              </div>
              <button 
                onClick={addSourceItem}
                className="group text-sm font-black text-blue-600 bg-blue-50 px-5 py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 border border-blue-100"
              >
                <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Add Another Food
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {sourceSelections.map((sel, idx) => {
                  const currentFood = foods.find(f => f.id === sel.foodId);
                  return (
                    <div key={sel.id} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 relative group transition-all hover:bg-white hover:shadow-md hover:border-blue-100">
                      {sourceSelections.length > 1 && (
                        <button 
                          onClick={() => removeSourceItem(sel.id)}
                          className="absolute -top-2 -right-2 bg-white text-rose-500 border border-rose-100 p-2 rounded-xl shadow-lg hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                      )}
                      
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <FoodSearch 
                            foods={foods} 
                            selectedId={sel.foodId} 
                            onSelect={(fid) => updateSourceItem(sel.id, { foodId: fid })} 
                            placeholder={`Search food item...`} 
                            accentColor="blue" 
                          />
                        </div>
                        <div className="flex items-center gap-3 min-w-[140px]">
                          <div className="relative flex-1">
                            <input 
                              type="number"
                              min="0"
                              step="0.01"
                              value={sel.quantity}
                              onChange={(e) => updateSourceItem(sel.id, { quantity: Number(e.target.value) })}
                              className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-2 py-3 text-slate-800 font-black focus:ring-2 focus:ring-blue-500/20 outline-none text-sm shadow-sm"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{currentFood?.baseUnit || 'Portion'}</span>
                            <span className="text-[10px] font-bold text-blue-500">{(sel.quantity * (currentFood?.baseAmount || 0)).toFixed(0)}g total</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-5 pb-8">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4">Combined Nutrient Summary</h3>
                  <MacroDisplay macros={totalSourceMacros} title="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-100">2</div>
                <div>
                   <h2 className="text-xl font-black text-slate-800">Alternative To Use</h2>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Matched results based on requirement</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-emerald-50 p-2 rounded-2xl border border-emerald-100">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-2">Match by:</span>
                <div className="flex gap-1">
                   {[MatchType.PROTEIN, MatchType.CALORIES].map(m => (
                     <button
                      key={m}
                      onClick={() => setMatchBy(m)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${matchBy === m ? 'bg-emerald-500 text-white shadow-md' : 'text-emerald-600 hover:bg-emerald-100'}`}
                     >
                       {m}
                     </button>
                   ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Swap your selection with:</label>
                  <FoodSearch foods={foods} selectedId={targetFoodId} onSelect={setTargetFoodId} placeholder="e.g. Soya Chunks..." accentColor="emerald" />
                </div>

                {/* The "Substitution Note" Card */}
                <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100 relative group transition-all hover:bg-emerald-50">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <svg className="w-20 h-20 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                  </div>
                  <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Substitution Note</h4>
                  <p className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed max-w-[95%]">
                    {dynamicSummaryText}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4">Matched Profile</h3>
                  <MacroDisplay macros={calculation.targetMacros} title="" />
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-widest text-center">Macro Correlation</h4>
                    <MacroChart sourceMacros={totalSourceMacros} targetMacros={calculation.targetMacros} sourceName="Original" targetName="Target" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refined Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center px-10 py-10 text-slate-400 border-t border-slate-200 mt-6 gap-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Master Database</span>
              <p className="text-sm font-black text-slate-700">Library: {foods.length} items</p>
            </div>
            <button 
              onClick={() => fetchSheetData(true)} 
              disabled={isRefreshing}
              className={`flex items-center gap-3 text-xs font-black bg-white hover:bg-slate-100 text-blue-600 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 transition-all active:scale-95 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              Refresh Library
            </button>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-black uppercase tracking-widest opacity-50 mb-1">Precision Nutrition</p>
            <p className="text-[10px] italic font-bold text-slate-400">Calculated directly from TWV Master Database.</p>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default App;
