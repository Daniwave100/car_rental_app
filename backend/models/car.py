class Car:
    def __init__(self, id: int, make: str, model: str, year: int, category: str, status: bool = True, rate: float = 0.0, mileage: float = 0.0):
        self.id = id
        self.make = make
        self.model = model
        self.year = year
        self.category = category
        self.status = status
        self.rate = rate
        self.mileage = mileage

    def to_dict(self):
        return {
            "id": self.id,
            "make": self.make,
            "model": self.model,
            "year": self.year,
            "category": self.category,
            "status": self.status,
            "rate": self.rate,
            "mileage": self.mileage
        }