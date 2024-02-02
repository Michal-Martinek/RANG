
import { generateName } from './nameGenerator.js';

function updateName() {
	let elem = document.getElementById('airlineName')
	elem.innerHTML = generateName()
}
function main() {
	updateName()
}

main()
