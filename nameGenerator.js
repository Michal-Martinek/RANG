
const FieldTypes = {
	Expansion: 'Expansion',
	Optional: 'Optional',
}
// helpers ----------------------------------------
function randint(upperBound=2) {
	return Math.floor(Math.random() * upperBound)
}
function choose(l) {
	return l[randint(l.length)]
}
function getErrorStr(msg, value='') {
	if (value) msg += " '" + value + "'";
	console.error(msg)
	return '<b style="color:red">&nbsp;' + msg + '&nbsp;</b>';
}
// impl ----------------------------------------------
function getRegex(type) {
	console.assert(Object.keys(FieldTypes).length == 2)
	if (type == FieldTypes.Expansion) return /\((\w+)\)/gu;
	if (type == FieldTypes.Optional) return /\[([^\]]+)\]/gu;
}

function expandField(grammar, type, field, name) {
	let expanded = ''
	if (type == FieldTypes.Expansion) {
		if (typeof(grammar[name]) == 'undefined') {
			expanded = getErrorStr('UNDEFINED field', name);
		} else if (typeof(grammar[name]) == 'string') {
			expanded = grammar[name];
		} else if (Array.isArray(grammar[name])) {
			expanded = choose(grammar[name]);
		} else {
			expanded = getErrorStr('UNREACHABLE');
		}
	} else if (type == FieldTypes.Optional) {
		if (randint()) expanded = name
	} else {
		expanded = getErrorStr('UNREACHABLE')
	}
	return expanded
}
function replace(template, type) {
	return template.replace(getRegex(type), expandField.bind(this, grammar, type))
}
function expandTemplate(template, maxDepth=100) {
	let i = 0;
	while (i++ <= maxDepth) {
		     if (template.indexOf('(') >= 0) template = replace(template, FieldTypes.Expansion);
		else if (template.indexOf('[') >= 0) template = replace(template, FieldTypes.Optional); // TODO: use the same regex here as in replacing
		else break;
	}
	if (i >= maxDepth) {
		template = getErrorStr('EXCEEDED MAX DEPTH with', template)
	}
	return template
}

function generateName() {
	let template = choose(grammar.template)
	return expandTemplate(template)
}
