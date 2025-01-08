// required utilities
const express = require('express');
const bodyparse = require('body-parser');
const cookieparse = require('cookie-parser');
const path = require('path');
const app = express();
const dummy = require('./renderpage');

// to handle post requests
const thesql = require('./dbguy');
const hasher = require('./mekhash');
const thedb = require('./dbconnect');
const { log } = require('console');

// so that we can access post data and cookies
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));
app.use(cookieparse());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for index.html (dashboard)
app.get('/', (req, res) => {
    const curUser = req.cookies.curuserid;
    let tosend = 'buna.html';
    console.log(curUser);

    if (curUser != undefined && curUser != null) {
        log(curUser);
        tosend = 'index.html';
    } else {
        // If 'curuser' doesn't exist, redirect to login.html
        tosend = 'login.html';
    }

    res.sendFile(path.join(__dirname, 'public', tosend));
});

app.get('/login',(req,res) => {
	let tosend = 'login.html';
    res.sendFile(path.join(__dirname, 'public', tosend));
})

app.get('/register',(req,res) => {
	let tosend = 'signup.html';
    res.sendFile(path.join(__dirname, 'public', tosend));
})

app.get('/dash',(req,res) => {
	let pid = req.cookies.pid;

	if(pid){
		let xcode = `setCookie('curproject',${pid},20)`;

		res.send(dummy.myhtml(`loading project ${pid}`,'/showdash',200,xcode));
	} else {
		res.send(dummy.myhtml(`invalid project ID`,'/',1200));
	}
});

app.get('/showdash',(req,res) => {
	let curproject = req.cookies.curproject;

	if(curproject){
    	res.sendFile(path.join(__dirname, 'public', 'dash.html'));
	} else {
		res.send(dummy.myhtml(`choose a project first`,'/',400));
	}
})

app.get('/deleteproject',(req,res) => {
	let pid = req.cookies.pid;
	let userid = req.cookies.curuserid;

	if(userid){
		if(pid){
			let delquery = `select * from projects where id=${pid} and userid=${userid}`;

			thedb.query(delquery,(err,queryres) => {
				if(err) throw err;

				let xcode = `deleteCookie('pid')`;
				if(queryres.length == 0){
					res.send(dummy.myhtml(`no project found`,'/',1200,xcode));
				} else {
					delquery = `delete from projects where id=${pid}`;

					thedb.query(delquery,(err2,queryres2) => {
						if(err2) throw err2

						res.send(dummy.myhtml(`project deleted successfully`,'/',1200,xcode));
					})
				}

			})
		} else {
			res.send(dummy.myhtml(`invalid project ID, ${pid}`,'/',1200));
		}
	} else {
		res.send(dummy.myhtml(`start a session first`,'/',1200));
	}
});

// [post data stuff]-----------------------------------------------------------

app.post('/startsession',(req,res) => {
    const { uname, upass } = req.body; // Extract 'uname' and 'upass' from POST data
	let tosend = 'trying to log in';

	if (uname && upass) {
		// res.send(`Username: ${uname}, Password: ${upass}`);

		// setup the query
		let thepw = hasher.customhash(upass);
		let checkquery = `SELECT * FROM users WHERE username='${uname}'`;
		// run the query

		thedb.query(checkquery,(err,results) => {
			if(err) throw err;

			if (results.length == 0) {
				// user not found
				tosend = 'Invalid username, Try again';
				tosend = dummy.myhtml(tosend,'/login');
				res.send(tosend);
			} else {
				let phash = results[0].password_hash;

				if(phash != thepw){
					tosend = 'Incorrect password, Try again';
					tosend = dummy.myhtml(tosend,'/login');
					res.send(tosend);
				} else {
					// get results
					let userid = results[0]['id'];
					let extracode = `
					setCookie('curuserid',\`${userid}\`);
					`;

					tosend = dummy.myhtml('login successful, starting your session','/',2000,extracode);
					res.send(tosend);
				}
			}
		});

	} else {
		res.status(400).send('Missing username or password <a href="/login">try again</a>');
	}
})

