// Our custom widget which handles the tooltips and data attributes
$.widget('pagechangedemo.linkComparisonTool', {
	options: {
		"thisTable": null,
		"tableRows": null,
		"progressBar": ".comparison-progress-bar",
		"progressBarFull": ".comparison-progress-bar-full",
		"fillInPagesCompared": ".fillin-amount-pages-compared",
		"fillInTotalPagesCompared": ".fillin-total-pages-to-compare",
		"fillInPagesDNE": ".fillin-amount-pages-dne",
		"fillInPagesChanged": ".fillin-amount-pages-changed",
		"completedComparisons": 0,
		"pagesDNE": 0,
		"pagesChanged": 0
	},

	/**
	 * This function initializes our widget onto the table we've called it with and begins, row by row, analyzing
	 * URLs and their page contents
	 * @return {void}
	 */
	 _init: function() {
		// Basic init
		var state = this;
		state.options.thisTable = $(this.element[0]).find('.urlTable');
		state.options.tableRows = $(state.options.thisTable).children('tbody').children();
		var numRows = $(state.options.tableRows).length;

		$(state.options.fillInTotalPagesCompared).text(numRows);

		// Analyze pages
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
		if(rowUrl.length > 7) {
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q="+
				"select * from html where url='"+
				encodeURIComponent(rowUrl)+"'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", function(data) {
					var returnedPage = JSON.stringify(data.query.results);
					if(returnedPage) {
					// PAGE EXISTS
					
					// Render the checkbox to show it exists
					state.renderUrlExists(row, true);

					// MD5 the page data for later comparison
					currentMD5 = md5(returnedPage);

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
						// PAGE EXISTS AND STAYED THE SAME

						// Render the checkbox to show MD5 is the same
						state.renderMD5Comparison(row, "same");

						// Collapse - we don't care about unchanged pages
						$(row).hide('slow');
					} else {
						// PAGE EXISTS BUT DID NOT STAY THE SAME

						state.options.pagesChanged++;
						$(state.options.fillInPagesChanged).text(state.options.pagesChanged);

						// Render the checkbox to show MD5 is not the same
						state.renderMD5Comparison(row, "not same");
					}
				} else {
					// PAGE DOES NOT EXIST
					state.actionPageDNE(state, row);
				}

				state.actionCompleteAnalysis(state);
			}
			);
} else {
	state.actionPageDNE(state, row);
	state.actionCompleteAnalysis(state);
}
},

	/**
	 * This function is the set of actions performed each time a page is Not Found - the count of pages not found increases
	 * and output, the url exists? box is modified to display red, and the comparison box is grayed out with a question mark
	 * @param  {scope} state The scope holder
	 * @param  {[type]} row  The row to perform the action on
	 * @return void
	 */
	 actionPageDNE: function(state, row) {
	 	state.options.pagesDNE++;
	 	$(state.options.fillInPagesDNE).text(state.options.pagesDNE);

		// Render the checkbox to show it doesn't exist
		state.renderUrlExists(row, false);
		state.renderMD5Comparison(row, "unknown");
	},

	/**
	 * This function is the set of actions performed at the end of each analysis - increase completeComparisons, output 
	 * the amount of completed comparisons, and render the progress bar
	 * @param  {scope} state The scope holder
	 * @return void
	 */
	 actionCompleteAnalysis: function(state) {
	 	state.options.completedComparisons++;
	 	$(state.options.fillInPagesCompared).text(state.options.completedComparisons);
	 	state.renderProgressBar(state);
	 },

	/**
	 * This function moves the progress bar by checking how many pages have been compared versus the total amount of pages
	 * @param  {scope} state The scope holder
	 * @return void
	 */
	 renderProgressBar: function(state) {
	 	var numRows = $(state.options.tableRows).length;
	 	var currentPercent = state.options.completedComparisons / numRows * 100;
	 	$(state.options.progressBar).css('width', currentPercent+"%");

	 	if(numRows == state.options.completedComparisons)
	 		$(state.options.progressBarFull).removeClass('progress-striped');
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
	 * @param  {string} 	  isSame
	 * @return {void}
	 */
	 renderMD5Comparison: function(row, isSame) {
	 	switch(isSame) {
	 		case "same":
	 		$(row).children("td.url-md5compare").children('span')
	 		.children('i').attr('class', 'icon-ok');
	 		break;
	 		case "not same":
	 		$(row).children("td.url-md5compare").children('span').attr('class', 'badge badge-warning')
	 		.children('i').attr('class', 'icon-pencil');
	 		break;
	 		case "unknown":
	 		$(row).children("td.url-md5compare").children('span')
	 		.children('i').attr('class', 'icon-question-sign');
	 		break;
	 	}
	 }
	});