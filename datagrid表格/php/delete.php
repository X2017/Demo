<?php 
	require 'config.php';
	$delete_id = $_POST['delete_id'];
	$query = mysql_query("DELETE FROM data WHERE term_id IN ($delete_id)");
	echo mysql_affected_rows();
	mysql_close();
 ?>