app.post('/addproject',(req,res) => {
	let theid = req.body.userid;
	let pname = req.body.p_name.replaceAll("\'","⊹");
	let pdesc = req.body.p_desc.replaceAll("\'","⊹");;

	if(theid != null){
		// set the default process
		let payload = '[{"cantdelete":"yes","title":"main process","type":"process list","content":"f|add tasks here_#dvdr#_f|task 1_#dvdr#_f|task 2"}]';
		let startdata = JSON.stringify(payload);
		let getdataquery = `INSERT INTO projects (projectname,projectdesc,userid,projectdata) VALUES ('${pname}','${pdesc}','${theid}',${startdata})`;

		thedb.query(getdataquery,(err,results) => {
			if(err) throw err;

			res.send(dummy.myhtml('new project added successfully','/',2500));
		})
	} else {
		res.send('[]');
	}
})

app.post('/mekuser',(req,res) => {
	let uname = req.body.uname;
	let upass = req.body.upass;
	let showtxt = "invalid data passed, try again";

	if(uname && upass){
		// check if username exists
		let thequery = `SELECT * FROM users WHERE username = '${uname}'`;

		thedb.query(thequery,(err1,results1) => {
			if(err1) throw err1

			if(results1.length > 0){
				// return error if it does
				showtxt = 'User already exists';
				res.send(dummy.myhtml(showtxt,'/register',700));
			} else {
				// add to db if it doesnt
				let safepass = hasher.customhash(upass);
				showtxt = 'Adding new user';
				thequery = `INSERT INTO users (username,password_hash) VALUES ('${uname}','${safepass}')`;

				thedb.query(thequery,(err2,results2) => {
					if(err2) throw err2

					showtxt = 'New user added successfully, log in to access your account';
					res.send(dummy.myhtml(showtxt,'/login',700));
				})
			}
		})
		// redirect to login if successful and signup if otherwise
	} else {
		res.send(dummy.myhtml(showtxt,'/register',700));
	}
})

// [API based requests]--------------------------------------------------------
app.post('/getuserdata',(req,res) => {
	let theid = req.body.userid;

	if(theid != null){
		let getdataquery = `SELECT id,username,datecreated FROM users WHERE id = ${theid}`;

		thedb.query(getdataquery,(err,results) => {
			if(err) throw err;

			res.send(JSON.stringify(results));
		})
	} else {
		res.send('[]');
	}
})

// list my projects API
app.post('/getprojects',(req,res) => {
	let theid = req.body.userid;

	if(theid != null){
		let getdataquery = `SELECT * FROM projects WHERE userid = ${theid}`;

		thedb.query(getdataquery,(err,results) => {
			if(err) throw err;

			res.send(JSON.stringify(results));
		})
	} else {
		res.send('[]');
	}
})

// get current project API
app.post('/getproject',(req,res) => {
	let theid = req.body.pid;

	if(theid != null){
		let getdataquery = `SELECT * FROM projects WHERE id = ${theid}`;

		thedb.query(getdataquery,(err,results) => {
			if(err) throw err;

			res.send(JSON.stringify(results));
		})
	} else {
		res.send('[]');
	}
})

// save a project
app.post('/saveproject',(req,res) => {
	let payload = req.body.payload.split('_#server_.side_.divider#_');
	let theid = payload[0];
	let thedata = payload[1];

	res.status = 202;

	if(theid && thedata){
		let getdataquery = `SELECT * FROM projects WHERE id = ${theid}`;

		thedb.query(getdataquery,(err,results) => {
			if(err) throw err;

			if(results.length == 0){
				res.send('project not found')
			} else {
				let cleanjson = JSON.stringify(thedata);
				let setdataquery = `UPDATE projects SET projectdata = ${cleanjson}, dateupdated = CURRENT_TIMESTAMP() WHERE id=${theid}`;

				thedb.query(setdataquery,(err2,results2) => {
					if(err2) throw err2

					res.status = 200;
					res.send('project saved successfully');
				})
			}
		})
	} else {
		if(!theid){
			res.send(`invalid ID [${theid}]`);
		} else {
			res.send(`missing data [${thedata}]`);
		}
	}
});

// Set the app to listen on a specific port
const PORT = process.env.PORT || 4700;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
