const data = [{
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: ["fantasy", "high-fantasy", "adventure", "fiction", "novels", "literature",],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
        spanish: "El señor de los anillos", chinese: "魔戒", french: "Le Seigneur des anneaux",
    },
    reviews: {
        goodreads: {
            rating: 4.52, ratingsCount: 630994, reviewsCount: 13417,
        }, librarything: {
            rating: 4.53, ratingsCount: 47166, reviewsCount: 452,
        },
    },
}, {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: ["science fiction", "humor", "speculative fiction", "short stories", "fantasy",],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
        goodreads: {
            rating: 4.16, ratingsCount: 11663, reviewsCount: 812,
        }, librarything: {
            rating: 4.13, ratingsCount: 2434, reviewsCount: 0,
        },
    },
}, {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
        spanish: "",
    },
    reviews: {
        goodreads: {
            rating: 4.25, ratingsCount: 1142893, reviewsCount: 49701,
        },
    },
}, {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
        spanish: "Harry Potter y la piedra filosofal",
        korean: "해리 포터와 마법사의 돌",
        bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
        portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
        goodreads: {
            rating: 4.47, ratingsCount: 8910059, reviewsCount: 140625,
        }, librarything: {
            rating: 4.29, ratingsCount: 120941, reviewsCount: 1960,
        },
    },
}, {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
        korean: "왕좌의 게임", polish: "Gra o tron", portuguese: "A Guerra dos Tronos", spanish: "Juego de tronos",
    },
    reviews: {
        goodreads: {
            rating: 4.44, ratingsCount: 2295233, reviewsCount: 59058,
        }, librarything: {
            rating: 4.36, ratingsCount: 38358, reviewsCount: 1095,
        },
    },
},];

function getBooks() {
    return data;
}

function getBook(id) {
    return data.find((d) => d.id === id);
}


// destructuring

const book = getBook(3);

// const title = book.title;
// const author = book.author;

// destructuring object

const {title, author, pages, publicationDate, genres, hasMovieAdaptation} = book;

console.log(title, author);

// destructuring arrays

const primaryGenera = genres[0];
const secondaryGenera = genres[1];

console.log(primaryGenera, secondaryGenera);

const [primaryGenere, secondaryGenere, ...otherGeneres] = genres; // <- rest operator example

console.log(primaryGenera, secondaryGenere, otherGeneres);


// spread operator

const newGeners = [...genres];

const updatedBook = {
    ...book, moviePublicationDate: '2010-12-19', // <- add key or update it using spread operator
}


// Template literals

const summary = `a book ${title}`;


// Ternary operator

const applicationStatus = pages > 1000 ? 'Exceeded' : 'Not Exceeded';


// arrow functions

const getYear = (str) => str.split('-').unshift();
console.log(getYear('2024-07-12'));

// short circuit
// and - &&
console.log(true && 'Jay') // && short circuits if first value is false / falsy
console.log(0 && 'Jay') // && short circuits if first value is false / falsy

// or - ||
console.log(book.translations.spanish || 'Translation not found') // || uses default value as second value if first value is false / falsy

// nullish coalescing operator - ??
console.log(book.translations.spanish ?? 'Translation not found') // ?? uses default value as second value if first value is null or undefined


// Optional Chaining

function getTotalReviewCount(book) {
    const goodreads = book.reviews?.goodreads?.reviewsCount ?? 0;
    const librarything = book.reviews?.librarything?.reviewsCount ?? 0;
    return goodreads + librarything;
}

console.log(getTotalReviewCount(book));


// array methods
const books = getBooks();

const x = [1, 2, 3, 4, 5].map(el => el * 2);
console.log(x);

const titles = books.map(book => book.title);
console.log(titles);

const withAuthors = books.map(book => ({
    title: book.title, author: book.author, totalReviews: getTotalReviewCount(book)
}));
console.log(withAuthors.length);

const longBooks = books
    .filter(book => book.pages > 500)
    .filter(book => book.hasMovieAdaptation);
console.log(longBooks.length);

const advantureBooks = books.filter(book => book.genres.includes('adventure'));
console.log(advantureBooks.length);

console.log(books.reduce((acc, curr, index) => acc += curr.pages, 0));

const arr = [5, 3, 2, 6, 1];
console.log(arr);
console.log(arr.sort((a, b) => a - b));
console.log(arr);
console.log(arr.sort((a, b) => b - a));
console.log(arr);
console.log(arr.slice().sort((a, b) => a - b));
console.log(arr);


// Working with immutable arrays

//1. Add a book object to array
const newBook = {
    id: 100, title: 'The Alchemist', author: 'Poulo Coelo'
};

const booksAfterAdd = [...books, newBook];

// 2. Delete a book object from array
const booksAfterDelete = booksAfterAdd.filter(book => book.id !== 100);

// 3. Update book object in the array
const booksAfterUpdate = booksAfterDelete.map(book => book.id === 1 ? {...book, pages: 123} : book);


// JS Promises
fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(res => res.json())
    .then(res => {
        console.log('GET TODOS RESPONSE')
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });


// JS Async Await

async function getTodos(id = 0) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const responseJson = await response.json();
        console.log('GET TODO BY ID RESPONSE')
        console.log(responseJson)

    } catch (e) {
        console.log(e)
    }
}

getTodos(1);
