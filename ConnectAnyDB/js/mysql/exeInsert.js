/**
 * http://usejsdoc.org/
 */

var mysql = require('mysql');
var dbSettings = require('../dbSettings');

var connecton = mysql.createConnection(dbSettings.mysqldbconfig);

connecton.connect();

var employee = {
		id : 6,
		name: 'Amit Kumar123',
		doj : '05-03-2015',
		salary : 4000		
};

var insertSql = connecton.query(' insert into employee set ?' , employee, function (err, result) {
	
	if(err) {
		console.error(err);
		return;
	}
	console.log(result);
	return result;
	
});