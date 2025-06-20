<?php include 'includes/session.php'; ?>
<nav class="sticky-top navbar navbar-expand-lg navbar-dark">
    <div class="container">
        <a class="navbar-brand" href="#" onclick="showPage('home')">
            <i class="bi bi-calendar-event"></i> EventHub
        </a>
        ...
        <ul class="navbar-nav">
            <li class="nav-item" id="cartNav">
                <a class="nav-link" href="#" onclick="showPage('cart')">
                    <i class="bi bi-cart"></i> Cart <span class="bg-danger badge cart-count">0</span>
                </a>
            </li>

            <?php if (isset($_SESSION['user'])): ?>
                <li class="nav-item dropdown" id="userDropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle"></i> <span id="username"><?= $_SESSION['user']['name']; ?></span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" onclick="showPage('dashboard')"><i class="bi bi-speedometer2"></i> Dashboard</a></li>
                        <li><a class="dropdown-item" href="#" onclick="showPage('bookings')"><i class="bi bi-ticket-perforated"></i> My Bookings</a></li>
                        <li><a class="dropdown-item" href="#" onclick="showPage('profile')"><i class="bi bi-person"></i> Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="actions/logout.php"><i class="bi-box-arrow-right bi"></i> Logout</a></li>
                    </ul>
                </li>
            <?php else: ?>
                <li class="nav-item"><a class="nav-link" href="#" onclick="showPage('login')">Login</a></li>
                <li class="nav-item"><a class="nav-link" href="#" onclick="showPage('register')">Register</a></li>
                <li class="nav-item"><a class="nav-link" href="#" onclick="showPage('admin')">Admin</a></li>
            <?php endif; ?>
        </ul>
    </div>
</nav>
