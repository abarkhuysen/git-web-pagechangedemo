// Our custom widget which handles the tooltips and data attributes
$.widget('pagechangedemo.linkTable', {
	identities: {
		"thisTable": null,
		"tableRows": null
	},

	/**
	 * This function initializes our widget onto the table we've called it with and begins, row by row, analyzing
	 * URLs and their page contents
	 * @return {void}
	 */
	_init: function() {
		var state = this;
		state.options.thisTable = this.element[0];
		state.options.tableRows = $(state.options.thisTable).children('tbody').children();

		$(state.options.tableRows).each(function(index, row){
			state.analyzePage(row);
		});
	},

	/**
	 * This is our master comparison. First, we get the details of the row we're analyzing (SQL id, old MD5, row url). Next,
	 * it attempts to retrieve the page data and marks the result in the Exists? checkbox. Finally, it compares the MD5 of
	 * the page data with the old MD5 of the same page data and marks the result in the Changed? column
	 * @param  {DOM Element} row
	 * @return {void}
	 */
	analyzePage: function(row)
	{
		// Get the details of the row we're analyzing
		var state = this;
		var rowUrl = "http://"+$(row).attr('data-url');
		var rowID = $(row).attr('data-id');
		var oldMD5 = $(row).attr('data-md5hash');

		// Attempt to retrieve the page data
		$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22"+
			encodeURIComponent(rowUrl)+"%22&format=json'&callback=?", function(data) {
				if(data.results[0]) {
					// Page data successfully retrieved
					
					// Render the checkbox to show it exists
					state.renderUrlExists(row, true);

					// MD5 the page data for later comparison
					currentMD5 = md5(data.results[0]);

					// Store the MD5 of the page data
					// NOTE: This to be added to a button
					$.ajax({
						type: "POST",
						url: "lib/sql.php",
						data: {
							fn: "assignMD5hash",
							rowID: rowID,
							hash: currentMD5
						}
					});

					// Compare the MD5s
					if(oldMD5 == currentMD5) {
						// Render the checkbox to show MD5 is the same
						state.renderMD5Comparison(row, true);
					} else {
						// Render the checkbox to show MD5 is not the same
						state.renderMD5Comparison(row, false);
					}
				} else {
					// Page data NOT successfully retrieved

					// Render the checkbox to show it doesn't exist
					state.renderUrlExists(row, false);
				}
			}
			);
	},

	/**
	 * This function renders the Exists? badges to show whether a page exists or not
	 * @param  {DOM Element} row
	 * @param  {Boolean} 	 exists
	 * @return {void}
	 */
	renderUrlExists: function(row, exists) {
		if(exists) {
			$(row).children("td.url-status").children('span').attr('class', 'badge badge-success')
			.children('i').attr('class', 'icon-ok');
		} else {
			$(row).children("td.url-status").children('span').attr('class', 'badge badge-important')
			.children('i').attr('class', 'icon-remove');
		}
	},

	/**
	 * This function renders the Changed? badges to show whether a page has been changed or not
	 * @param  {DOM Element}  row
	 * @param  {Boolean} 	  isSame
	 * @return {void}
	 */
	renderMD5Comparison: function(row, isSame) {
		if(isSame) {
			$(row).children("td.url-md5compare").children('span')
			.children('i').attr('class', 'icon-ok');
		} else {
			$(row).children("td.url-md5compare").children('span').attr('class', 'badge badge-warning')
			.children('i').attr('class', 'icon-pencil');
		}
	}
});