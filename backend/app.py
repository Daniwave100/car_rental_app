from fastapi import FastAPI
from backend.routes import auth
from backend.routes import cars
from fastapi.middleware.cors import CORSMiddleware

# initialize our FastAPI app
app = FastAPI()
# router basically groups similar endpoints together
# here we group all auth-related endpoints together. 
# we can then group the endpoints of cars/booking actions together

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # or restrict to ["http://127.0.0.1:5500", "http://localhost:5500"]
    allow_credentials=False,      # keep False when using "*"
    allow_methods=["*"],          # lets POST, GET, OPTIONS, etc.
    allow_headers=["*"],          # lets Content-Type, Authorization, etc.
)

# with large apps, it is a good idea to create separate files for our endpoints, that is where router comes in.
app.include_router(auth.router)
app.include_router(cars.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Car Rental App Backend!"}