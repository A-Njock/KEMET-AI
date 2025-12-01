FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential

# Copy requirements and install dependencies
COPY legal-rag-app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire legal-rag-app directory
COPY legal-rag-app/ .

# Expose port
EXPOSE 8000

# Start API
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]

