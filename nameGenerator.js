
function choose(l) {
	let idx = Math.floor(Math.random() * l.length)
	return l[idx]
}

function expand(template) {
	if (template.includes("<adjective>")) {
		let adj = choose(adjectives)
		template = template.replace("<adjective>", adj)
	}
	return template
}

function generateName() {
	let template = choose(templates)
	return expand(template)
}
