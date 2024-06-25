/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { getAllBooks, getBookById, createBook, deleteBook, addComment,deleteAllBooks } = require('../controller/bookController');


module.exports = function (app) {

  app.route('/api/books')
    .get(getAllBooks)
    
    .post(createBook)
    
    .delete(deleteAllBooks);



  app.route('/api/books/:id')
    .get(getBookById)
    
    .post(addComment)
  
    
    .delete(deleteBook);
  
}
