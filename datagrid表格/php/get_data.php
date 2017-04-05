<?php
	require 'config.php';
	$id = $_POST['term_id'];
	$query = mysql_query("SELECT term_id,term_addr,term_name,phoneNo,simNo,ip,term_status,create_man,create_date,is_valid,term_asset_no,term_manufacturer_type,term_pro,phase,pemarks,customer_id,term_manufacturer FROM data WHERE term_id='$id'") or die('SQL 错误！');
	$json = '';
	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}
	$json = substr($json, 0, -1);
	echo '['.$json.']';
	mysql_close();
?>