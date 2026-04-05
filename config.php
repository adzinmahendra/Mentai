<?php
$conn = new mysqli("localhost", "root", "", "mentai_yammy");

if ($conn->connect_error) {
  die("Koneksi gagal");
}
?>