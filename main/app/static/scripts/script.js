//!!!!!!! < and > break the save system !!!!!!
// Look at Medium editor to fix issues (not contenteditable)
// ctrl + shift + r if css or js is cached and not updating

var back = document.body;
var edit = document.getElementById('editor');
var menu = document.getElementById('menu');
var start = document.getElementById("init");
var consl = document.getElementById("cons");
let root = document.documentElement;

const mem = []
const remem = []

var delay;

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'static/content/ascii.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
	xobj.send(null);  
 }

 loadJSON(function(response) {
	// Parse JSON string into object
	  var actual_JSON = JSON.parse(response);
	  console.log(actual_JSON);
   });

//on keyup, start the countdown
edit.addEventListener('keyup', () => {
		clearTimeout(delay);
		delay = setTimeout(report, 00);
});

document.onkeydown = function(e) {
	if (e.ctrlKey && e.key == 'x') {
		if (getComputedStyle(root).getPropertyValue("--disp") == 'none') {
			root.style.setProperty("--disp", 'block');
			consl.focus();
		}
		else if (getComputedStyle(root).getPropertyValue("--disp") == 'block') {
			root.style.setProperty("--disp", 'none');
			edit.focus();
			consl.value = "";
		}
	}
	if (e.key == 'Escape') {
		root.style.setProperty("--disp", 'none');
		edit.focus();
		consl.value = "";
	}
};

edit.addEventListener('keydown', () => {
	var event = window.event;
	var keypress = (event.keyCode) ? event.keyCode : event.which;
    var keyvalue = String.fromCharCode(keypress).toLowerCase();
	var key = keypress;
		if (keypress != 17) {
			report();
			if (key == 90) { //undo
				remem.push(edit.value);
				const premem = mem.pop();
				// Does vaue equal previous save? Yes? Then previous memory. Otherwise its the current value.
				edit.value = premem ? premem : edit.value;
			}
			if (key == 89) { //redo
				const promem = remem.pop();
				// Does prior change equal prior change? Then prior change. Otherwise its the current value.
				edit.value = promem ? promem : edit.value;
			}
		}
});

function swap() {
	// light or dark theme
	if (getCookie('theme') == 'dark') {
		root.style.setProperty("--color-primary", 'white');
		root.style.setProperty("--color-font", 'black');
		setCookie('theme', 'light');
	} 
	else {
		root.style.setProperty("--color-primary", 'black');
		root.style.setProperty("--color-font", 'white');
		setCookie('theme', 'dark');
	}
	//console.log(typeof(getCookie('theme')), getCookie('theme'));
};

function setCookie(name,value) {
	//  cookie writing function
	var expires = "";
	document.cookie = name + "=" + (value || "")  + expires + "; SameSite=Lax; " + "path=/";
}

function getCookie(name) {
	// cookie calling function
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {   
	// cookie purging function
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

editor.addEventListener("paste", function(e) {
	// remove clipboard formatting
	e.preventDefault();
	if (e.clipboardData) {
			content = (e.originalEvent || e).clipboardData.getData('text/plain');
			document.execCommand('insertText', false, content);
	}
	else if (window.clipboardData) {
			content = window.clipboardData.getData('Text');
			document.selection.createRange().pasteHTML(content);
	}   
});

function init() {
	setCookie('check', 'true');
	start.style.display = "none";
	root.style.setProperty("--disp", 'none');
}

function countWords(str) {
	// word count
	str = str.replace(/(^\s*)|(\s*$)/gi,"");
	str = str.replace(/[ ]{2,}/gi," ");
	str = str.replace(/\n /,"\n");
	//console.log(str.split(' ').length);
	// will return wordcount if needed 
	return str.split(' ').length;
}

function report() {
	// update content
	setCookie('content', edit.innerHTML);
	//console.log("saved" + " len: " + countWords(edit.innerHTML));
}

function setReport() {
	// load cookies
	var call = getCookie('content');
	var check = getCookie('check');
	var theme = getCookie('theme');
	edit.innerHTML = call;
	if (check != 'true') {
		start.style.display = "block";
		console.log('Start typing...');
	}
	if (check == 'true') {
		edit.focus();
	}
	if (theme == 'dark') {
		root.style.setProperty("--color-primary", 'black');
		root.style.setProperty("--color-font", 'white');
		setCookie('theme', 'dark');
	}
}

// load page
edit.addEventListener("load", setReport());

