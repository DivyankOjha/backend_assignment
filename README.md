# == BACKEND ASSIGNMENT ==

# 📦 Receiver & Listener Microservices

This project consists of two microservices communicating via Redis Pub/Sub and persisting data in MongoDB.

---

## 🛠 Services Overview

### 1. Receiver Service

- Exposes a `POST /receiver` endpoint.
- Validates incoming JSON data.
- Stores it in MongoDB (`records` collection).
- Publishes the stored data to a Redis channel (`new_records`).

### 2. Listener Service

- Subscribes to the Redis `new_records` channel.
- Reads incoming messages.
- Adds a `modified_at` timestamp.
- Stores the result in another MongoDB collection (e.g., `processed_records`).

---

## 🐳 Run with Docker

### ✅ Prerequisites

- Docker & Docker Compose installed.
- Ports **3000**, **6379**, and **27017** available.

---

## 📁 Project Structure

.
├── receiver/
│ ├── app.js
│ ├── Dockerfile
│ ├── routes/
│ ├── config/
│ ├── controller/
│ └── package.json
│
├── listener/
│ ├── index.js
│ ├── subscriber.js
│ ├── config/
│ ├── Dockerfile
│ └── package.json
│
├── .env
├── docker-compose.yml
└── README.md

---

## 🚀 Running the Services

```bash
docker-compose up --build
```

Receiver available at: http://localhost:3000/receiver

Listener automatically subscribes to the new_records Redis channel.

🔗 Sample Request

POST http://localhost:3000/receiver
Content-Type: application/json

{
"user": "Harry",
"class": "Comics",
"age": 22,
"email": "harry@potter.com"
}

## 🧪 Behavior

1. **Receiver** validates and stores the data in the `records` collection.
2. It then **publishes the record** to the Redis channel `new_records`.
3. **Listener** picks up the event from Redis.
4. Listener **adds a `modified_at` timestamp** to the message.
5. Listener **saves the updated message** to a separate MongoDB collection (e.g., `processed_records`).

## 🧹 Teardown

To stop and remove all containers, networks, and volumes created by Docker Compose:

```bash
docker-compose down -v


## 📌 Notes

- **MongoDB** is shared between both services.
- **Redis Pub/Sub** is used for inter-service communication.
- Both services are **Dockerized and scalable**.
- The `docker-compose.yml` file is **included** to simplify setup and orchestration.

```

## 📫 Feedback & Contribution

Have an idea or found an issue?  
Feel free to [open an issue](https://github.com/DivyankOjha/backend_assignment/issues) or submit a pull request.  
Contributions are welcome and appreciated!
