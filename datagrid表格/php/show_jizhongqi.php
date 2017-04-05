<?php 
	require 'config.php';
	$page = $_POST['page']; //显示数据大小 page 1
	$pageSize = $_POST['rows']; //下拉分页 rows 6
	$first = $pageSize * ($page - 1);
	// $sort = $_POST['sort'];//排序 
	// $order = $_POST['order'];
	$sql = '';
	$name = '';
	//查询
	if (isset($_POST['name']) && !empty($_POST['name'])) {
		$name = "name LIKE '%{$_POST['name']}%' AND ";
		$sql .= $name;
	}
	if (!empty($sql)) {
		$sql = 'WHERE '.substr($sql, 0,-4);
	}
	$query = mysql_query("SELECT id,name_id,name FROM jizhongqi $sql LIMIT $first,$pageSize"); // ORDER BY $sort $order排序 
	$count = mysql_num_rows(mysql_query("SELECT id,name_id,name FROM jizhongqi $sql")); // 查询所有数据
	$json = '';
	while (!!$row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}
	$json = substr($json, 0, -1);
	echo '{"total":'.$count.',"rows":['.$json.']}';
	mysql_close();
 ?>