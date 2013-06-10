<?php
// Let's get our SQL data!
include "lib/sql.php";
?>
<html>
<head>
	<script type="text/javascript" src="js/jquery/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui/ui/jquery-ui.js"></script>
	<script type="text/javascript" src="js/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/md5.js"></script>
	<script type="text/javascript" src="js/app.js"></script>

	<link rel="stylesheet" type="text/css" href="css/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/app.css">
</head>
<body>
	<div class="container-fluid">
		<div class="row-fluid">
			<h1>This is a demo <small>showcasing a method of checking web pages for changes over time</small></h1>
			<span>
				Explanation
			</span>
		</div>
		<div class="row-fluid">
			<div class="span12">
				<table class="table linkTable">
					<thead>
						<tr>
							<td><h4>#</h4></td>
							<td><h4>URL</h4></td>
							<td><h4>Exists?</h4></td>
							<td><h4>Changed?</h4></td>
						</tr>
					</thead>
					<tbody>
						<?php
						// Decode the table data (returned in JSON) and output
						$links = json_decode(getLinks("json", "return"));
						foreach($links as $link) {
							echo "<tr data-id='".$link->id."' data-url='".$link->url."' data-md5hash='".$link->md5hash."'>";
							echo "<td>".$link->id."</td>";
							echo "<td><a href='".("http://".$link->url)."'>".$link->url."</a></td>";
							echo "<td class='url-status'><span class='badge'><i class='icon-refresh'></i></span></td>";
							echo "<td class='url-md5compare'><span class='badge'><i class='icon-refresh'></i></span></td>";
							echo "</tr>";
						}
						?>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</body>
</html>

<script type="text/javascript">
// Initialize the 'linkTable' widget onto the '.linkTable' table, triggering the beginning of data collection and comparison
$(".linkTable").linkTable();
</script>