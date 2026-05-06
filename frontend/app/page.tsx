"use client";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import { Send, Loader2, FileText, Download, Building2, Globe, Wallet } from "lucide-react";

/**
 * Composant principal de l'application Bidaya AI.
 * Gère l'interface utilisateur, la communication avec le Backend FastAPI et l'affichage du rapport.
 */
export default function Home() {
  // États pour la gestion du chargement, du formulaire et des résultats
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ idea: "", city: "" });
  const [result, setResult] = useState<any>(null);

  /**
   * Envoie les données du projet au Backend pour analyse par les agents IA.
   */
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Appel de l'API locale sur le port 8000 (FastAPI)
      const response = await axios.post("http://127.0.0.1:8000/analyze", formData);
      setResult(response.data);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Impossible de se connecter au Backend. Vérifiez qu'il est lancé sur le port 8000.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Utilise la fonction d'impression native du navigateur pour générer un PDF.
   * Les styles @media print dans le fichier gèrent la mise en page spécifique.
   */
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#fcfcfd] p-6 md:p-12 text-slate-800">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête de l'application - Masqué lors de l'impression */}
        <header className="text-center mb-10 no-print">
          <div className="inline-block p-2 bg-indigo-50 rounded-2xl mb-4">
            <Building2 className="text-indigo-600" size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900">Bidaya AI</h1>
          <p className="text-slate-500 mt-2">Générez votre Business Plan intelligent pour le marché Marocain</p>
        </header>

        {/* Section Formulaire - S'affiche uniquement si aucun résultat n'est généré */}
        {!result && (
          <div className="bg-white p-8 rounded-4xl shadow-xl shadow-indigo-100/50 border border-slate-100 no-print transition-all"> 
            <form onSubmit={handleAnalyze} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 text-left">Quelle est votre idée ?</label>
                <textarea
                  rows={3}
                  placeholder="Ex: Une coopérative de safran bio à Taliouine..."
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition text-left"
                  onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 text-left">Ville / Région</label>
                <input
                  type="text"
                  placeholder="Ex: Agadir"
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition text-left"
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
              <button
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                Générer mon Business Plan
              </button>
            </form>
          </div>
        )}

        {/* Section Rapport - S'affiche après la génération et optimisée pour l'impression */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-between items-center mb-8 no-print">
              <button onClick={() => setResult(null)} className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition">
                ← Recommencer
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition"
              >
                <Download size={18} /> Télécharger PDF
              </button>
            </div>

            <article id="report" className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-50 relative overflow-hidden text-left">
              {/* Élément de décoration visuelle */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-50 rounded-br-full -ml-16 -mt-16 z-0" />
              
              <div className="relative z-10">
                <div className="border-b-2 border-indigo-100 pb-8 mb-10 text-left">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Business Plan Officiel</h2>
                  <p className="text-indigo-600 font-medium tracking-wide uppercase text-sm">Projet: {formData.idea} | Lieu: {formData.city}</p>
                </div>

                {/* Affichage segmenté des résultats de chaque Agent IA */}
                <div className="space-y-12">
                  <Section title="Analyse Stratégique" icon={<Building2 size={22}/>} content={result.analysis} />
                  <Section title="Étude de Marché" icon={<Globe size={22}/>} content={result.market} />
                  <Section title="Plan d'Exécution" icon={<FileText size={22}/>} content={result.business_plan} />
                  <Section title="Financement au Maroc" icon={<Wallet size={22}/>} content={result.funding} />
                </div>
              </div>
            </article>
          </div>
        )}
      </div>

      {/* Styles globaux pour la gestion propre de l'impression PDF */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          main { padding: 0 !important; }
          #report { 
            box-shadow: none !important; 
            border: none !important; 
            padding: 0 !important;
            margin: 0 !important;
          }
          .rounded-[2.5rem] { border-radius: 0 !important; }
        }
      `}</style>
    </main>
  );
}

/**
 * Sous-composant pour afficher une section du rapport.
 * Utilise ReactMarkdown pour formater le contenu généré par l'IA.
 */
function Section({ title, icon, content }: any) {
  return (
    <div className="text-left">
      <div className="flex items-center justify-start gap-3 mb-4 text-slate-900">
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="pl-10 text-slate-600 leading-relaxed border-l-2 border-indigo-50 ml-5">
        <ReactMarkdown
          components={{
            // Style personnalisé pour les éléments Markdown (gras, listes, paragraphes)
            strong: ({node, ...props}) => <span className="font-bold text-indigo-700" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-outside space-y-2 my-3 text-slate-600" {...props} />,
            li: ({node, ...props}) => <li className="marker:text-indigo-400" {...props} />,
            p: ({node, ...props}) => <p className="mb-4" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  ); 
}