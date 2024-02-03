
// helpers ----------------------------------------
function choose(l) {
	let idx = Math.floor(Math.random() * l.length)
	return l[idx]
}
function getErrorStr(msg, value='') {
	if (value) msg += " '" + value + "'";
	console.error(msg)
	return '<b style="color:red">' + msg + '</b>';
}

function expandField(grammar, field, name) {
	let expanded = ''
	if (typeof(grammar[name]) == 'undefined') {
		expanded = getErrorStr('UNDEFINED field', name);
	} else if (typeof(grammar[name]) == 'string') {
		expanded = grammar[name];
	} else if (Array.isArray(grammar[name])) {
		expanded = choose(grammar[name]);
	} else {
		expanded = getErrorStr('UNREACHABLE');
	}
	return expanded
}
function expandTemplate(template, maxDepth=100) {
	let i = 0;
	while (template.indexOf('(') >= 0 && i++ <= maxDepth) {
		template = template.replace(/\(([a-zA-Z0-9]+)\)/g, expandField.bind(this, grammar));
	}
	return template
}

function generateName() {
	let template = choose(grammar.template)
	return expandTemplate(template)
}
