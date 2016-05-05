/**
 * http://usejsdoc.org/
 */

var oracledb = require('oracledb');
var dbSettings = require('../dbSettings');

oracledb.getConnection(dbSettings.oracledbconfig, function(err, connection) {
	if (err) {
		console.error('Error connecting to Oracle SQL DB - ' + err);
		return;
	}

	console.log('Oracle DB Connection established');

	connection.execute(
			"select * from BANK_TRANS_ARTIVA where BANK_TRANS_ID = :id",
			[ 3811 ], // bind value for :id
			function(err, result) {
				if (err) {
					console.error(err.message);
					return;
				}

				console.log('Select All BANK_TRANS_ARTIVA data');
				console.log(result.rows);
				connection.release(  
				          function(err) {  
				               if (err) {console.error(err);}  
				          }  
				     );  
			});
});
