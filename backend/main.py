from fastapi import FastAPI, Request
from pydantic import BaseModel
from prompts import PROMPTS
import os
import requests
from dotenv import load_dotenv
from twilio.rest import Client

load_dotenv()

app = FastAPI()

ELEVEN_API_KEY = os.getenv("ELEVEN_API_KEY")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

class PersonaRequest(BaseModel):
    persona: str
    user_number: str

@app.post("/start-call")
async def start_call(data: PersonaRequest):
    persona = data.persona
    user_number = data.user_number
    prompt = PROMPTS.get(persona, PROMPTS["friend"])

    # Create synthetic audio from Eleven Labs
    voice_id = "EXAVITQu4vr4xnSDxMaL"  # Default voice
    tts_url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "text": f"{prompt}",
        "voice_settings": {
            "stability": 0.4,
            "similarity_boost": 0.75
        }
    }

    tts_response = requests.post(tts_url, headers=headers, json=payload)
    if tts_response.status_code != 200:
        return {"error": "Failed to synthesize voice"}

    # Save MP3
    with open("audio.mp3", "wb") as f:
        f.write(tts_response.content)

    # You would host this mp3 somewhere and pass that URL to TwiML
    call = client.calls.create(
        to=user_number,
        from_=TWILIO_PHONE_NUMBER,
        url="http://demo.twilio.com/docs/voice.xml"  # Replace with TwiML hosting your audio
    )

    return {"message": f"Calling {user_number} with {persona} persona"}
