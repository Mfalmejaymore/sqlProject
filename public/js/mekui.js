// a special object that makes UI items
var uiguy = {};


uiguy.mekrando = (what) => {
	let res = `<div class="default">
			<i>${what}</i>
		</div>`
	return res;
}

// make the default div
uiguy.mekdefault = () => {
	return uiguy.mekrando('empty, add something to your planboard');
}

// uiguy.meklist(items)
uiguy.mekplist = (item,id) => {
	// code for rendering lists
	let items = item.content.split(divider);

	// progress data
	let all = items.length;
	let done = 0;

	items.forEach(el => {
		if(el.split('|')[0] != 'f'){
			done += 1;
		}
	});

	let prg = (done / all) * 100;
	let verdict = prg >= 100 ? 'complete' : `${Math.floor(prg)}%`;
	let vclass = prg < 100 ? 'w3-black' : `w3-white themetxt complete`;
	let closer = item.hasOwnProperty('cantdelete') ? '' : `<button class="w3-btn closebtn w3-display-topright w3-hover-red" onclick="removeme(${id})"><i class="fa fa-close"></i></button>`;

	let res = `<div class="dashitem list" data-myid="${id}" data-role="process" data-progress="${prg}" data-items="${all}" data-done="${done}">
			${closer}
			<div class="toptxt">
				<span class="w3-display-bottomright">[${done}/${all}]</span>
				<h4>${item.title}</h4><b class="w3-tag ${vclass}">${verdict}</b>
				<div class="progress" data-val="${prg}">
					<div class="bar" style="width: 0%;"></div>
				</div>
			</div>
			<div class="mycontent">`;
	if(items.length > 0 && item.content != ''){
		console.log(`list ${id} has ${items.length} ${plural('item',items.length)}`);

		items.forEach((el,x) => {
			let pld = el.split('|');
			let addme = pld[0] == 'f' ? '' : 'checked';
			let showme = pld[1];

			res += `
				<div class="item w3-row ${pld[0]}">
					<div class="w3-col s1 w3-center"><input type="checkbox" ${addme} data-myid="l_${id}_${x}" onchange="markme(this)"></div>
					<div class="w3-col s9"> ${showme}</div>
					<div class="w3-col s1 w3-center"><button class="w3-transparent btn modetxt w3-hover-text-red" data-myid="l_${id}_${x}" onclick="deleteme(this)"><i class="fa fa-close"></i></button></div>
				</div>`;
		})
	}

	res += `
		</div>
			<div class="controls m1">
				<input type="text" id="newli${id}" placeholder="type a new item here" onkeydown="submitme(event.key,'list',${id})">
				<input type="hidden" name="myid${id}" value="${id}">
				<button class="btn" onclick="editlist(${id})"><i class="fa fa-plus"></i></button>
			</div>
		</div>`;

	return res;
}

uiguy['mekprocess_list'] = (item,id) => {
	return uiguy.mekplist(item,id);
}

uiguy.meklist = (item,id) => {
	// code for rendering lists
	let items = item.content.split(divider);

	let res = `<div class="dashitem list" data-myid="0">
			<button class="w3-btn closebtn w3-display-topright w3-hover-red" onclick="removeme(${id})"><i class="fa fa-close"></i></button>
			<div class="toptxt">
				<h4>${item.title}</h4>
			</div>
			<div class="mycontent">`;
	if(items.length > 0 && item.content != ''){
		console.log(`list ${id} has ${items.length} ${plural('item',items.length)}`);

		items.forEach((el,x) => {
			let addme = el.split('|')[0] == 'f' ? '' : 'checked';
			let showme = el.split('|')[1];

			res += `
				<div class="item w3-row">
					<div class="w3-col s1 w3-center"><input type="checkbox" ${addme} data-myid="l_${id}_${x}" onchange="markme(this)"></div>
					<div class="w3-col s9"> ${showme}</div>
					<div class="w3-col s1 w3-center"><button class="w3-transparent btn modetxt w3-hover-text-red" data-myid="l_${id}_${x}" onclick="deleteme(this)"><i class="fa fa-close"></i></button></div>
				</div>`;
		})
	}

	res += `
		</div>
			<div class="controls m1">
				<input type="text" id="newli${id}" placeholder="type a new item here" onkeydown="submitme(event.key,'list',${id})">
				<input type="hidden" name="myid${id}" value="${id}">
				<button class="btn" onclick="editlist(${id})"><i class="fa fa-plus"></i></button>
			</div>
		</div>`;

	return res;
}

uiguy.meknote = (data,id) => {
	// alert('rendering note');

	// code for rendering notes
	let mb = document.createElement('div');
	mb.className = "dashitem note";
	mb.innerHTML = `
			<button class="w3-btn w3-right w3-hover-red w3-transparent" onclick="removeme(${id})"><i class="fa fa-close"></i></button>
			<h3>${data.title}</h3>
			<p>${data.content}</p>`;

	let res = mb.outerHTML;

	return res;
}

// responsible for making your items visible in the first place

uiguy.mekUI = (md) => {
	let res = '';

	if(md.length == 0){
		res += uiguy['mekdefault']();
	} else {
		// res += uiguy[`mekrando`]('just testing stuff out')

		try{
			md.forEach((el,id) => {
				if(el.type != 'data'){
					if(el.hasOwnProperty('type')){
						let inter = `mek${el.type.split(" ").join("_")}`;
						if(uiguy.hasOwnProperty(inter)){
							res += uiguy[`${inter}`](el,id);
						} else {
							alert(`uiguy doesnt have ${inter}`);
						}
					} else {
						alert('this has no type');
					}
					// console.log(inter);
				}
			})
		} catch(error){
			alert('Opera SUCKS ASS!!!!');
			console.log(error);
		}
	}

	return res;
}