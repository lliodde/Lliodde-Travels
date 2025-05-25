// Check if JavaScript is running
console.log("JavaScript file is running!");

// Ensure DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Static travel recommendation data
    const travelData = {
        beaches: [
            { name: "Maldives", description: "White sandy beaches & crystal-clear water.", imageUrl: "https://source.unsplash.com/400x300/?beach" },
            { name: "Bali, Indonesia", description: "Tropical paradise with stunning coastline.", imageUrl: "https://source.unsplash.com/400x300/?bali" }
        ],
        temples: [
            { name: "Angkor Wat, Cambodia", description: "Largest temple complex in the world.", imageUrl: "https://source.unsplash.com/400x300/?temple" },
            { name: "Fushimi Inari, Japan", description: "Iconic red torii gates.", imageUrl: "https://source.unsplash.com/400x300/?japan" }
        ],
        cities: [
            { name: "Rome, Italy", description: "Historical landmarks & vibrant culture.", imageUrl: "https://source.unsplash.com/400x300/?rome" },
            { name: "Tokyo, Japan", description: "A perfect blend of tradition & technology.", imageUrl: "https://source.unsplash.com/400x300/?tokyo" }
        ]
    };

    // Make travelData globally accessible
    window.travelData = travelData;
});

// Search function
function search() {
    let searchValue = document.getElementById("search").value.trim().toLowerCase();
    if (!searchValue) {
        alert("Please enter a keyword!");
        return;
    }

    let results = [];

    if (matchesKeyword(searchValue, "beach")) {
        results = travelData.beaches.slice(0, 2);
    } else if (matchesKeyword(searchValue, "temple")) {
        results = travelData.temples.slice(0, 2);
    } else {
        results = travelData.cities.filter(city => matchesKeyword(searchValue, city.name)).slice(0, 2);
    }

    if (results.length === 0) {
        alert("No matching results found!");
    } else {
        displayResults(results);
    }
}

// Function to match keywords
function matchesKeyword(input, target) {
    return target.toLowerCase().includes(input) || input.includes(target.toLowerCase());
}

// Display search results
function displayResults(results) {
    const container = document.getElementById("recommendation-results");
    container.innerHTML = "";

    results.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("recommendation-card");

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;

        container.appendChild(card);
    });
}

// Reset search results
function resetSearch() {
    document.getElementById("search").value = "";
    document.getElementById("recommendation-results").innerHTML = "";
}
