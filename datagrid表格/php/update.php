<?php 
	require 'config.php';
	$row = $_POST['row'];
	$id = $row['id'];
	$name = $row['name'];
	$content = $row['content'];
	$date = $row['date'];
	mysql_query(" UPDATE data SET name='$name', content='$content', date='$date' WHERE id='$id' ");
	echo mysql_affected_rows();
	mysql_close();
 ?>