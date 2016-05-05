/**
 * http://usejsdoc.org/
 */

var mssql = require('mssql');
var dbSettings = require('../dbSettings');

var mssqlConnection = new mssql.Connection(dbSettings.mssqldbconfig);
var request = new mssql.Request(mssqlConnection);

mssqlConnection.connect(function(err) {
	if (err) {
		console.log('Error connecting to MS SQL DB - ' + err);
		return;
	} else {

		console.log('MS SQL DB Connection established');
		getAll();

	}

});

/**
 * Get All records from table
 */
function getAll() {
	request.query('select * from dbo.category where category in (1,2,3,4)',
			function(err, result) {
				if (err) {
					console.error(err);
				} else {
					console.log('Select All category log');
					console.log(result);
				}
				mssqlConnection.close();
			});
}
