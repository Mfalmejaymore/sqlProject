
// const swmode = document.querySelectorAll('.switchmode');
const now = new Date();
const currentHour = now.getHours();
const currentMinutes = now.getMinutes();

function isNightTime(hour, minutes) {
	const currentTimeInMinutes = hour * 60 + minutes;
	const startNight = 19 * 60 + 30; // 7:30 PM
	const endNight = 6 * 60 + 30; // 6:30 AM

	// Check if current time is within the range
	return currentTimeInMinutes >= startNight || currentTimeInMinutes < endNight;
}


// for switching modes
function switchmode(what) {
	let htm = document.querySelector('html');
    if(htm.dataset.mode == undefined){htm.dataset.mode = "";}
	let con = htm.dataset.mode.toLowerCase();

	if(what != undefined){
		con = (what) ? 'dark' : 'light';
	} else {
		// alert('changing');
	}

	let curmode = con;
	let themode = curmode == 'light' ? 'dark' : 'light';
	let theicon = curmode != 'light' ? 'fa-moon-o' : 'fa-sun-o';

	htm.dataset.mode = themode;

    let modebtns = document.querySelectorAll('[data-switchmode]');
    if(modebtns.length > 0){
	    let myres = `<i class="fa ${theicon}"></i> switch mode`;
        modebtns.forEach(el => {el.innerHTML = myres;})
    }

	console.log(`switching to ${themode}`);
}


switchmode(!isNightTime(currentHour, currentMinutes));
