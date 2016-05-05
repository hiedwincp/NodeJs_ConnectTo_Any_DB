/**
 * http://usejsdoc.org/
 */

var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var mssql = require('mssql');
var oracledb = require('oracledb');

var dbSettings = require('./dbSettings');

var mysqlConnecton = mysql.createConnection(dbSettings.mysqldbconfig);
mysqlConnecton.connect(function(err) {
	if (err) {
		console.log('Error connecting to My SQL DB - ' + err);
		return;
	}
	console.log('Connection established with My SQL DB');
});

var mssqlConnection = new mssql.Connection(dbSettings.mssqldbconfig);
var request = new mssql.Request(mssqlConnection);
mssqlConnection.connect(function(err) {
	if (err) {
		console.log('Error connecting to MS SQL DB - ' + err);
		return;
	}
	console.log('Connection established with MS SQL DB');
});


var oracleConnection = {};

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


var employeeList = {};
var categoryList = {};
var bankTransctionList = {};

var bankTransctionInYear2014 = [null, null, null, null, null, null, null, null, null, null, null, null];
var bankTransctionInYear2015 = [null, null, null, null, null, null, null, null, null, null, null, null];
var bankTransctionInYear2016 = [null, null, null, null, null, null, null, null, null, null, null, null];



router.get('/', function(req, res) {

//	readAllEmployees(res);
//	readAllCategory(res);
	readAllBankRecords(res);

});


/**
 * Get All records from table BANK_TRANS_ARTIVA  in OracleL DB
 */
function readAllBankRecords(res) {
	oracleConnection.execute(
					"select to_char(BANK_TRANS_DATE,'YYYY-MM'), count(*)  " +
					"from BANK_TRANS_ARTIVA group by to_char(BANK_TRANS_DATE,'YYYY-MM') " +
					"order by to_char(BANK_TRANS_DATE,'YYYY-MM')",
			function(err, result) {
				if (err) {
					console.error(err);
					return;
				}

				console
						.log('Select All BANK_TRANS_ARTIVA data');
				console.log(result.rows);
				
				for (var i = 0; i < result.rows.length; i++) {
					var yearMonth = result.rows[i][0];
					var numberOfTransaction = result.rows[i][1];
					
					var year = parseInt(yearMonth.substring(0, 4));
					var month = parseInt(yearMonth.substring(6, 7));
					switch (new Date().getDay()) {
				    case 2014:
				    	
				    case 2015:
				    	
				    case 2016:
					}
					
					bankTransctionInYear2014[month] = numberOfTransaction;
//				  console.log("Id : "+result.rows[i][0]);
//				  console.log("Name : "+result.rows[i][1]);
				};
				
				var bankTransctionMapInYear = []; 
				var bankTransctionLMapPerMonth = []; 
				
				dict.push({
				    key:   "keyName",
				    value: "the value"
				});

				
				
				res.render('index', {
					title : 'Connect Oracle DB App',
					bankTransctionList : result.rows,
					employeeList : {},
					categoryList : {}
				});
								
			});
}


/**
 * Get All records from table employee in My SQL DB
 */
function readAllEmployees(res) {
	mysqlConnecton.query('select * from employee ', function(err, result) {
		if (err) {
			console.error(err);
		} else {
			console.log("Select All Employees Success");
			res.render('index', {
				title : 'Connect My SQL DB App',
				employeeList : result,
				categoryList : {},
				bankTransctionList : {}
			});

		}
	});
}

/**
 * Get All records from table dbo.category in MS SQL DB
 */
function readAllCategory(res) {
	request.query('select * from dbo.category where category in (1,2,3,4)',
			function(err, result) {
				if (err) {
					console.error(err);
				} else {
					console.log('Select All category success ');
					res.render('index', {
						title : 'Connect MS SQL DB App',
						categoryList : result,
						employeeList : {},
						bankTransctionList : {}
					});
				}
			});
}




router.post('/add', function(req, res) {

	var employee = {};
	employee.id = req.body.id;
	employee.name = req.body.name;
	employee.doj = req.body.doj;
	employee.salary = req.body.salary;

	mysqlConnecton.query(' insert into employee set ?', employee, function(err,
			result) {

		if (err) {
			console.error(err);
			res.redirect('/');
		}
		console.log(result);
		console.log("Insert is Success");
		readAllEmployees(res);
		res.redirect('/');

	});

});

module.exports = router;
