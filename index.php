<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mentai Yammy 🍱</title>

<script src="https://app.sandbox.midtrans.com/snap/snap.js"
data-client-key="ISI_CLIENT_KEY_KAMU"></script>

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>

<body>

<div class="screen active" id="splash">
  <div class="splash-content">
    <div class="splash-logo">🍱</div>
    <div class="splash-title">Mentai<br>Yammy</div>
    <div class="splash-sub">Dimsum · Mentai · Wonton</div>
  </div>
</div>

<div class="screen" id="home">
  <nav class="navbar">
    <div class="nav-brand">
      <span class="nav-logo">🍱</span>
      <span class="nav-title">Mentai Yammy</span>
    </div>
    <div id="nav-auth-btns">
      <button onclick="showScreen('login')">Masuk</button>
      <button onclick="showScreen('register')">Daftar</button>
    </div>
  </nav>

  <div class="hero">
    <h2>Dimsum Mentai</h2>
    <input type="text" placeholder="Cari menu..." id="search-input" oninput="filterMenu()">
  </div>

  <div class="menu-grid" id="menu-grid"></div>
</div>

<div class="screen" id="login">
  <h2>Login</h2>
  <input type="email" id="login-email" placeholder="Email">
  <input type="password" id="login-pass" placeholder="Password">
  <button onclick="doLogin()">Login</button>
</div>

<div class="screen" id="register">
  <h2>Register</h2>
  <input type="text" id="reg-name" placeholder="Nama">
  <input type="email" id="reg-email" placeholder="Email">
  <input type="password" id="reg-pass" placeholder="Password">
  <button onclick="doRegister()">Daftar</button>
</div>

<div class="screen" id="detail">
  <h2 id="detail-name"></h2>
  <p id="detail-desc"></p>
  <p id="detail-price"></p>
  <button onclick="addToCart()">Tambah</button>
</div>

<script src="script.js"></script>
</body>
</html>