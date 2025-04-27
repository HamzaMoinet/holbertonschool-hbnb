document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      await loginUser(email, password);
    });
  }
});

async function loginUser(email, password) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.access_token}; path=/`;
      window.location.href = 'index.html';
    } else {
      alert('Login failed: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('An error occurred. Please try again later.');
  }
}

/**
 * Affiche les lieux dans la section #places-list.
 */
function displayPlaces(places) {
  const list = document.getElementById("places-list");
  if (!list) return;
  list.innerHTML = "";

  const token = getCookie("token");

  places.forEach((place) => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.setAttribute("data-price", place.price);

    let buttonHTML = "";
    buttonHTML = `<button class="btn" onclick="viewDetails('${place.id}')">View Details</button>`;

    card.innerHTML = `
      <h3>${place.title}</h3>
      <p>Price: $${place.price} per night</p>
      <p>${place.description}</p>
      ${buttonHTML}
    `;
    list.appendChild(card);
  });
}

function redirectToLogin() {
  alert("Vous devez être connecté pour voir les détails.");
  window.location.href = "login.html";
}

function viewDetails(placeId) {
  window.location.href = `place.html?id=${placeId}`;
}

function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function checkAuthenticationAndLoadDetails() {
  const token = getCookie("token");
  const placeId = getPlaceIdFromURL();
  const addReviewSection = document.getElementById("add-review");

  if (!placeId) {
    console.error("Aucun ID de lieu dans l'URL.");
    window.location.href = "index.html";
    return;
  }

  if (!token) {
    if (addReviewSection) addReviewSection.style.display = "none";
    fetchPlaceDetails(null, placeId);
  } else {
    if (addReviewSection) addReviewSection.style.display = "block";
    fetchPlaceDetails(token, placeId);
  }
}

async function fetchPlaceDetails(token, placeId) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = "Bearer " + token;

    console.log("Fetching details for place ID:", placeId);

    const res = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}`, {
      method: "GET",
      headers,
    });

    if (!res.ok)
      throw new Error("Erreur API lors de la récupération des détails du lieu");

    const place = await res.json();
    displayPlaceDetails(place);
    loadReviews(placeId);
  } catch (err) {
    console.error("Erreur lors du chargement des détails du lieu :", err);
  }
}

function displayPlaceDetails(place) {
  document.getElementById("place-name").textContent = place.title;
  document.getElementById(
    "place-host"
  ).textContent = `Host: ${place.owner.first_name} ${place.owner.last_name}`;
  document.getElementById("place-price").textContent = `Price: $${place.price}`;
  document.getElementById(
    "place-description"
  ).textContent = `Description: ${place.description}`;

  const amenitiesIcons = {
    Wifi: "<img src='./images/icon_wifi.png' alt='Wifi' style='height:20px; vertical-align:middle;'>",
    Bathroom:
      "<img src='./images/icon_bath.png' alt='Bathroom' style='height:20px; vertical-align:middle;'>",
    Bed: "<img src='./images/icon_bed.png' alt='Bed' style='height:20px; vertical-align:middle;'>",
  };

  if (place.amenities.length === 0) {
    document.getElementById("place-amenities").innerHTML = "Amenities: None";
  } else {
    const amenityList = place.amenities
      .map((a) => {
        return `${amenitiesIcons[a.name] || ""} ${a.name}`;
      })
      .join(" | ");
    document.getElementById(
      "place-amenities"
    ).innerHTML = `Amenities: ${amenityList}`;
  }

  document.getElementById("place-image").src =
    place.image || "https://www.costas-casas.fr/db/huizen/1357/123765-2_57.jpg";
}

async function loadReviews(placeId) {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/v1/reviews/");
    if (!res.ok) throw new Error("Erreur chargement reviews");

    const allReviews = await res.json();
    const reviews = allReviews.filter((r) => r.place_id === placeId);

    const reviewsContainer = document.getElementById("reviews");
    reviewsContainer.innerHTML = "<h3>Reviews</h3>";

    if (reviews.length === 0) {
      reviewsContainer.innerHTML += "<p>No reviews yet.</p>";
    } else {
      reviews.forEach((r) => {
        const el = document.createElement("article");
        el.className = "review-card";
        el.innerHTML = `<p>"${r.text}"</p><p>Rating: ${r.rating}/5</p>`;
        reviewsContainer.appendChild(el);
      });
    }
  } catch (err) {
    console.error("Erreur chargement des reviews :", err);
  }
}

function initPriceFilter() {
  const priceFilter = document.getElementById("price-filter");
  if (priceFilter) {
    priceFilter.addEventListener("change", (event) => {
      const selected = event.target.value;
      console.log("Filtrage des lieux avec la valeur :", selected);
      const placeCards = document.querySelectorAll(".place-card");
      placeCards.forEach((card) => {
        const price = parseFloat(card.getAttribute("data-price"));
        if (selected === "All") {
          card.style.display = "block";
        } else {
          const maxPrice = parseFloat(selected);
          card.style.display = price <= maxPrice ? "block" : "none";
        }
      });
    });
  }
}