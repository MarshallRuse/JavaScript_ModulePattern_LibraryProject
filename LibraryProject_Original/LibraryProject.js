function Book(title, author, numPages, isRead){
	this.title = title;
	this.author = author;
	this.numPages = numPages;
	this.isRead = isRead;
}

Book.prototype.info = function(){
	let readStatus;
	if (this.isRead){
		readStatus = "Read";
	}
	else {
		readStatus = "Not Read";
	}
	return "Author: " + this.author + "<br>Pages: " + this.numPages + "<br>" + readStatus;
}

Book.prototype.toggleReadStatus = function() {
	if (this.isRead){
		this.isRead = false;
	}
	else {
		this.isRead = true;
	}
}

var myLibrary = [];
let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "300", true);
let surfaceDetail = new Book("Surface Detail", "Iain M. Banks", 500, true);
addBook(theHobbit);
addBook(surfaceDetail);

function addBook(book){
	myLibrary.push(book);
	addBookToDisplay(book);
}

function addBookToDisplay(book){
	let closeButton = "<button class='btn btn-danger close-button'>X</button>";
	let readButtonCSS, readButtonVal;
	if (book.isRead){
		readButtonCSS = "not-read";
		readButtonVal = "Not Read";
	}
	else {
		readButtonCSS = "read";
		readButtonVal = "Read";
	}
	let readButton = "<button class='read-button " + readButtonCSS + "'>" + readButtonVal + "</button>";
	let list = document.querySelector("#bookDisplay");
	list.innerHTML += "<div class='row'>" +
	"<div class='col-md-4 col-md-offset-4'>" +
	"<li data-book-index='" + findBookIndex(book.title) + "'>" +
	"<div class='panel panel-primary'>" +
	"<div class='panel panel-heading'>" + 
	"<span class='bookTitle'>" + book.title + "</span>" + closeButton +
	"</div>" +
	"<div class='panel panel-body'>" + 
	"<span class='bookAuthor'>Author: " + book.author + "</span><br>" +
	"<span class='bookPages'>Pages: " + book.numPages + "</span><br>" +
	"<span class='bookReadStatus'>Read Status: " + readButtonVal + "</span><br>" +
	 readButton +
	"</div>" +
	"</div>" + 
	"</li>" +
	"</div>" +
	"</div>";


}

function formSubmission(submitEvent){
		submitEvent.preventDefault();
		let bookTitle = addBookForm.querySelector("#bookTitle").value;
		let bookAuthor = addBookForm.querySelector("#bookAuthor").value;
		let bookPages = addBookForm.querySelector("#bookPages").value;
		let readStatus = false;
		let bookRead = addBookForm.querySelector("input[name=bookRead]").value;
		if (bookRead == "Yes"){
			readStatus = true;
		}
		let book = new Book(bookTitle, bookAuthor, bookPages, readStatus);
		addBook(book);
}

function findBookIndex(bookTitle){
	let bookIndex = myLibrary.findIndex(function(bookElement){
		return bookElement.title == bookTitle;
	});
	return bookIndex;
}

function removeBook(book){
	myLibrary.splice(findBookIndex(book.title), 1);

}


function addListeners(){
	//delete buttons
	let list = document.querySelector("#bookDisplay");
	list.addEventListener("click", function(e){
		if (e.target.classList.contains("close-button")){
			let li = e.target.closest(".row");
			let book = li.getElementsByTagName("span")[0].textContent;
			list.removeChild(li);
			removeBook(book);

		}
	});

	//Add Book button
	document.querySelector("#addBookButton").addEventListener("click", function(e){
		document.querySelector("#addBookDisplay").style.display = "block";
	});
	
	//Add Book Form
	let addBookForm = document.querySelector("#addBookForm");
	addBookForm.querySelector("#submitBtn").addEventListener("submit", formSubmission);
	addBookForm.querySelector("#cancelBtn").addEventListener("click", function(e){
		document.querySelector("#addBookDisplay").style.display = "none";
	});


	//Read Status button 
	console.log("gets here");
	list.addEventListener("click", function(e){
		if (e.target.classList.contains("read-button")){
			let readToggleButton = e.target;
			let bookTitle = readToggleButton.closest(".row").getElementsByTagName("span")[0].textContent;
			let book = myLibrary[findBookIndex(bookTitle)];
			book.toggleReadStatus();
			if (readToggleButton.classList.contains("read")){
				readToggleButton.classList.remove("read");
				readToggleButton.classList.add("not-read");
				readToggleButton.textContent = "Not Read";
				readToggleButton.parentNode.querySelector(".bookReadStatus").textContent = "Read";
			}
			else {
				readToggleButton.classList.remove("not-read");
				readToggleButton.classList.add("read");
				readToggleButton.textContent = "Read";
				readToggleButton.parentNode.querySelector(".bookReadStatus").textContent = "Not Read";
			}

		}
	});

}

addListeners();







