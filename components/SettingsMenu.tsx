
import React, { useState } from 'react';
import { Review } from '../types';

interface SettingsMenuProps {
  reviews: Review[];
  onImportReviews: (reviews: Review[]) => void;
  apiKey: string;
  onUpdateApiKey: (key: string) => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ reviews, onImportReviews, apiKey, onUpdateApiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'data' | 'share'>('config');

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reviews));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "mes_avis_ia_arbre.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        onImportReviews(imported);
        alert("✅ Vos avis ont été importés avec succès !");
      } catch (err) {
        alert("❌ Erreur lors de l'importation du fichier.");
      }
    };
    reader.readAsText(file);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Lien copié dans le presse-papier !");
  };

  return (
    <div className="fixed top-6 right-6 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white/90 backdrop-blur-2xl border-2 border-emerald-100 rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:bg-white hover:border-emerald-400 transition-all group active:scale-90"
      >
        <svg className={`w-7 h-7 text-emerald-800 transition-transform duration-500 ${isOpen ? 'rotate-90' : 'group-hover:rotate-45'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-20 right-0 w-[22rem] bg-white/98 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] border border-emerald-50 p-8 animate-in zoom-in-95 slide-in-from-top-4 duration-300 origin-top-right">
          
          {/* Navigation */}
          <div className="flex bg-emerald-50 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => setActiveTab('config')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'config' ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-400'}`}
            >
              Oracle
            </button>
            <button 
              onClick={() => setActiveTab('data')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'data' ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-400'}`}
            >
              Données
            </button>
            <button 
              onClick={() => setActiveTab('share')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'share' ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-400'}`}
            >
              Partage
            </button>
          </div>
          
          <div className="min-h-[250px] flex flex-col">
            {activeTab === 'config' && (
              <div className="animate-in fade-in duration-300">
                <h4 className="text-emerald-950 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Activation de l'Oracle
                </h4>
                <div className="space-y-4">
                  <p className="text-[11px] text-emerald-800/60 leading-relaxed italic">
                    L'Oracle a besoin de votre clé Gemini pour répondre à vos questions personnalisées.
                  </p>
                  <input 
                    type="password"
                    value={apiKey}
                    onChange={(e) => onUpdateApiKey(e.target.value)}
                    placeholder="Coller la clé API..."
                    className="w-full px-5 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-emerald-400/10 focus:bg-white transition-all font-mono"
                  />
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-[10px] text-center font-bold text-emerald-500 hover:text-emerald-700 underline"
                  >
                    Obtenir une clé gratuite (AI Studio)
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="animate-in fade-in duration-300">
                <h4 className="text-emerald-950 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Ma Collection Locale
                </h4>
                <div className="space-y-4">
                  <p className="text-[11px] text-emerald-800/60 leading-relaxed italic mb-4">
                    Vos avis sont stockés sur cet appareil. Exportez-les pour ne jamais les perdre.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={exportData}
                      className="flex flex-col items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-[1.5rem] hover:bg-emerald-100 transition-all group"
                    >
                      <svg className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-[10px] font-black text-emerald-800 uppercase">Exporter</span>
                    </button>
                    <label className="flex flex-col items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-[1.5rem] hover:bg-emerald-100 transition-all cursor-pointer group">
                      <input type="file" className="hidden" accept=".json" onChange={importData} />
                      <svg className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span className="text-[10px] font-black text-emerald-800 uppercase">Importer</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'share' && (
              <div className="animate-in fade-in duration-300">
                <h4 className="text-emerald-950 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Offrir cet Arbre
                </h4>
                <div className="space-y-5">
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[11px] text-blue-900 leading-relaxed">
                      <strong>Pour un ami :</strong> La méthode la plus simple est d'héberger ce dossier sur 
                      <span className="font-bold"> Vercel</span> ou <span className="font-bold">Netlify</span>. 
                      C'est gratuit et cela génère un lien magique.
                    </p>
                  </div>
                  
                  <button 
                    onClick={copyLink}
                    className="w-full py-4 bg-emerald-950 text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all font-black text-[10px] uppercase tracking-[0.2em]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copier le lien actuel
                  </button>

                  <p className="text-[9px] text-emerald-400 italic text-center leading-tight">
                    Note : Envoyer le fichier .zip ne fonctionnera pas par simple double-clic (sécurité navigateur). 
                    Utilisez un hébergement web gratuit !
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-emerald-50 text-center">
             <span className="text-[9px] font-black text-emerald-200 uppercase tracking-widest">Version 2.0 - 2026</span>
          </div>
        </div>
      )}
    </div>
  );
};
