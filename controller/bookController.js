
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
      return res.json({ message: 'no book exists' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBook = async (req, res) => {
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
      return res.json({ message: 'no book exists' });
    }
    await book.remove();
    res.json({ message: 'delete successful' });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    if(!req.body.comment) {
      return res.json({error:'missing required field comment'})
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.json({ message: 'no book exists' });
    }

    book.comments.push(req.body.comment);
    book.commentCount = book.comments.length;
    book.updatedAt = Date.now();

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAllBooks = async (req, res) => {
  try {
    await Book.deleteMany({});
    res.json({ message: 'complete delete successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
