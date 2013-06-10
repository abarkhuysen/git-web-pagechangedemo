<?php
// Checks for POST data from AJAX
if(isset($_POST['fn'])) {
	switch($_POST['fn']) {
		case 'assignMD5hash': 
			// Safely retrieves POST data to be sent to SQL table
			$rowID = isset($_POST['rowID']) ? $_POST['rowID'] : null;
			$hash = isset($_POST['hash']) ? $_POST['hash'] : "";

			// Assigns the MD5 has to the SQL table
			assignMD5hash($rowID, $hash);
			break;
		case 'getLinkData':
			getLinks('json', 'echo');
		default:
			break;
	}
}

/**
 * This function is a simple SELECT *, pulling data all data from the table. Its parameters determine the output type (e.g.
 * you can request 'json', 'echo' for AJAX retrieval, or 'json', 'return' for simple PHP retrieval)
 * @param  string $outputType 	The type of output format type - 'raw' or 'json'
 * @param  string $outputSource The output source - 'return' (for PHP retrieval) or 'echo' (for AJAX retrieval)
 * @param  string $filter 		Any additional filters as WHERE xxxxxxxx statements
 * @return [json/raw SQL] 		The SQL data as filtered and formatted per specification
 */
function getLinks($outputType = "json", $outputSource = "return", $filter = "") {
	// Establish connection
	$link = mysql_connect('localhost', 'root', '');
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}

	// Query server
	$result = mysql_query('SELECT * FROM pagechangedemo.links '.$filter);
	$resultArr = array();

	// Collect data
	while ($row = mysql_fetch_assoc($result)) {
		$resultArr[] = $row;
	}

	// Close connection
	mysql_close($link);

	// Format data (json or raw)
	switch($outputType) {
		case "json":
			$resultArr = json_encode($resultArr);
			break;
		case "raw":
			break;
		default:
			break;
	}

	// Return data (echo or return)
	switch($outputSource) {
		case "return":
			return $resultArr;
			break;
		case "echo":
			echo $resultArr;
			break;
		default:
			break;
	}

	// Default return
	return null;
}

/**
 * Sets the MD5 hash of a URL in the links table
 * @param  int 		$id 	The SQL id whose MD5 hash will be modified
 * @param  string 	$md5 	The MD5 hash to update to
 * @return void
 */
function assignMD5hash($id = null, $md5 = "") {
	// Establish connection
	$link = mysql_connect('localhost', 'root', '');
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}

	// Update MD5 hash
	if($id != null)
		$result = mysql_query("UPDATE pagechangedemo.links SET md5hash='".$md5."' WHERE id='".$id."'");

	// Close connection
	mysql_close($link);
}
?>