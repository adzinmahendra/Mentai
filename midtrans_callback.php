<?php
include 'config.php';

/* ambil data dari midtrans */
$json = file_get_contents("php://input");
$data = json_decode($json, true);

$order_id = $data['order_id'];
$status = $data['transaction_status'];

/* update status */
$conn->query("UPDATE orders SET status='$status' WHERE id=$order_id");