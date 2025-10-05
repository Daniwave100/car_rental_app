async function loadCars() {
    try {
        const response = await fetch("http://127.0.0.1:8000/cars/get_all_cars");
        const cars = await response.json();
        const carsList = document.getElementById("cars-list");

        cars.forEach(car => {
            const carDiv = document.createElement("div");
            carDiv.className = "car";
            carDiv.innerHTML = `
                <img src="${car.image_url}" alt="${car.make} ${car.model}" style="width: 200px; height: auto;">
                <h3>${car.make} ${car.model} (${car.year})</h3>
                <p>Category: ${car.category}</p>
                <p>Rate: $${car.rate}/day</p>
                <p>Mileage: ${car.mileage}</p>
                <button onclick="selectCar(${car.id})">Rent This Car</button>
            `;
            carsList.appendChild(carDiv);
        });
    } catch (error) {
        console.error("Error loading cars:", error);
    }
}

function selectCar(carId) {
    window.location.href = `../payment/information.html?car_id=${carId}`;
}

loadCars();