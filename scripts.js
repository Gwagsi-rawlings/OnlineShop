// Simulated login state (you can connect this to real auth logic)
let isLoggedIn = false;
let currentUser = {
    username: "User",
    cartCount: 0
};

// Called on page load
document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
    updateCartCount(currentUser.cartCount);
});

// Show the appropriate page section
function showPage(pageId) {
    console.log("Navigating to:", pageId);
    // Example: logic to toggle visible sections
    const pages = document.querySelectorAll("[data-page]");
    pages.forEach(page => page.style.display = "none");

    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.style.display = "block";
}

// Update UI for login/logout status
function updateNavbar() {
    const userDropdown = document.getElementById("userDropdown");
    const loginNav = document.getElementById("loginNav");
    const registerNav = document.getElementById("registerNav");
    const usernameSpan = document.getElementById("username");

    if (isLoggedIn) {
        userDropdown.style.display = "block";
        loginNav.style.display = "none";
        registerNav.style.display = "none";
        usernameSpan.textContent = currentUser.username;
    } else {
        userDropdown.style.display = "none";
        loginNav.style.display = "block";
        registerNav.style.display = "block";
    }
}

// Simulate logout
function logout() {
    console.log("User logged out");
    isLoggedIn = false;
    currentUser.username = "User";
    updateNavbar();
    showPage("login");
}

// Update cart item count badge
function updateCartCount(count) {
    const cartBadge = document.querySelector(".cart-count");
    if (cartBadge) {
        cartBadge.textContent = count;
        cartBadge.style.display = count > 0 ? "inline-block" : "none";
    }
}

// Simulate login (for testing)
function login(username) {
    isLoggedIn = true;
    currentUser.username = username;
    updateNavbar();
    showPage("dashboard");
}

