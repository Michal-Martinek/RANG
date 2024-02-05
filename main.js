
var nameCount = 5;

function updateNames() {
	let elem = document.getElementById('airline-names')
	elem.innerHTML = ''
	for (let i = 0; i < nameCount; ++i) {
		let e = document.createElement('p')
		e.innerHTML = generateName()
		elem.appendChild(e)
	}
}
function countButtonClick() {
	let btn = document.getElementById('count-btn')
	if (nameCount == 1) {
		btn.innerHTML = 'Less'
		nameCount = 5;
	} else {
		btn.innerHTML = 'More'
		nameCount = 1;
	}
	updateNames()
}
function main() {
	updateNames()
}
