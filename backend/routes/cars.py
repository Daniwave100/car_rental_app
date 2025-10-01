# Author: Daniel Canhedo

import os
import sys

# Ensure the parent directory is in the sys.path, basically so we can run car_service.py directly from services folder
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from supabase_client import supabase
from fastapi import APIRouter
from services.car_service import fetch_all_cars, fetch_car

# router basically groups similar endpoints together
# here we group all auth-related endpoints together. 
# we can then group the endpoints of cars/booking actions together
router = APIRouter(prefix="/cars")

# dont use verbs
@router.get("/get_all_cars")
def get_all_cars():
    try: 
        # get cars from the database to list it on dashboard
        # returns array of dicts
        cars = fetch_all_cars()
        cars_list = []
        for car in cars:
            cars_list.append(car.to_dict())
        return cars_list
    except Exception as e:
        print(f"Error fetching cars: {e}")
        return {"error": f"An error occurred while fetching cars {e}"}
    
# dont use verbs for naming api
@router.get("/get_car")
def get_car(car_id):
    try:
        # get one car from database by id
        car = fetch_car(car_id)
        return car
    except Exception as e:
        print(f"Error fetching cars {e}")
        return {"error": f"An error occurred while fetching cars {e}"}