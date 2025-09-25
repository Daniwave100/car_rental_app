import supabase
import sys
import os

# Ensure the parent directory is in the sys.path, basically so we can run car_service.py directly from services folder
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from supabase_client import supabase
from models.car import Car

# Fetches all cars from database to use for dashboard
def fetch_all_cars():
    # Logic to fetch all cars from the database
    response = (
    supabase.table("cars")
    .select("*")
    .execute()
    )    
    car_list = []
    for car in response.data:
        car_list.append(Car(
            car['id'], 
            car['make'], 
            car['model'], 
            car['year'], 
            car['category'], 
            car['status'], 
            car['rate'], 
            car['mileage'],
            car['image_url']))
    return car_list

# fetches data from one car by id to use for booking
def fetch_car(car_id):
    response = (supabase.table("cars")
    .select("*")
    .eq("id", car_id)
    .execute()
    )

    car = response.data[0]
    return Car(
        car['id'], 
            car['make'], 
            car['model'], 
            car['year'], 
            car['category'], 
            car['status'], 
            car['rate'], 
            car['mileage'],
            car['image_url']
    )

print(fetch_car("15d44f05-d5e7-4655-bfaf-2487fe030405"))