from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = SentenceTransformer('all-MiniLM-L6-v2')

class RecommendationRequest(BaseModel):
    userId: str
    threads: List[dict]
    userHistory: List[int]

@app.options("/recommendations")
async def options_recommendations():
    return {"Allow": "POST, OPTIONS"}

@app.post("/recommendations")
async def get_recommendations(request: RecommendationRequest):
    user_id = request.userId
    threads = request.threads
    user_history_ids = request.userHistory

    # Fetch user history content
    user_history_content = [next((thread['content'] for thread in threads if thread['id'] == thread_id), None) for thread_id in user_history_ids]

    # Embed user history
    user_embedding = model.encode(" ".join([content for content in user_history_content if content]))

    # Embed all threads
    thread_embeddings = {thread['id']: model.encode(thread['content'] + " " + " ".join(tag['name'] for tag in thread['tags'])) for thread in threads}

    # Compute similarities
    similarities = {thread_id: np.dot(user_embedding, thread_embedding) for thread_id, thread_embedding in thread_embeddings.items()}

    # Sort threads by similarity
    recommended_threads = sorted(similarities, key=similarities.get, reverse=True)

    return {"recommendations": recommended_threads}
