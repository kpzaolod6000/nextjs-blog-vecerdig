let inputFile = document.querySelector("#inputfiletxt");
let contentFile = document.querySelector('#file-contents');

inputFile.addEventListener('change', ()=>{

	let files = inputFile.files;

	if (files.length == 0) return;

	const file = files[0];

	let reader = new FileReader();

	reader.onload = (e) => {
		// const file = e.target.value;
		// const lines = file.split(/\r\n|\n/);
		// contentFile.textContent = lines.join('\n');
		contentFile.textContent = reader.result;
	};


	reader.onerror = (e) => {
		alert(e.target.error.name);
	};

	reader.readAsText(file);

	console.log(files);
	console.log(file);
	console.log(contentFile.target);
});

// console.log(contentFile.value);
