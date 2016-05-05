/**
 * http://usejsdoc.org/
 */

var mysql = require('mysql');
var dbSettings = require('../dbSettings');

var connecton = mysql.createConnection(dbSettings.mysqldbconfig);

connecton.connect(function(err) {
	if (err) {
		console.log('Error connecting to Db');
		return;
	}
	console.log('Connection established');
});


var selectAll = connecton.query('select * from employee ',
		function(err, result) {
			if (err) {
				console.error(err);
			} else {
				console.log('Select All ids');
				console.log(result);
				/*for (var i = 0; i < result.length; i++) {
					  console.log("Id : "+result[i].id);
					  console.log("Name : "+result[i].name);
					};*/
			}
			return result;
		});

var id = '4';
var selectById = connecton.query('select * from employee where id =? ', id,
		function(err, result) {
			if (err) {
				console.error(err);
			} else {
				console.log('Select by id = ' + id);
				console.log(result);
			
			}
			return result;
		});

connecton.end(function(err) {
	// The connection is terminated gracefully
	// Ensures all previously enqueued queries are still
	// before sending a COM_QUIT packet to the MySQL server.
});
