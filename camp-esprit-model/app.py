from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import numpy as np

# Example data (generated)
threads_with_tags = [
    {"content": "What's the best type of tent for a family of four? Looking for recommendations!", "tags": ["gear", "tent"]},
    {"content": "Just got back from an amazing trip to Yellowstone! Here are some must-see spots.", "tags": ["destination", "hiking"]},
    {"content": "Has anyone tried hammock camping? Looking for tips and tricks.", "tags": ["tips", "hammock"]},
    {"content": "Tips for camping with kids - how to make it fun and safe?", "tags": ["tips", "family"]},
    {"content": "Favorite hiking trails in Jendouba?", "tags": ["destination", "hiking"]},
    {"content": "Best portable stoves for cooking while camping?", "tags": ["gear", "cooking"]},
    {"content": "How do you keep your campsite safe from bears?", "tags": ["tips", "safety"]},
    {"content": "Looking for recommendations for lightweight backpacking gear.", "tags": ["gear", "backpacking"]},
    {"content": "Tips for camping in the rain - how to stay dry and comfortable.", "tags": ["tips", "rain"]},
    {"content": "How to find free campsites in national forests?", "tags": ["tips", "campsite"]},
    {"content": "Anyone tried camping in the south? Best places to go?", "tags": ["destination", "Canada"]},
    {"content": "Best places to go camping in the Pacific Northwest?", "tags": ["destination", "Northwest"]},
    {"content": "How do you keep mosquitoes away while camping?", "tags": ["tips", "mosquitoes"]},
    {"content": "Tips for camping with dogs - how to keep them safe and happy?", "tags": ["tips", "dogs"]},
    {"content": "Recommendations for compact sleeping bags for cold weather?", "tags": ["gear", "sleeping"]},
    {"content": "Favorite hiking trails in siliana?", "tags": ["destination", "hiking"]},
    {"content": "What’s the most scenic campsite you’ve ever visited?", "tags": ["destination", "scenic"]},
    {"content": "Anyone have experience with RV camping? Pros and cons?", "tags": ["tips", "RV"]},
]

# Initialize Sentence Transformer model
model = SentenceTransformer('all-mpnet-base-v2')

def get_recommendations(user_history: List[int], threads_with_tags: List[dict]) -> List[int]:
    # Step 1: Generate embeddings for all threads
    thread_embeddings = model.encode([thread['content'] for thread in threads_with_tags])

    # Step 2: Initialize user preferences vector
    user_preferences = np.zeros(len(threads_with_tags))

    # Step 3: Aggregate user preferences based on interaction history
    for idx in user_history:
        user_preferences += cosine_similarity([thread_embeddings[idx]], thread_embeddings)[0]

    # Step 4: Rank threads based on user preferences and filter out interacted threads
    thread_indices_sorted = np.argsort(user_preferences)[::-1]

    # Filter out threads that the user has already interacted with
    recommended_thread_indices = []
    for idx in thread_indices_sorted:
        if idx not in user_history and idx not in recommended_thread_indices:
            recommended_thread_indices.append(idx)
    
    # Convert numpy.int64 to Python int
    return [int(idx) for idx in recommended_thread_indices[:10]] 

app = FastAPI()

class UserHistory(BaseModel):
    history: List[int]

@app.post("/recommend")
def recommend_threads(user_history: UserHistory):
    recommended_indices = get_recommendations(user_history.history, threads_with_tags)
    return {"recommendations": recommended_indices}
