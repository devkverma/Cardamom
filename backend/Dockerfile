FROM python:3.10-slim

WORKDIR /app

# Fix apt sources and install dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       netcat-openbsd \
       build-essential \
       libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

EXPOSE 8000

# Wait for DB before starting Django
CMD ["sh", "-c", "until nc -z db 5432; do echo waiting for db; sleep 1; done; python manage.py runserver 0.0.0.0:8000"]