// home.js
// Load featured events
function loadFeaturedEvents() {
    const featuredContainer = document.getElementById("featuredEvents");
    featuredContainer.innerHTML = "";
    const featuredEvents = events.filter(e => e.featured);

    featuredEvents.forEach(event => {
        featuredContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card event-card h-100">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <span class="badge badge-category">${event.category}</span>
                        <p class="mt-2">${event.date}</p>
                        <a href="#" class="btn btn-primary btn-sm">View Details</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Load upcoming events
function loadUpcomingEvents() {
    const upcomingContainer = document.getElementById("upcomingEvents");
    upcomingContainer.innerHTML = "";

    events.forEach(event => {
        upcomingContainer.innerHTML += `
            <div class="col-md-3">
                <div class="card event-card h-100">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <span class="badge badge-category">${event.category}</span>
                        <p class="mt-2">${event.date}</p>
                        <a href="#" class="btn btn-secondary btn-sm">Book Now</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Search events from the hero search bar
function searchEvents() {
    const query = document.getElementById("heroSearch").value.toLowerCase();
    const matchedEvents = events.filter(e => e.title.toLowerCase().includes(query));

    const featuredContainer = document.getElementById("featuredEvents");
    featuredContainer.innerHTML = "";

    if (matchedEvents.length === 0) {
        featuredContainer.innerHTML = `<p class="text-center">No events found for "${query}"</p>`;
        return;
    }

    matchedEvents.forEach(event => {
        featuredContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card event-card h-100">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <span class="badge badge-category">${event.category}</span>
                        <p class="mt-2">${event.date}</p>
                        <a href="#" class="btn btn-primary btn-sm">View Details</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filter by category
function filterByCategory(category) {
    const filteredEvents = events.filter(e => e.category === category);
    const upcomingContainer = document.getElementById("upcomingEvents");
    upcomingContainer.innerHTML = "";

    filteredEvents.forEach(event => {
        upcomingContainer.innerHTML += `
            <div class="col-md-3">
                <div class="card event-card h-100">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <span class="badge badge-category">${event.category}</span>
                        <p class="mt-2">${event.date}</p>
                        <a href="#" class="btn btn-secondary btn-sm">Book Now</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Initialize home page events when DOM loads
window.addEventListener("DOMContentLoaded", () => {
    loadFeaturedEvents();
    loadUpcomingEvents();
});

// Mock events data
function renderEvents(events) {
    const eventsList = document.getElementById("eventsList");
    eventsList.innerHTML = "";
    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "col-md-4";
        eventCard.innerHTML = `
            <div class="card h-100" onclick="showEventDetails(${event.id})">
                <img src="${event.image}" class="card-img-top" alt="${event.title}">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text"><i class="bi bi-calendar-event"></i> ${event.date}</p>
                    <p class="card-text"><i class="bi bi-geo-alt"></i> ${event.location}</p>
                </div>
            </div>
        `;
        eventsList.appendChild(eventCard);
    });
}

function applyFilters() {
    const search = document.getElementById("eventSearch").value.toLowerCase();
    const location = document.getElementById("locationFilter").value;
    const date = document.getElementById("dateFilter").value;

    const filtered = allEvents.filter(event =>
        (!search || event.title.toLowerCase().includes(search)) &&
        (!location || event.location === location) &&
        (!date || event.date === date)
    );

    renderEvents(filtered);
}

function showEventDetails(eventId) {
    const event = allEvents.find(e => e.id === eventId);
    if (!event) return;

    document.getElementById("eventDetailTitle").textContent = event.title;
    document.getElementById("eventDetailCategory").textContent = event.category;
    document.getElementById("eventDetailDate").textContent = event.date;
    document.getElementById("eventDetailDescription").textContent = event.description;
    document.getElementById("eventDetailFullDate").textContent = event.date;
    document.getElementById("eventDetailTime").textContent = event.time;
    document.getElementById("eventDetailVenue").textContent = event.venue;
    document.getElementById("eventDetailOrganizer").textContent = event.organizer;
    document.getElementById("eventDetailContact").textContent = event.contact;
    document.getElementById("eventDetailPrice").textContent = event.price;
    document.getElementById("eventDetailImage").src = event.image;
    document.getElementById("eventDetailAddress").textContent = event.address;

    showPage('eventDetails');
}

document.addEventListener("DOMContentLoaded", () => {
    renderEvents(allEvents);
});

// Sample cart array to hold cart items
let cart = [];

// Function to add current event to cart
function addToCart() {
    const title = document.getElementById("eventDetailTitle").textContent;
    const price = document.getElementById("eventDetailPrice").textContent.replace('$', '');
    const eventId = title.toLowerCase().replace(/\\s+/g, '-'); // create a simple ID from title

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === eventId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: eventId, title, price: parseFloat(price), quantity: 1 });
    }

    updateCartUI();
    alert(`${title} added to cart!`);
}

// Function to update cart UI count
function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Optional: Function to view cart items (to be connected to cart page logic)
function renderCart() {
    const cartContainer = document.getElementById("cartItems");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <strong>${item.title}</strong> - $${item.price} x ${item.quantity}
        `;
        cartContainer.appendChild(div);
    });
}

// Dashboard tab toggling
function showDashboardTab(tabId) {
    const tabs = document.querySelectorAll('.dashboard-tab');
    tabs.forEach(tab => tab.style.display = 'none');

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = 'block';
    }

    // Update active nav link
    const navLinks = document.querySelectorAll('.dashboard-sidebar .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    const clickedLink = [...navLinks].find(link => link.getAttribute('onclick')?.includes(tabId));
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

// Logout function placeholder
function logout() {
    alert('Logging out...');
    // Implement logout logic here, e.g., clearing session, redirecting, etc.
}

function showAdminTab(tabId) {
    // Hide all admin tab contents
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => tab.style.display = 'none');

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = 'block';
    }

    // Update active link in sidebar
    const navLinks = document.querySelectorAll('.dashboard-sidebar .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    const clickedLink = Array.from(navLinks).find(link => link.getAttribute('onclick')?.includes(tabId));
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

function logout() {
    // Example logout logic: clear session and redirect
    alert('Logging out...');
    showPage('login');  // Make sure this function is defined elsewhere
}

// Store mock event data (You can replace this with actual dynamic data or fetch from a backend)
let events = [];

// Function to simulate editing an event
function editEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) {
        alert("Event not found!");
        return;
    }

    // Simulated behavior – Replace this with your modal form setup and pre-fill values
    alert(`Editing Event:\n\nName: ${event.name}\nDate: ${event.date}\nVenue: ${event.venue}\nPrice: $${event.price}`);
    
    // You can use this data to populate a modal form for editing
    // Example:
    // document.getElementById("eventNameInput").value = event.name;
    // $('#editEventModal').modal('show');
}

// Function to delete an event from the list and UI
function deleteEvent(eventId) {
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    // Remove from events array (simulating backend delete)
    events = events.filter(e => e.id !== eventId);

    // Also remove row from the table DOM
    const row = document.querySelector(`button[onclick="deleteEvent(${eventId})"]`).closest("tr");
    if (row) {
        row.remove();
    }

    alert("Event deleted successfully.");
}

// addEventForm submission handler
document.getElementById("addEventForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieve form values
    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const venue = document.getElementById("eventVenue").value;
    const price = document.getElementById("eventPrice").value;
    const sold = document.getElementById("eventSold").value;
    const status = document.getElementById("eventStatus").value;

    const id = events.length + 1; // auto-increment ID
    events.push({ id, name, date, venue, price, sold, status });

    // Add row to the table
    const tableBody = document.querySelector("#adminEvents table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${date}</td>
        <td>${venue}</td>
        <td>$${price}</td>
        <td>${sold}</td>
        <td><span class="badge bg-${status === "Active" ? "success" : status === "Low Sales" ? "warning" : "secondary"}">${status}</span></td>
        <td>
            <button class="me-1 btn-outline-primary btn btn-sm" onclick="editEvent(${id})" title="Edit Event">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn-outline-danger btn btn-sm" onclick="deleteEvent(${id})" title="Delete Event">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    `;
    tableBody.appendChild(newRow);

    // Reset the form and close modal
    document.getElementById("addEventForm").reset();
    const addModal = bootstrap.Modal.getInstance(document.getElementById("addEventModal"));
    addModal.hide();

    alert("Event added successfully!");
});

