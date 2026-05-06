from langgraph.graph import StateGraph, END
from .state import BusinessState
from .nodes import analyze_idea, study_market, build_plan, find_funding

def create_workflow():
    """
    Initialise et configure l'orchestration des agents IA via LangGraph.
    Définit le cycle de vie de la génération du Business Plan.
    """
    # Initialisation du graphe d'état avec la structure BusinessState
    workflow = StateGraph(BusinessState)

    # Ajout des nœuds (Nodes) - Chaque nœud représente une étape de l'IA
    workflow.add_node("analyze_idea", analyze_idea)
    workflow.add_node("study_market", study_market)
    workflow.add_node("build_plan", build_plan)
    workflow.add_node("find_funding", find_funding)

    # Définition de la logique de transition (Edges)
    workflow.set_entry_point("analyze_idea")  # Point d'entrée du workflow
    
    # Enchaînement séquentiel des agents
    workflow.add_edge("analyze_idea", "study_market")
    workflow.add_edge("study_market", "build_plan")
    workflow.add_edge("build_plan", "find_funding")
    
    # Point de sortie final
    workflow.add_edge("find_funding", END)

    # Compilation du workflow pour le rendre exécutable
    return workflow.compile()