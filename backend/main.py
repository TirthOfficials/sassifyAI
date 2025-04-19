from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
from prompts import PROMPTS
import os
import requests
from dotenv import load_dotenv
from twilio.rest import Client
import logging
from uuid import uuid4
from datetime import datetime

# Load environment variables
load_dotenv()

# FastAPI instance
app = FastAPI(title="SassifyAI - Voice Call Generator", version="1.0")

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# API Keys & Configs
ELEVEN_API_KEY = os.getenv("ELEVEN_API_KEY")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
VOICE_ID_DEFAULT = "EXAVITQu4vr4xnSDxMaL"

# Twilio Client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Request Body Model
class PersonaRequest(BaseModel):
    persona: str
    user_number: str

@app.post("/start-call", tags=["Voice Call"])
async def start_call(request_data: PersonaRequest):
    persona = request_data.persona.strip().lower()
    user_number = request_data.user_number.strip()

    logger.info(f"Received call request for persona: {persona}, to number: {user_number}")

    # Validate persona
    if persona not in PROMPTS:
        logger.warning(f"Persona '{persona}' not found. Falling back to 'friend'.")
        persona = "friend"

    prompt_text = PROMPTS[persona]

    # Construct Eleven Labs TTS Payload
    tts_url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID_DEFAULT}"
    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "text": prompt_text,
        "voice_settings": {
            "stability": 0.4,
            "similarity_boost": 0.75
        }
    }

    logger.info("Sending request to Eleven Labs TTS API...")
    tts_response = requests.post(tts_url, headers=headers, json=payload)

    if tts_response.status_code != 200:
        logger.error(f"Eleven Labs TTS API failed: {tts_response.status_code}")
        raise HTTPException(status_code=500, detail="Failed to synthesize voice from Eleven Labs")

    # Save generated audio
    filename = f"audio_{uuid4().hex[:8]}.mp3"
    audio_path = f"./generated_audio/{filename}"
    os.makedirs(os.path.dirname(audio_path), exist_ok=True)
    with open(audio_path, "wb") as audio_file:
        audio_file.write(tts_response.content)
    
    logger.info(f"Synthesized voice saved as {filename}")

    # Normally you'd upload this to S3 or another static hosting
    twiml_audio_url = "http://demo.twilio.com/docs/voice.xml"

    # Initiate Twilio Call
    try:
        logger.info("Placing call through Twilio...")
        call = client.calls.create(
            to=user_number,
            from_=TWILIO_PHONE_NUMBER,
            url=twiml_audio_url,
        )
        logger.info(f"Call SID: {call.sid}")
    except Exception as e:
        logger.exception("Failed to initiate call with Twilio.")
        raise HTTPException(status_code=500, detail="Failed to place call using Twilio.")

    return {
        "message": f"Initiated call to {user_number} with '{persona}' persona",
        "timestamp": datetime.utcnow().isoformat(),
        "call_sid": call.sid
    }
