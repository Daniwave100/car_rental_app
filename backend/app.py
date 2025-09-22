from fastapi import FastAPI
from backend.routes import auth
from backend.routes import cars

# initialize our FastAPI app
app = FastAPI()
# router basically groups similar endpoints together
# here we group all auth-related endpoints together. 
# we can then group the endpoints of cars/booking actions together

# with large apps, it is a good idea to create separate files for our endpoints, that is where router comes in.
app.include_router(auth.router)
app.include_router(cars.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Car Rental App Backend!"}