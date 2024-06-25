/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
      chai.request(server)
      .post('/api/books')
      .send({ title: 'Test Book' }) // Send the request body
      .end(function(err, res){
        assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body, 'title', 'Books in array should contain title');
        assert.property(res.body, '_id', 'Books in array should contain _id');
        done();
      });
      });
      
      test('Test POST /api/books with no title given', function(done) {
      chai.request(server)
      .post('/api/books')
      .send({})
      .end(function(err, res){
        assert.equal(res.text, 'missing required field title');
        done();
      });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
          chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
     test('should fail if id is not in db', (done) => {
  
        const bookId = 123;
        chai.request(server)
         .get(`/api/books/${bookId}`)
         .end((err, res) => {
            assert.equal(res.text,'no book exists')
            done();
          });
    
  });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
         chai.request(server)
     .post('/api/books')
     .send({ title: 'Test Book' })
     .end((err, res) => {
        const bookId = res.body._id;
        chai.request(server)
         .get(`/api/books/${bookId}`)
         .end((err, res) => {
            assert.isObject(res.body, 'response should be an object');
        assert.property(res.body, 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body, 'title', 'Books in array should contain title');
        assert.property(res.body, '_id', 'Books in array should contain _id');
            done();
          });
      });
      
    });

    })
    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
          chai.request(server)
     .post('/api/books')
     .send({ title: 'Test Book' })
     .end((err, res) => {
        const bookId = res.body._id;
        chai.request(server)
         .post(`/api/books/${bookId}`)
          .send({comment:'test'})
         .end((err, res) => {
            assert.isObject(res.body, 'response should be an object');
        done();
          });
      });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
            chai.request(server)
     .post('/api/books')
     .send({ title: 'Test Book' })
     .end((err, res) => {
        const bookId = res.body._id;
        chai.request(server)
         .post(`/api/books/${bookId}`)
          .send({})
         .end((err, res) => {
            assert.equal(res.text, 'missing required field comment');
        done();
          });
      });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
       
        const bookId = 123;
        chai.request(server)
         .post(`/api/books/${bookId}`)
          .send({})
         .end((err, res) => {
            assert.equal(res.text, 'missing required field comment');
        done();
          });
  
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        //done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        //done();
      });

    });

  });

});
