
console.log("Drive Elite Website Loaded!");

// ==================================
// BOOKING PAGE FUNCTIONALITY
// ==================================

const vehicle = document.getElementById("vehicle");
const pickup = document.getElementById("pickup");
const returnDate = document.getElementById("return");
const totalPrice = document.getElementById("totalPrice");
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

// Get today's date
function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Run booking code only on booking page
if (bookingForm) {

    pickup.min = getToday();
    returnDate.min = getToday();

    // Get vehicle from URL
    const params = new URLSearchParams(window.location.search);
    const selectedVehicle = params.get("vehicle");

    if (selectedVehicle) {
        const option = [...vehicle.options].find(
            option => option.text.includes(selectedVehicle)
        );

        if (option) {
            vehicle.value = option.value;
        }
    }

    // Calculate price
    function calculatePrice() {

        const price = Number(vehicle.value);

        if (!price || !pickup.value || !returnDate.value) {
            totalPrice.textContent = "₹0";
            return;
        }

        const start = new Date(pickup.value + "T00:00:00");
        const end = new Date(returnDate.value + "T00:00:00");

        const days = (end - start) / 86400000;

        if (days <= 0) {
            totalPrice.textContent = "Invalid dates";
            return;
        }

        const total = price * days;

        totalPrice.textContent =
            "₹" + total.toLocaleString("en-IN");
    }

    pickup.addEventListener("change", function() {

        returnDate.min = pickup.value;

        if (returnDate.value && returnDate.value <= pickup.value) {
            returnDate.value = "";
        }

        calculatePrice();
    });

    vehicle.addEventListener("change", calculatePrice);
    returnDate.addEventListener("change", calculatePrice);

    // Submit booking form
    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        if (!vehicle.value || !pickup.value ||
            !returnDate.value ||
            returnDate.value <= pickup.value) {

            bookingMessage.textContent =
                "Please enter valid booking details.";

            return;
        }

        calculatePrice();

        bookingMessage.textContent =
            "Thank you, " + name +
            "! Your demo booking request is successful.";

        bookingForm.reset();

        pickup.min = getToday();
        returnDate.min = getToday();

        totalPrice.textContent = "₹0";
    });
}


// ==================================
// CONTACT PAGE FUNCTIONALITY
// ==================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();

        document.getElementById("contactMessage").textContent =
            "Thank you, " + name + "! Your demo message has been submitted.";

        contactForm.reset();

    });
}
