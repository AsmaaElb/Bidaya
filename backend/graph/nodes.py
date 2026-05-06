import os
import requests
from .state import BusinessState
from dotenv import load_dotenv

# Chargement des variables d'environnement
load_dotenv()

# Récupération de la clé API Groq depuis le fichier .env
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
URL = "https://api.groq.com/openai/v1/chat/completions"

def call_llm(prompt: str) -> str:
    """
    Fonction utilitaire pour communiquer avec l'API Groq (Modèle Llama 3.1).
    Gère l'authentification, la configuration du modèle et la gestion des erreurs.
    """
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        # Modèle Llama 3.1 8b : performant et stable pour les tâches d'analyse
        "model": "llama-3.1-8b-instant", 
        "messages": [
            {
                "role": "system", 
                "content": "Vous êtes un consultant business professionnel spécialisé dans le marché marocain."
            },
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }
    
    try:
        response = requests.post(URL, headers=headers, json=payload)
        response.raise_for_status() # Lève une exception si le statut HTTP n'est pas 200
        return response.json()['choices'][0]['message']['content']
    except Exception as e:
        # Affichage de l'erreur dans le terminal pour faciliter le débogage
        print(f"Erreur API Groq : {e}")
        raise Exception(f"Impossible d'obtenir une réponse de Groq : {str(e)}")

def analyze_idea(state: BusinessState):
    """Analyse la viabilité de l'idée de projet et génère un résumé stratégique."""
    print("--- ANALYSE DE L'IDÉE VIA GROQ ---")
    prompt = f"Analysez cette idée de business et donnez un résumé stratégique : {state['idea']}"
    result = call_llm(prompt)
    return {"analysis": result}

def study_market(state: BusinessState):
    """Réalise une étude de marché locale basée sur la ville et l'idée du projet."""
    print("--- ÉTUDE DE MARCHÉ VIA GROQ ---")
    prompt = f"Fournissez une brève étude de marché pour l'idée : {state['idea']} dans la ville de : {state['city']}"
    result = call_llm(prompt)
    # La clé 'market' doit correspondre à la définition dans state.py
    return {"market": result}

def build_plan(state: BusinessState):
    """Construit la structure du business plan en utilisant l'analyse stratégique préalable."""
    print("--- CONSTRUCTION DU PLAN VIA GROQ ---")
    # Utilisation du contexte stocké dans le 'State' pour assurer la cohérence
    prompt = f"Créez un business plan structuré basé sur cette analyse : {state.get('analysis', '')}"
    result = call_llm(prompt)
    return {"business_plan": result}

def find_funding(state: BusinessState):
    """Identifie les sources de financement marocaines pertinentes (Intelaka, Forsa, etc.)."""
    print("--- RECHERCHE DE FINANCEMENT VIA GROQ ---")
    prompt = f"Suggérez des sources de financement marocaines spécifiques pour : {state['idea']}"
    result = call_llm(prompt)
    return {"funding": result}