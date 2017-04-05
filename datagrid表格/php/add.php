<?php 
	require 'config.php';
	$term_addr = $_POST['term_addr'];
	$term_name = $_POST['term_name'];
	$phoneNo = $_POST['phoneNo'];
	$simNo = $_POST['simNo'];
	$ip = $_POST['ip'];
	$term_status = $_POST['term_status'];
	$create_man = $_POST['create_man'];
	$create_date = $_POST['create_date'];
	$is_valid = $_POST['is_valid'];
	$term_asset_no = $_POST['term_asset_no'];
	$term_manufacturer_type = $_POST['term_manufacturer_type'];
	$term_pro = $_POST['term_pro'];
	$phase = $_POST['phase'];
	$pemarks = $_POST['pemarks'];
	$customer_id = $_POST['customer_id'];
	$term_manufacturer = $_POST['term_manufacturer'];
	mysql_query(" INSERT INTO data (term_addr,term_name,phoneNo,simNo,ip,term_status,create_man,create_date,is_valid,term_asset_no,term_manufacturer_type,term_pro,phase,pemarks,customer_id,term_manufacturer) VALUES('$term_addr','$term_name','$phoneNo','$simNo','$ip','$term_status','$create_man','$create_date','$is_valid','$term_asset_no','$term_manufacturer_type','$term_pro','$phase','$pemarks','$customer_id','$term_manufacturer') ");
	echo mysql_affected_rows();
	mysql_close();
 ?>