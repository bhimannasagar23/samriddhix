from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import base64, os, requests
from PIL import Image
import io

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

genai.configure(api_key=os.getenv("GEMINI_API_KEY", "YOUR_KEY_HERE"))

@app.post("/detect-disease")
async def detect_disease(file: UploadFile = File(...)):
    """Crop disease detection using Gemini Vision"""
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to base64 for Gemini Vision
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode()

        model = genai.GenerativeModel('gemini-pro-vision')
        response = model.generate_content([
            """Analyze this crop/plant image and provide:
            1. Disease name (if any)
            2. Severity: Low/Medium/High
            3. Affected area percentage
            4. Immediate treatment in simple language
            5. Organic remedy (home remedy)
            6. Which government scheme can help
            Format as JSON with keys: disease, severity, affected_percent, treatment, organic_remedy, govt_scheme""",
            {"mime_type": "image/jpeg", "data": img_base64}
        ])
        
        return {"success": True, "analysis": response.text}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/crop-recommendation")
async def crop_recommendation(soil_type: str, rainfall: float, temperature: float, season: str):
    """AI crop recommendation based on conditions"""
    model = genai.GenerativeModel('gemini-pro')
    prompt = f"""As an agriculture expert, recommend the TOP 3 best crops for:
    Soil: {soil_type}, Rainfall: {rainfall}mm, Temp: {temperature}°C, Season: {season}
    For each crop give: name, expected yield per acre, water need, profit estimate in INR.
    Respond in JSON array format."""
    
    response = model.generate_content(prompt)
    return {"recommendations": response.text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)