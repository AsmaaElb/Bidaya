from typing import TypedDict, Optional

class BusinessState(TypedDict):
    """
    Définit l'état global du workflow LangGraph pour le projet Bidaya AI.
    Stocke les entrées utilisateur et les réponses générées par chaque Agent.
    """
    
    # --- Entrées utilisateur ---
    idea: str                    # L'idée de projet soumise par l'entrepreneur
    city: str                    # La ville ou région d'implantation au Maroc
    
    # --- Résultats générés par chaque Agent ---
    analysis: Optional[str]      # Agent 1 - Analyse stratégique de la viabilité
    market: Optional[str]        # Agent 2 - Étude de marché locale
    business_plan: Optional[str] # Agent 3 - Structure détaillée du Business Plan
    funding: Optional[str]       # Agent 4 - Sources de financement (Intelaka, Forsa, etc.)