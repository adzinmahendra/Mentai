import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) {
    return res.status(401).json({ status: 'fail' });
  }

  if (data.password !== password) {
    return res.status(401).json({ status: 'wrong_password' });
  }

  res.status(200).json({
    status: 'success',
    user: {
      id: data.id,
      name: data.name,
      email: data.email
    }
  });
}
function doLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-pass').value;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'success') {
      localStorage.setItem('user', JSON.stringify(res.user));
      currentUser = res.user;
      alert('Login berhasil');
      showScreen('home');
    } else {
      alert('Login gagal');
    }
  });
}
const savedUser = localStorage.getItem('user');
if (savedUser) {
  currentUser = JSON.parse(savedUser);
}
function doLogout() {
  localStorage.removeItem('user');
  currentUser = null;
  alert('Logout');
  showScreen('home');
}