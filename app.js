
const line_text = document.querySelectorAll(".line_text");
const editor = document.querySelector(".editor");
const temp = document.querySelector(".line_template");

window.addEventListener('load', (e) => {

	editor.appendChild(LineElement(e))
	lineNumber();
})

function LineElement(e) {
	var t = temp.content.cloneNode(true);
	const p = t.querySelector(".line_number");
	// p.innerText = lineNumber;
	// lineNumber++;
	return t;
}

// editor.addEventListener("keypress", (e) => {
// 	if (e.target.className === "line_text") {
// 		console.log(e)
// 		const command = e.keyCode;
// 		const old = e.target.innerText;
// 		if (command === 13) {
// 			editor.appendChild(LineElement());
// 			e.preventDefault();
// 		}
// 	}
// });

editor.addEventListener("keydown", (e) => {
	if (e.target.className === "line_text") {
		const command = e.key;
		// console.log(e)
		const old = e.target.innerText;
		if (command === "Enter") {
			editor.appendChild(LineElement(e));
			lineNumber();
			e.target.parentNode.nextElementSibling.lastElementChild.focus()
			e.preventDefault();
		}
		else if (command === "Backspace" && editor.childElementCount > 1 && e.target.innerText.length - 1 < 1) {
			const elem = e.target.parentNode.previousElementSibling.lastElementChild;
			e.target.parentNode.remove()
			elem.focus();
			const selection = window.getSelection();
			const range = document.createRange();
			selection.removeAllRanges();
			range.selectNodeContents(elem);
			range.collapse(false);
			selection.addRange(range);
			e.preventDefault();
			lineNumber();
		}
		else if (command === "Tab") {
			e.preventDefault();
		}
		else if (command === "ArrowUp") {
			let elem = e.target.parentNode.previousElementSibling;
			if (elem) {
				elem.lastElementChild.focus();
			}

		}
		else if (command === "ArrowDown") {
			const elem = e.target.parentNode.nextElementSibling;
			if (elem) {
				elem.lastElementChild.focus();
			}

		}

	}
})

editor.addEventListener("click", (e) => {
	const tar = e.target;
	if (tar.className === "editor") {
		tar.lastElementChild.lastElementChild.focus();
	}
})

function lineNumber() {
	let line_number = 1;
	var arr = Array.prototype.slice.call(editor.children)
	arr.forEach((i) => {
		i.firstElementChild.innerText = line_number;
		line_number++;
	})
}
