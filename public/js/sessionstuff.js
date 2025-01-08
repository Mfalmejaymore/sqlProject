function makebacker() {
	let over = document.createElement('div');
	let thebtn = document.createElement('a');

	over.className = "backoverlay";
	thebtn.className = "themebtn w3-hover-blue w3-light-grey";
	thebtn.innerHTML = `<i class="fa fa-chevron-left"></i> back`;
	thebtn.href = "javascript:history.back()";

	over.appendChild(thebtn);
	document.body.appendChild(over);
}

// check cookies
function getCookie(name) {
	let cookieArr = document.cookie.split(';');

	for(let i = 0; i < cookieArr.length; i++) {
		let cookie = cookieArr[i].trim();
		// Check if the cookie's name matches
		if (cookie.indexOf(name + '=') == 0) {
			return cookie.substring(name.length + 1);
		}
	}

	return null;
}

// set cookies
function setCookie(cookieName, cookieValue, daysToExpire) {
	daysToExpire = daysToExpire == undefined ? 5 : daysToExpire;
	if (getCookie(cookieName)) {
		console.log("Cookie with the name '" + cookieName + "' already exists.");
		return;
	}
	
	const date = new Date();
	date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000)); // Set expiration in days
	const expires = "expires=" + date.toUTCString();
	document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";" + expires + ";path=/";
}

function setCookies(cookiesObj, daysToExpire) {
	for(let [cookiename, cookieval] of cookiesObj){
		setCookie(cookiename,cookieval, daysToExpire);
	}
}

// delete cookies
function deleteCookie(name) {
	if (document.cookie.split('; ').find(row => row.startsWith(name + '='))) {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		console.log(`Cookie '${name}' deleted.`);
	} else {
		console.log(`Cookie '${name}' does not exist.`);
	}
}

// Check if 'curuser' cookie exists
function checksession() {

	if (getCookie('curuser') == null) {
		window.location.href = 'login.html';
	} else {
		// alert(getCookie('curuser'));
	}
}

// session data
function getUserData() {
	return new Promise((resolve, reject) => {
		// for promises remember resolve = good (it worked), reject = bad (it failed)

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/getuserdata', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // so that we can send it well

		// Set up the onload handler
		xhr.onload = function() {
			if (xhr.status >= 200 && xhr.status < 300) {
				let theres = JSON.parse(xhr.responseText);
				resolve(theres[0]);
			} else {
				reject(`Request failed with status: ${xhr.status}`);
			}
		};

		// for network issues
		xhr.onerror = function() {
			reject('Request failed');
		};

		// Send the request with the data in the body (URL encoded)
		xhr.send(`userid=${getCookie('curuserid')}`);
	});
}

function getMyProjects() {
	return new Promise((resolve, reject) => {
		// for promises remember resolve = good (it worked), reject = bad (it failed)

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/getprojects', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // so that we can send it well

		// Set up the onload handler
		xhr.onload = function() {
			if (xhr.status >= 200 && xhr.status < 300) {
				let theres = JSON.parse(xhr.responseText);
				resolve(theres);
			} else {
				reject(`Request failed with status: ${xhr.status}`);
			}
		};

		// for network issues
		xhr.onerror = function() {
			reject('Request failed');
		};

		// Send the request with the data in the body (URL encoded)
		xhr.send(`userid=${getCookie('curuserid')}`);
	});
}

function getProject(n) {
	return new Promise((resolve,reject) => {
		let xhr = new XMLHttpRequest;

		xhr.open('POST','/getproject',true);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

		xhr.onload = () => {
			if(xhr.status == 200 || xhr.status < 300){
				resolve(xhr.responseText);
			} else {
				reject(xhr.status)
			}
		}

		xhr.onerror = () => {
			reject('an error occured');
		}
		xhr.send(`pid=${n}`);
	});
}

function saveProject(n,data) {
	return new Promise((resolve,reject) => {
		let xhr = new XMLHttpRequest;

		xhr.open('POST','/saveproject',true);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

		xhr.onload = () => {
			if(xhr.status == 200 || xhr.status < 300){
				resolve(xhr.responseText);
			} else {
				reject(xhr.status)
			}
		}

		xhr.onerror = () => {
			reject('an error occured');
		}
		xhr.send(`payload=${n}_#server_.side_.divider#_${data}`);
	});
}

function logmeout() {
	deleteCookie('curuserid');
	deleteCookie('curproject');

	window.location.assign('/');
}
