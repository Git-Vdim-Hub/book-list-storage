// Book class: represents a book
class Book{
    constructor(title, author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//UI class: Handle UI tasks
class UI{
    static displayBooks(){
    //   const StoredBooks = [
    //     {
    //         title: 'Book One',
    //         author: 'John Doe',
    //         isbn: '12423121',
    //     },
    //     {
    //         title: 'Book Two',
    //         author: 'Bob Smith',
    //         isbn: '23204492',
    //     },
    //     {
    //         title: 'Book Three',
    //         author: 'Jack Doe',
    //         isbn: '30548839'
    //     }
    //   ];
      
      const books = Store.getBooks();

      books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm
        delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
       if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
       } 
    }
    // <div class="alert alert-success">Whatever the message </div>
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Vanish in 3 sec
        setTimeout(()=> document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store Class: Handles Storage
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books')=== null){
        books = [];
    } else{
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  } 
  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  } 
  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach((book, index) => {
        if(book.isbn === isbn){
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books ));
  }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit',(e) => {
    // Prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if(title === ''|| author === '' || isbn === ''){
        // success is green info is blue danger is red, 
        UI.showAlert('Please fill in all fields', 'danger');
    }else{
    // Instantiate book
    const book = new Book(title, author, isbn);
    console.log(book);

    //Add Book UI
    UI.addBookToList(book);

    //Add Book to Store
    Store.addBook(book);

    //Success Message
    UI.showAlert('Book Added', 'success');

    // Clear Fields
    UI.clearFields();
    }
    

});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    console.log(e.target);
    UI.deleteBook(e.target)

    //Remove Book from Store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    //Delete Message
    UI.showAlert('Book Removed', 'info');
});