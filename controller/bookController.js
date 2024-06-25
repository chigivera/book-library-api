
const Book = require('../model/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.send('no book exists');
    }
    res.json(book);
  } catch (err) {
    res.send('no book exists');
  }
};

exports.createBook = async (req, res) => {
  if(!req.body.title) {
    return res.send('missing required field title')
  }
  const book = new Book({
    title: req.body.title
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.updateBook = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) {
//       return res.json({ message: 'no book exists' });
//     }

//     book.title = req.body.title;
//     book.comments = req.body.comments;
//     book.commentCount = req.body.comments.length;
//     book.updatedAt = Date.now();

//     const updatedBook = await book.save();
//     res.json(updatedBook);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.send( 'no book exists');
    }
    await book.deleteOne({});
    res.send('delete successful');
  } catch (err) {
    res.send('delete successful');
  }
};

exports.addComment = async (req, res) => {
  try {
    if(!req.body.comment) {
      return res.send('missing required field comment')
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.send( 'no book exists');
    }

    book.comments.push(req.body.comment);
    book.commentCount = book.comments.length;
    book.updatedAt = Date.now();

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.send('missing required field comment');
  }
};

exports.deleteAllBooks = async (req, res) => {
  try {
    await Book.deleteMany({});
    res.send( 'complete delete successful' );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
