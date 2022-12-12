const container = document.querySelector('.library')

let myLibrary = []

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class UI {
    static display() {
        const books = Store.getBooks()

        books.forEach((book) => UI.addBookToLibrary(book));
    }

    static addBookToLibrary(book) {
        const list = document.querySelector('.library');

        const row = document.createElement('div')

        let title = document.createElement('h3')
        let author = document.createElement('h3')
        let pages = document.createElement('h3')
        let isRead = document.createElement('button')
        let removeBtn = document.createElement('button')

        row.setAttribute('class', 'book')
        title.setAttribute('class', 'title')
        author.setAttribute('id', 'author')
        pages.setAttribute('id', 'pages')
        isRead.setAttribute('class', 'isRead')
        removeBtn.setAttribute('class', 'remove')

        list.appendChild(row);

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(isRead);
        row.appendChild(removeBtn);

        removeBtn.textContent = 'Remove'
        title.textContent = book.title
        author.textContent = book.author
        pages.textContent = book.pages + ' pages'
        isRead.textContent = book.isRead
        if (isRead.textContent == 'Read') {
            isRead.style.backgroundColor = '#238636'
        }
        else {
            isRead.style.backgroundColor = '#A10D2A'
        }
    }

    static clearInputs() {
        document.querySelector('.title_input').value = ''
        document.querySelector('.author_input').value = ''
        document.querySelector('.pages_input').value = ''
        document.querySelector('.check').checked = false
    }

    static removeBook(el) {
        if (el.classList.contains('remove')) {
            el.parentElement.remove()
        }
    }

    static changeColor(el) {
        if (el.classList.contains('isRead')) {
            if (el.textContent == 'Read') {
                el.textContent = 'Not read'
                el.style.backgroundColor = '#A10D2A'
            }
            else {
                el.textContent = 'Read'
                el.style.backgroundColor = '#238636'
            };
        }
    }
}

class Store {
    static getBooks() {
        let books;

        if (localStorage.getItem('books') === null) {
            books = [];
        }

        else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.title === title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books))
    }
}

document.addEventListener('DOMContentLoaded', UI.display)

document.querySelector('#form').addEventListener('submit', (e) => {

    // Get from inputs
    const titleInput = document.querySelector('.title_input').value
    const authorInput = document.querySelector('.author_input').value
    const pagesInput = document.querySelector('.pages_input').value
    let readInput = document.querySelector('.check').checked
    if (readInput == true) {
        readInput = 'Read'
    }
    else {
        readInput = 'Not read'
    };

    // Add to UI
    const book = new Book(titleInput, authorInput, pagesInput, readInput)
    UI.addBookToLibrary(book)

    // Add book to store
    Store.addBook(book)

    // Clear inputs
    UI.clearInputs();
})

document.querySelector('.library').addEventListener('click', (e) => {
    // Remove from UI
    UI.removeBook(e.target)

    // Remove from DB
    Store.removeBook(e.target.parentElement.firstElementChild.textContent)

    // Change color
    UI.changeColor(e.target)
})