const bookings = [];

function viewBooking(id) {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    const detailHTML = `
        <li class="list-group-item"><strong>Booking ID:</strong> #${booking.id}</li>
        <li class="list-group-item"><strong>User:</strong> ${booking.user}</li>
        <li class="list-group-item"><strong>Event:</strong> ${booking.event}</li>
        <li class="list-group-item"><strong>Date:</strong> ${booking.date}</li>
        <li class="list-group-item"><strong>Tickets:</strong> ${booking.tickets}</li>
        <li class="list-group-item"><strong>Total:</strong> ${booking.total}</li>
        <li class="list-group-item"><strong>Status:</strong> ${booking.status}</li>
    `;

    document.getElementById("bookingDetails").innerHTML = detailHTML;
    const modal = new bootstrap.Modal(document.getElementById("viewBookingModal"));
    modal.show();
}

function filterBookings() {
    const eventFilter = document.getElementById("bookingEventFilter").value;
    const statusFilter = document.getElementById("bookingStatusFilter").value;
    const dateFilter = document.getElementById("bookingDateFilter").value;

    const tbody = document.querySelector("#adminBookings table tbody");
    tbody.innerHTML = ""; // Clear current rows

    bookings.forEach(booking => {
        const eventMatch = !eventFilter || booking.event.includes(getEventNameById(eventFilter));
        const statusMatch = !statusFilter || booking.status.toLowerCase() === statusFilter;
        const dateMatch = !dateFilter || booking.date === formatDateToDisplay(dateFilter);

        if (eventMatch && statusMatch && dateMatch) {
            const statusBadge = booking.status === "Completed" ? "success" :
                                booking.status === "Pending" ? "warning" :
                                "danger";

            const row = `
                <tr>
                    <td>#${booking.id}</td>
                    <td>${booking.user}</td>
                    <td>${booking.event}</td>
                    <td>${booking.date}</td>
                    <td>${booking.tickets}</td>
                    <td>${booking.total}</td>
                    <td><span class="bg-${statusBadge} badge">${booking.status}</span></td>
                    <td>
                        <button class="btn-outline-primary btn btn-sm" onclick="viewBooking(${booking.id})" title="View Booking">
                            <i class="bi bi-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        }
    });
}

function getEventNameById(id) {
    const map = {};
    return map[id] || "";
}

function formatDateToDisplay(dateStr) {
    // Converts yyyy-mm-dd to 'Mon DD, YYYY'
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateStr).toLocaleDateString('en-US', options).replace(/,/g, '');
}

document.addEventListener("DOMContentLoaded", function () {
    loadFeaturedEvents();
    loadUpcomingEvents();
});

function loadFeaturedEvents() {
    fetch('api/fetch_featured_events.php')
        .then(res => res.json())
        .then(events => {
            const container = document.getElementById("featuredEvents");
            container.innerHTML = '';
            events.forEach(event => {
                container.innerHTML += createEventCard(event);
            });
        });
}

function loadUpcomingEvents() {
    fetch('api/fetch_upcoming_events.php')
        .then(res => res.json())
        .then(events => {
            const container = document.getElementById("upcomingEvents");
            container.innerHTML = '';
            events.forEach(event => {
                container.innerHTML += createEventCard(event);
            });
        });
}

function searchEvents() {
    const query = document.getElementById("heroSearch").value;
    fetch(`api/search_events.php?query=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(results => {
            const container = document.getElementById("featuredEvents");
            container.innerHTML = '<h5>Search Results</h5>';
            results.forEach(event => {
                container.innerHTML += createEventCard(event);
            });
        });
}

function filterByCategory(category) {
    fetch(`api/filter_events_by_category.php?category=${encodeURIComponent(category)}`)
        .then(res => res.json())
        .then(events => {
            const container = document.getElementById("featuredEvents");
            container.innerHTML = `<h5>${category} Events</h5>`;
            events.forEach(event => {
                container.innerHTML += createEventCard(event);
            });
        });
}

function createEventCard(event) {
    return `
        <div class="col-md-4">
            <div class="card h-100">
                <img src="${event.image || 'assets/default.jpg'}" class="card-img-top" alt="${event.title}">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.description.substring(0, 80)}...</p>
                    <p class="text-muted"><i class="bi bi-calendar"></i> ${event.date} | <i class="bi bi-geo-alt"></i> ${event.location}</p>
                    <button class="btn btn-outline-primary w-100" onclick="showPage('eventDetails', ${event.id})">View Details</button>
                </div>
            </div>
        </div>
    `;
}

function completeCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const payload = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        userId: 1, // For demo purposes, use actual logged-in user ID
        cart: cart.map(item => ({
            event_id: item.id,
            quantity: item.quantity,
            price: item.price
        }))
    };

    fetch('backend/complete_checkout.php', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            localStorage.removeItem("cart");
            document.getElementById("orderNumber").innerText = data.order_id;
            document.getElementById("confirmationTotal").innerText = `$${data.total.toFixed(2)}`;
            showPage('cart'); // or confirmation section
        } else {
            alert("Checkout failed. Try again.");
        }
    });
}

