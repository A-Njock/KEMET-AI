
# Deploying Kemet AI to Coolify

Your project is now fully configured for a "One-Click" deployment on **Coolify** using Docker Compose.

## How to Deploy

1.  **Push to GitHub**:
    *   Create a new repository on GitHub (e.g., `kemet-ai-coolify`).
    *   Push the contents of this folder (`KEMET-AI-COOLIFY`) to it.

2.  **Open Coolify**:
    *   Go to your Coolify dashboard.
    *   Click **+ New Resource**.
    *   Select **Git Repository** (or "Public Repository" if you made it public).
    *   Select the repository you just created.

3.  **Configuration**:
    *   Coolify should automatically detect the `docker-compose.yml` file.
    *   **Environment Variables**: You MUST add your secrets in the Coolify UI (under the "Environment Variables" tab for the `backend` service):
        *   `OPENAI_API_KEY`: sk-...
        *   `ANY_OTHER_KEY`: ...

4.  **Deploy**:
    *   Click **Deploy**.

## What happens under the hood?

*   **Frontend**: Built with Vite. It talks to the backend via an Nginx internal proxy. Nginx serves the static files on Port 80.
*   **Backend**: Python FastAPI app running on Port 8000 (internally).
*   **Networking**: Docker Compose puts them on a private network (`kemet_network`). The "outside world" only talks to the Frontend (Nginx), which safely routes API calls to the Backend.

## Troubleshooting

*   **API Errors**: If the frontend says "Network Error", check if the `backend` container is running in Coolify logs.
*   **Build Failures**: Check the "Build Logs". Nginx builds usually pass quickly. Python builds may fail if dependencies are missing in `requirements.txt`.
