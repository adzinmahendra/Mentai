fetch('check_session.php')
.then(res => res.json())
.then(res => {
  if (res.status === "logged_in") {
    currentUser = res.user;
  }
});

const menuData = [
  { id:1, name:"Dimsum Ayam", desc:"Enak", price:18000 },
  { id:2, name:"Mentai", desc:"Lezat", price:22000 }
];

let currentUser = null;
let currentItem = null;
let cart = [];

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function renderMenu(data) {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = data.map(m => `
    <div class="menu-card" onclick="openDetail(${m.id})">
      <h3>${m.name}</h3>
      <p>${m.desc}</p>
      <p>Rp ${m.price}</p>
    </div>
  `).join('');
}

function openDetail(id) {
  currentItem = menuData.find(m => m.id === id);
  document.getElementById('detail-name').textContent = currentItem.name;
  document.getElementById('detail-desc').textContent = currentItem.desc;
  document.getElementById('detail-price').textContent = "Rp " + currentItem.price;
  showScreen('detail');
}

function filterMenu() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const filtered = menuData.filter(m => m.name.toLowerCase().includes(q));
  renderMenu(filtered);
}

function doLogin() {
  const email = document.getElementById('login-email').value;
  currentUser = { email };
  alert("Login berhasil");
  showScreen('home');
}

function doRegister() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-pass').value;

  fetch('register.php', {
    method: 'POST',
    body: new URLSearchParams({ name, email, password })
  })
  .then(res => res.text())
  .then(res => {
    if (res === "success") {
      alert("Register berhasil");
      showScreen('login');
    } else if (res === "email_exists") {
      alert("Email sudah digunakan");
    } else {
      alert("Error");
    }
  });
}
function doLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-pass').value;

  fetch('login.php', {
    method: 'POST',
    body: new URLSearchParams({ email, password })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === "success") {
      currentUser = res;
      alert("Login berhasil");
      showScreen('home');
    } else {
      alert("Login gagal");
    }
  })
  .catch(() => alert("Error server"));
}
function doLogout() {
  fetch('logout.php')
  .then(() => {
    currentUser = null;
    alert("Logout berhasil");
    showScreen('home');
  });
}
function payNow(total) {
  if (!currentUser) {
    alert("Login dulu");
    return;
  }

  fetch('/api/create-transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: currentUser.id,
      total: total
    })
  })
  .then(res => res.json())
  .then(res => {

    window.snap.pay(res.snap_token, {
      onSuccess: function(result) {
        alert("Pembayaran sukses");
      },
      onPending: function(result) {
        alert("Menunggu pembayaran");
      },
      onError: function(result) {
        alert("Pembayaran gagal");
      }
    });

  });
}