function register() {
    const data = {
        firstName: document.getElementById('registerFirstName').value,
        lastName: document.getElementById('registerLastName').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value,
        confirmPassword: document.getElementById('registerConfirmPassword').value
    };

    if (data.password !== data.confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    fetch('backend/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.status === "success") {
            alert(res.message);
            showPage('login');
        } else {
            alert(res.message);
        }
    });
}

function login() {
    const data = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    fetch('backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if (res.status === "success") {
            localStorage.setItem("user", JSON.stringify(res.user));
            alert("Welcome, " + res.user.firstName + "!");
            showPage('home'); // Or redirect as needed
        } else {
            alert(res.message);
        }
    });
}

// Load admin stats
fetch('backend/admin_overview.php')
  .then(res => res.json())
  .then(data => {
    document.querySelector('#adminOverview .admin-stat-card:nth-child(1) h2').textContent = data.totalEvents;
    document.querySelector('#adminOverview .admin-stat-card:nth-child(2) h2').textContent = data.totalBookings;
    document.querySelector('#adminOverview .admin-stat-card:nth-child(3) h2').textContent = data.totalUsers;
    document.querySelector('#adminOverview .admin-stat-card:nth-child(4) h2').textContent = "$" + data.revenue;
  });

// Load recent bookings
fetch('backend/admin_recent_bookings.php')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#adminOverview table:nth-of-type(1) tbody');
    tbody.innerHTML = '';
    data.forEach(b => {
      tbody.innerHTML += `
        <tr>
          <td>#${b.id}</td>
          <td>${b.user_name}</td>
          <td>${b.event_name}</td>
          <td>${new Date(b.booking_date).toLocaleDateString()}</td>
          <td>$${b.amount}</td>
        </tr>
      `;
    });
  });

// Load upcoming events
fetch('backend/admin_upcoming_events.php')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#adminOverview table:nth-of-type(2) tbody');
    tbody.innerHTML = '';
    data.forEach(e => {
      const badgeClass = e.status === "Active" ? "bg-success" : "bg-warning";
      tbody.innerHTML += `
        <tr>
          <td>${e.event}</td>
          <td>${e.date}</td>
          <td>${e.tickets_sold}</td>
          <td><span class="badge ${badgeClass}">${e.status}</span></td>
        </tr>
      `;
    });
  });

  function toggleUserStatus(userId) {
    fetch('toggle_user_status.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'id=' + userId
    })
    .then(res => res.json())
    .then(data => {
        alert('Status changed to ' + data.status);
        location.reload();
    });
}
