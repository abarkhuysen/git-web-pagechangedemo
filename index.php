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
	<div class="container-fluid linkComparisonTool">
		<div class="row-fluid explanation">
			<h1>This is a demo <small>showcasing a method of checking web pages for changes over time</small></h1>
			<span>
				This demo showcases a method to check if pages are available, and have changed since last check. It 
				uses AJAX and Yahoo's query api to query a page for its source content, which it then MD5 hashes
				and compares to the last MD5 hash. Hashes can be saved by clicking on the yellow 'Pencil' icon
				to the right.
			</span>
		</div>
		<div class="row-fluid">
			<div class="span12">
				<div class="comparison-progress-bar-full progress progress-striped active">
					<div class="comparison-progress-bar bar" style="width: 0%;"></div>
				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span4">
				<span class="fillin-amount-pages-compared">0</span> / <span class="fillin-total-pages-to-compare">0</span> pages compared.
			</div>
			<div class="span4">
				<span class="fillin-amount-pages-dne">0</span> pages not found.
			</div>
			<div class="span4">
				<span class="fillin-amount-pages-changed">0</span> pages changed.
			</div>
		</div>
		<div class="row-fluid">
			<div class="span12">
				<table class="table urlTable">
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
						foreach($links as $index=>$link) {
							echo "<tr data-id='".$link->id."' data-url='".$link->url."' data-md5hash='".$link->md5hash."'>";
							echo "<td>".($index+1)."</td>";
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
$(".linkComparisonTool").linkComparisonTool();
</script>