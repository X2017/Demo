<?php
	//sleep(3);
	require 'config.php';
	
	//$q = $_POST['q'] ? $_POST['q'] : '';
	
	$id = 0;
	
	if (isset($_POST['id'])) {
		$id = $_POST['id'];
	}
	
	$query = mysql_query("SELECT id,text,state FROM think_nav WHERE tid='$id'") or die('SQL 错误！');

	
	$json = '';
	
	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}

	$json = substr($json, 0, -1);
	echo '['.$json.']';
	mysql_close();
?>