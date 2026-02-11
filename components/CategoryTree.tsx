
import React from 'react';
import { Category } from '../types';

interface CategoryTreeProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

export const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, onSelect }) => {
  // Coordonnées ajustées pour une canopée aérée et équilibrée
  const layout = [
    { x: 32, y: 150, scale: 1.1 },
    { x: 68, y: 170, scale: 1.0 },
    { x: 50, y: 20, scale: 1.25 },
    { x: 12, y: 350, scale: 0.95 },
    { x: 88, y: 370, scale: 0.95 },
    { x: 38, y: 400, scale: 1.15 },
    { x: 62, y: 430, scale: 1.05 },
    { x: 22, y: 550, scale: 0.85 },
    { x: 78, y: 580, scale: 0.85 },
    { x: 50, y: 220, scale: 1.3 },
    { x: 5, y: 500, scale: 0.75 },
    { x: 95, y: 530, scale: 0.75 }
  ];

  return (
    <div className="relative max-w-7xl mx-auto min-h-[950px] py-10 px-4">
      {/* Ombre de base des racines */}
      <div className="roots-overlay"></div>

      {/* Tronc massif */}
      <div className="giant-trunk">
        {/* Détails écorce */}
        <div className="absolute top-1/3 left-1/3 w-6 h-16 bg-black/30 rounded-full blur-[3px] opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-20 bg-black/20 rounded-full blur-[2px] opacity-30"></div>
      </div>

      {/* Branches principales SVG ajustées pour ne pas dépasser */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[900px] pointer-events-none z-0">
        <svg viewBox="0 0 1000 900" className="w-full h-full">
           {/* Point de départ commun : le haut du tronc (environ y=450 dans ce repère) */}
           
           {/* Structure de chêne : branches noueuses qui s'arrêtent AVANT le sommet */}
           {/* Vers les clusters de gauche */}
           <path d="M 500 700 Q 480 500, 280 300" fill="none" stroke="#2a1816" strokeWidth="26" strokeLinecap="round" className="opacity-95" />
           <path d="M 280 300 Q 200 250, 150 350" fill="none" stroke="#3e2723" strokeWidth="12" strokeLinecap="round" />
           
           {/* Vers les clusters de droite */}
           <path d="M 500 700 Q 520 500, 720 320" fill="none" stroke="#2a1816" strokeWidth="26" strokeLinecap="round" className="opacity-95" />
           <path d="M 720 320 Q 800 280, 850 380" fill="none" stroke="#3e2723" strokeWidth="12" strokeLinecap="round" />
           
           {/* Branche centrale montant vers le sommet mais s'arrêtant au bouquet le plus haut */}
           <path d="M 500 600 Q 500 400, 500 120" fill="none" stroke="#3e2723" strokeWidth="18" strokeLinecap="round" />
           
           {/* Branches basses pour les bouquets latéraux inférieurs */}
           <path d="M 500 650 Q 350 650, 150 550" fill="none" stroke="#3e2723" strokeWidth="14" strokeLinecap="round" opacity="0.8" />
           <path d="M 500 650 Q 650 650, 850 580" fill="none" stroke="#3e2723" strokeWidth="14" strokeLinecap="round" opacity="0.8" />
           
           {/* Branches intermédiaires pour remplir la canopée */}
           <path d="M 400 450 Q 350 350, 320 250" fill="none" stroke="#4e342e" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
           <path d="M 600 450 Q 650 350, 680 270" fill="none" stroke="#4e342e" strokeWidth="10" strokeLinecap="round" opacity="0.7" />
        </svg>
      </div>

      {/* Les Catégories "Clusters de Feuilles" */}
      <div className="relative z-10 w-full h-[900px] animate-sway">
        {categories.map((cat, index) => {
          const pos = layout[index % layout.length];
          return (
            <div 
              key={cat.id} 
              className="absolute transition-all duration-700"
              style={{ 
                left: `${pos.x}%`, 
                top: `${pos.y}px`, 
                transform: `translateX(-50%) scale(${pos.scale})`,
                zIndex: 20 + index 
              }}
            >
              <button
                onClick={() => onSelect(cat)}
                className="group relative w-48 h-48 flex flex-col items-center justify-center text-center p-4 bg-[#064e3b] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] leaf-cluster border-4 border-[#022c22] hover:bg-[#059669] hover:border-emerald-200 transition-all cursor-pointer"
              >
                {/* Texture interne améliorée */}
                <div className="absolute inset-0 opacity-15 pointer-events-none leaf-cluster overflow-hidden">
                   <div className="w-full h-full scale-125 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')] bg-repeat"></div>
                </div>

                {/* Halo de lisibilité */}
                <div className="absolute inset-4 bg-black/10 rounded-full blur-md group-hover:bg-black/20 transition-colors"></div>

                <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-4xl mb-2 block drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{cat.icon}</span>
                  <h3 className="text-sm font-bold text-white leading-tight mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-1 uppercase tracking-tight">
                    {cat.name}
                  </h3>
                  <div className="h-0.5 w-6 bg-emerald-400/50 mx-auto rounded-full group-hover:w-12 group-hover:bg-emerald-200 transition-all"></div>
                </div>

                {/* Halo aura au survol */}
                <div className="absolute -inset-4 bg-emerald-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                
                {/* Badge nombre */}
                <div className="absolute -top-1 -right-1 bg-emerald-400 text-[#022c22] text-[9px] font-black w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#064e3b] shadow-lg group-hover:scale-110 transition-transform">
                  {cat.tasks.length}
                </div>
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Information flottante */}
      <div className="absolute bottom-10 right-10 bg-white/20 backdrop-blur-xl p-4 rounded-3xl border border-white/30 text-emerald-950 font-bold text-xs shadow-2xl flex items-center gap-3 animate-bounce">
        <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(5,150,105,0.6)]"></div>
        <span>Touchez un bouquet pour explorer</span>
      </div>
    </div>
  );
};
