# 🚀 Bidaya AI: Intelligent Business Plan Generator
### *Multi-Agent RAG Architecture for the Moroccan Entrepreneurial Ecosystem*

**Bidaya AI** is a specialized web platform designed to empower Moroccan entrepreneurs. By leveraging Generative AI and Multi-Agent Systems, the platform transforms raw business ideas into structured, strategic, and localized business plans ready for investment.
---

## 🏗️ System Architecture

Bidaya AI distinguishes itself from simple LLM wrappers by using a **State-Graph Orchestration** powered by **LangGraph**. The process is divided into specialized nodes, ensuring high-quality output and logical consistency.

### The Multi-Agent Workflow:
1.  **Strategic Analyst Node**: Evaluates the core value proposition and scalability of the business idea.
2.  **Market Intelligence Node**: Conducts a localized market study based on the specific Moroccan city/region.
3.  **Execution Planner Node**: Drafts a comprehensive operational strategy and roadmap.
4.  **Financial Advisor Node**: Identifies specific national funding programs (e.g., **Intelaka**, **Forsa**) relevant to the project profile.

---

## 🛠️ Technical Stack

### Backend (Core Engine)
- **Framework:** FastAPI (Asynchronous, high-performance Python web framework).
- **Orchestration:** LangGraph & LangChain (Managing complex state and agent transitions).
- **LLM Infrastructure:** Llama 3.1 via **Groq LPU** (Ultra-low latency inference).
- **Data Validation:** Pydantic models for strict type checking.

### Frontend (User Experience)
- **Framework:** Next.js 14 (App Router) with TypeScript for type safety.
- **Styling:** Tailwind CSS (Modern, responsive, and minimalist UI).
- **Icons:** Lucide React for consistent visual language.
- **Documentation Engine:** ReactMarkdown for rendering AI-generated reports.
- **Export Engine:** Optimized `@media print` CSS for professional PDF generation.

---

## 📂 Project Structure

```text
bidaya/
├── backend/
│   ├── graph/           # AI Logic: Nodes, State, and Workflow definitions
│   ├── .env             # Environment variables (API Keys)
│   ├── main.py          # FastAPI entry point & CORS configuration
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── app/             # Next.js pages and UI components
│   ├── public/          # Static assets
│   └── tailwind.config  # Custom theme configuration
└── README.md            # Technical documentation

🚀 Installation & Setup
Prerequisites
Python 3.10+

Node.js 18+

Groq API Key

1. Backend Setup
Bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Create a .env file and add: GROQ_API_KEY=your_key_here
uvicorn main:app --reload
2. Frontend Setup
Bash
cd frontend
npm install
npm run dev
The application will be live at http://localhost:3000.

🌟 Key Features
Context-Aware Generation: Tailored specifically for the Moroccan economic landscape.

Professional PDF Export: Clean, printable reports designed for official submissions.

Agentic Logic: Sequential processing that ensures the Business Plan follows a logical narrative.

Clean UI/UX: Minimalist interface focusing on user input and content clarity.

👩‍💻 Professional Profile
Developed by a State Engineer (Ingénieure d'État) specializing in Generative AI and Full-Stack Engineering. This project demonstrates the integration of advanced AI orchestration within a production-ready web architecture.

⚖️ License
Distributed under the MIT License.


### Final Recommendations for your GitHub:

1.  **Requirements File**: Ensure you run `pip freeze > requirements.txt` inside your `backend` folder so others can install your dependencies.
2.  **Commit Message**: Use a professional message for this push:
    `git add .`
    `git commit -m "docs: comprehensive technical README and project architecture update"`
    `git push origin main`
