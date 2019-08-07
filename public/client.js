// generic render function
var render = function(template, node) {
	if (!node) return
	node.insertAdjacentHTML('beforeend', template)
}

var renderBars = function(data, node) {
	// render each bar and adjust css for each entry in data
	for (var i=0; i < data.length; i++) {
		var entry = '\
		<div class="bar">\
			<div class="prot inner"></div>\
			<div class="carb inner"></div>\
			<div class="fat inner"></div>\
		</div>\
		<div class="foodTitle">' + data[i].shrt_desc + '</div>'
		
		render(entry, node)

		var total = data[i].protein_g*4 + data[i].lipid_tot_g*9 + data[i].carbohydrt_g*4

		node.lastChild.previousElementSibling.children[0].style.flex = data[i].protein_g*4 / total
		node.lastChild.previousElementSibling.children[1].style.flex = data[i].carbohydrt_g*4 / total
		node.lastChild.previousElementSibling.children[2].style.flex = data[i].lipid_tot_g*9 / total
	}
}

// Not currently needed with new routing system
// var clearNode = function(node) {
// 	while (node.firstChild) {
// 		node.removeChild(node.firstChild)
// 	}
// }

var searchFood = function() {
	if (event.keyCode == '13') {
		window.location.href = 'http://localhost:8000/search/' + document.querySelector('input[name="search"]').value
	}
}

