from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from graph.workflow import create_workflow

# Initialisation de l'application FastAPI
app = FastAPI()

# Configuration du Middleware CORS pour permettre la communication avec le Frontend (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Autorise uniquement le port par défaut de Next.js
    allow_credentials=True,
    allow_methods=["*"], # Autorise toutes les méthodes (POST, GET, OPTIONS, etc.)
    allow_headers=["*"], # Autorise tous les en-têtes
)

# Initialisation du Workflow LangGraph au démarrage pour optimiser les performances
# On utilise app.state pour éviter de recréer le graphe à chaque requête
app.state.workflow = create_workflow()

class BusinessRequest(BaseModel):
    """Schéma de validation des données entrantes (Request Body)."""
    idea: str
    city: str

@app.post("/analyze")
async def analyze(request: BusinessRequest):
    """
    Point de terminaison (Endpoint) principal pour l'analyse du projet.
    Invoque le workflow Multi-Agent et retourne le résultat complet.
    """
    try:
        # Exécution du workflow stocké dans l'état de l'application
        # On initialise les clés du State avec des chaînes vides
        result = app.state.workflow.invoke({
            "idea": request.idea,
            "city": request.city,
            "analysis": "",
            "market": "",
            "business_plan": "",
            "funding": ""
        })
        return result
    except Exception as e:
        # Journalisation de l'erreur dans le terminal pour le débogage (Logging)
        print(f"Erreur lors de l'exécution du workflow : {str(e)}")
        # Retourne une erreur HTTP 500 au client
        raise HTTPException(
            status_code=500, 
            detail="Une erreur est survenue lors du traitement des données. Veuillez réessayer plus tard."
        )

@app.get("/")
def root():
    """Vérification de l'état de santé de l'API (Health Check)."""
    return {"message": "L'API Bidaya est opérationnelle"}