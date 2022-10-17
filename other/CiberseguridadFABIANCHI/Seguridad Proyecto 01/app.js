let urlElements = document.querySelectorAll(".serach__results__urls");
let titleBrowser = document.querySelector(".serach__results__browsers");
let circleBrowser = document.querySelectorAll(".serach__results__browsers__dot");
console.log(urlElements);
// console.log(titleBrowser);

// urlElement.remove();
// titleBrowser.remove();

// urlElements.forEach( function(element) {
// 	console.log(element)
// 	element.remove();
// });

function clearDiv () {
	
	urlElements.forEach( function(element) {
		console.log(element)
		element.remove();
	});

	circleBrowser.forEach( function(element) {
		element.remove();
	});

	titleBrowser.remove();
}

