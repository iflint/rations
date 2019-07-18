// generic render function
var cleanTitle = function(data) {
	
	return data
}

var render = function(template, node) {
	if (!node) return
	node.insertAdjacentHTML('beforeend', template)
}

var renderAll = function(data, node) {
	// render each bar and adjust css for each entry in data
	for (var i=0; i < data.length; i++) {
		var entry = '<div class="bar"><div class="prot inner"></div><div class="carb inner"></div><div class="fat inner"></div></div><div class="foodTitle">' + cleanTitle(data[i].shrt_desc) + '</div>'
		
		render(entry, node)

		var total = data[i].protein_g*4 + data[i].lipid_tot_g*9 + data[i].carbohydrt_g*4

		node.lastChild.previousElementSibling.children[0].style.flex = data[i].protein_g*4 / total
		node.lastChild.previousElementSibling.children[1].style.flex = data[i].carbohydrt_g*4 / total
		node.lastChild.previousElementSibling.children[2].style.flex = data[i].lipid_tot_g*9 / total
	}
}

var clearNode = function(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild)
	}
}

var searchFood = function() {
	if (event.keyCode == '13') {
		var searchTerm = document.querySelector('input[name="search"]').value
		fetch('http://localhost:3000/api/search/' + searchTerm)
			.then(response => response.json())
			.then(data => {
				// Here's a list of repos!
				clearNode(node)
				renderAll(data, node)
			})
	}
}

var node = document.querySelector('#content')

// initial search query
fetch('http://localhost:3000/api/search/sweet potato')
	.then(response => response.json())
	.then(data => {
		// Here's a list of repos!
		console.log(data)
		renderAll(data, node)
	});