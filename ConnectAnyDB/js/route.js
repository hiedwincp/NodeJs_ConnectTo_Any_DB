/**
 * http://usejsdoc.org/
 */

var express = require('express');
var router = express.Router();

var oracledb = require('oracledb');
var dbSettings = require('./dbSettings');
var oracleConnection = {};

var employeeList = {};
var categoryList = {};
var bankTransctionList = {};

var bankTransctionInYear2014 = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
var bankTransctionInYear2015 = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
var bankTransctionInYear2016 = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];

var bankTransctionAmtInYear2014 = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
var bankTransctionAmtInYear2015 = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
var bankTransctionAmtInYear2016 = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];

oracledb
.getConnection(
		dbSettings.oracledbconfig,
		function(err, connection) {
			if (err) {
				console.error('Error connecting to Oracle SQL DB - '
						+ err);
				oracleConnection = null;
				return null;
			}

			console.log('Oracle DB Connection established');
			oracleConnection = connection;

		});



router.get('/', function(req, res) {

	readAllBankRecords(res);

});


/**
 * Get All records from table BANK_TRANS_ARTIVA  in OracleL DB
 */
function readAllBankRecords(res) {
	oracleConnection.execute(
					"select to_char(BANK_TRANS_DATE,'YYYY-MM'), count(*), sum(BANK_TRANS_AMOUNT)  " +
					"from BANK_TRANS_ARTIVA group by to_char(BANK_TRANS_DATE,'YYYY-MM') " +
					"order by to_char(BANK_TRANS_DATE,'YYYY-MM')",
			function(err, result) {
				if (err) {
					console.error(err);
					return;
				}

				console
						.log('Select All BANK_TRANS_ARTIVA data');
				
				for (var i = 0; i < result.rows.length; i++) {
					var yearMonth = result.rows[i][0];					
					var numberOfTransaction = result.rows[i][1];
					var totalTransactionAmount = result.rows[i][2];
					
					var year = parseInt(yearMonth.substring(0, 4));
//					console.log("year " + year);
					var month = parseInt(yearMonth.substring(5, 7));
//					console.log("month " + yearMonth.substring(5, 7));
					
					switch (year) {
				    
					case 2014:
				    	bankTransctionInYear2014[month-1] = numberOfTransaction;
				    	bankTransctionAmtInYear2014[month-1] = totalTransactionAmount;
				    	break;
				    
					case 2015:
				    	bankTransctionInYear2015[month-1] = numberOfTransaction;
				    	bankTransctionAmtInYear2015[month-1] = totalTransactionAmount;
				    	break;
				    
					case 2016:
				    	bankTransctionInYear2016[month-1] = numberOfTransaction;
				    	bankTransctionAmtInYear2016[month-1] = totalTransactionAmount;
				    	break;
					}
				
				}		
				
				res.render('index', {
					title : 'Connect Oracle DB App',
					bankTransctionList : result.rows,
					bankTransctionInYear2014 : bankTransctionInYear2014,
					bankTransctionInYear2015 : bankTransctionInYear2015,
					bankTransctionInYear2016 : bankTransctionInYear2016,
					bankTransctionAmtInYear2014 : bankTransctionAmtInYear2014,
					bankTransctionAmtInYear2015 : bankTransctionAmtInYear2015,
					bankTransctionAmtInYear2016 : bankTransctionAmtInYear2016
				});
								
			});
}


module.exports = router;
