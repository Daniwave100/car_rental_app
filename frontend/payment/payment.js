const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('car_id');
document.getElementById("car-id").textContent = carId;

document.getElementById("payment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Payment successful!");
    window.location.href = "../dashboard/dashboard.html";
});