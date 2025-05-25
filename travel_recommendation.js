document.addEventListener("DOMContentLoaded", () => {
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            console.log("Travel Recommendation Data:", data); // Debugging
            window.travelData = data; // Store API data globally for search function
        })
        .catch(error => console.error("Error fetching data:", error));
});

function getLocalTime(timeZone) {
    const options = { 
        timeZone: timeZone, 
        hour12: true, 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric' 
    };
    return new Date().toLocaleTimeString('en-US', options);
}

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
        travelData.countries.forEach(country => {
            if (matchesKeyword(searchValue, country.name)) {
                results.push({ 
                    name: country.name, 
                    description: `Country: ${country.name}`, 
                    imageUrl: "",
                    time: getLocalTime(getTimeZone(country.name))
                });
            }
            country.cities.forEach(city => {
                if (matchesKeyword(searchValue, city.name)) {
                    results.push({ 
                        ...city, 
                        time: getLocalTime(getTimeZone(country.name)) 
                    });
                }
            });
        });

        results = results.slice(0, 2);
    }

    if (results.length === 0) {
        alert("No matching results found!");
    } else {
        displayResults(results);
    }
}

function matchesKeyword(input, target) {
    return target.toLowerCase().includes(input) || input.includes(target.toLowerCase());
}

function getTimeZone(countryName) {
    const timeZones = {
        "Australia": "Australia/Sydney",
        "Japan": "Asia/Tokyo",
        "Brazil": "America/Sao_Paulo"
    };
    return timeZones[countryName] || "UTC"; // Default to UTC if unknown
}

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
            <p><strong>Local Time:</strong> ${item.time || "Not available"}</p>
        `;

        container.appendChild(card);
    });
}

function resetSearch() {
    document.getElementById("search").value = "";
    document.getElementById("recommendation-results").innerHTML = "";
}