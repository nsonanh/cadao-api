//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Danhngon = require('../models/danhngon');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Danhngon', () => {

    beforeEach((done) => { //Before each test we empty the database
        Danhngon.remove({}, (err) => { 
           done();
        });     
    });

    after((done) => { //After all tests we empty the database
        Danhngon.remove({}, (err) => { 
           done();
        });     
    });

    /*
    * Test the /POST route
    */
    describe('/POST danhngon', () => {
        it('it should not POST a danhngon without content', (done) => {
            let danhngon = {
                author: "African proverb",
                language: "en"
            }
            chai.request(server)
                .post('/api/danhngon')
                .send(danhngon)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("error: invalid input, please enter params: content, author and original language.");
                    done();
                });
        });
        it('it should POST a danhngon ', (done) => {
        let danhngon = {
            content: "Lies have many variations, truth has none",
            author: "African proverb",
            language: "en"
        }
        chai.request(server)
            .post('/api/danhngon')
            .send(danhngon)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('danhngon created!');
                res.body.danhngon.should.have.property('content');
                res.body.danhngon.should.have.property('author');
                res.body.danhngon.should.have.property('language');
                done();
            });
        });
    });

    /*
    * Test the /PUT/:id route
    */
    describe('/PUT/:id danhngon', () => {
        it('it should UPDATE a danhngon given the id', (done) => {
            let danhngon = new Danhngon({ content: "Lies have many variations, truth has none", author: "African proverb", language: "en"})
            danhngon.save(function(err, danhngon) {
                chai.request(server)
                .put('/api/danhngon/' + danhngon.id)
                .send({ content: "Lies have many variations, truth has none", author: "African proverb", language: "te"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('danhngon updated!');
                    res.body.danhngon.should.have.property('language').eql('te');
                    done();
                });
            });
        });
    });

    /*
    * Test the /PUT/:id route
    */
    describe('/PUT/:id danhngon', () => {
        it('it should UPDATE a danhngon given the id', (done) => {
            let danhngon = new Danhngon({ content: "Lies have many variations, truth has none", author: "African proverb", language: "en"})
            danhngon.save(function(err, danhngon) {
                chai.request(server)
                .put('/api/danhngon/' + danhngon.id)
                .send({ content: "Lies have many variations, truth has none", author: "African proverb" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("error: invalid input, please enter params: content, author and original language.");
                    done();
                });
            });
        });
    });

    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:id danhngon', () => {
        it('it should DELETE a danhngon given the id', (done) => {
        let danhngon = new Danhngon({ content: "test content", author: "test author", language: "te"})
        danhngon.save((err, danhngon) => {
                chai.request(server)
                .delete('/api/danhngon/' + danhngon.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('danhngon successfully deleted!');
                    done();
                });
            });
        });
    });

    /*
    * Test the /GET route
    */
    describe('/GET danhngon', () => {
        it('it should GET all the danhngon', (done) => {
        chai.request(server)
            .get('/api/danhngon')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    /*
    * Test the /GET/api/danhngon/:id route
    */
    describe('/GET/api/danhngon/:id danhngon', () => {
        it('it should GET a danhngon by the given id', (done) => {
            let newDanhngon = new Danhngon({ content: "Lies have many variations, truth has none", author: "African proverb", language: "en"});
            newDanhngon.save(function(err, danhngon) {
                chai.request(server)
                .get('/api/danhngon/' + danhngon.id)
                .send(danhngon)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('content');
                    res.body.should.have.property('author');
                    res.body.should.have.property('language');
                    res.body.should.have.property('_id').eql(danhngon.id);
                    done();
                });
            });
        });
    });

    /*
    * Test the /GET/api/danhngon/:id/:lang route
    */
    describe('/GET/api/danhngon/:id/:lang danhngon', () => {
        it('it should GET a danhngon by the given id and translate to specified language', (done) => {
            let newDanhngon = new Danhngon({ content: "one two three", author: "test author", language: "en"});
            newDanhngon.save(function(err, danhngon) {
                chai.request(server)
                .get('/api/danhngon/' + danhngon.id + '/vi')
                .send(danhngon)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('content').eql("một hai ba");
                    res.body.should.have.property('author');
                    res.body.should.have.property('language');
                    res.body.should.have.property('_id').eql(danhngon.id);
                    done();
                });
            });
        });
    });

    /*
    * Test the /GET/api/danhngon/random route
    */
    describe('/GET/api/danhngon/random danhngon', () => {
        it('it should GET a danhngon by random', (done) => {
            let newDanhngon = new Danhngon({ content: "Lies have many variations, truth has none", author: "African proverb", language: "en"});
            newDanhngon.save(function(err, danhngon) {
                chai.request(server)
                .get('/api/danhngon/random')
                .send(danhngon)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('content');
                    res.body.should.have.property('author');
                    res.body.should.have.property('language');
                    res.body.should.have.property('_id').eql(danhngon.id);
                    done();
                });
            });
        });
    });

    /*
    * Test the /GET/api/danhngon/random route and translate
    */
    describe('/GET/api/danhngon/random/:lang danhngon', () => {
        it('it should GET a danhngon by random and translate', (done) => {
            let newDanhngon = new Danhngon({ content: "one two three", author: "test author", language: "en"});
            newDanhngon.save(function(err, danhngon) {
                chai.request(server)
                .get('/api/danhngon/random/vi')
                .send(danhngon)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('content').eql("một hai ba");
                    res.body.should.have.property('author');
                    res.body.should.have.property('language');
                    res.body.should.have.property('_id').eql(danhngon.id);
                    done();
                });
            });
        });
    });

    /*
    * Test the /GET/api/language/:language route and return all danhngon in :language
    */
    describe('/GET/api/danhngon/language/:lang danhngon', () => {
        it('it should GET all danhngon by language', (done) => {
            let newDanhngon = new Danhngon({ content: "one two three", author: "test author", language: "en"});
            newDanhngon.save(function(err, danhngon) {
                if (err) {
                    assert.fail(0, 1, 'Could not save danhngon');
                }
            });

            let newDanhngon2 = new Danhngon({ content: "một hai ba", author: "test author", language: "vi"});
            newDanhngon2.save(function(err, danhngon) {
                chai.request(server)
                .get('/api/danhngon/language/vi')
                .send(danhngon)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].should.be.a('object');
                    res.body[0].should.have.property('content').eql("một hai ba");
                    res.body[0].should.have.property('author');
                    res.body[0].should.have.property('language');
                    res.body[0].should.have.property('_id').eql(danhngon.id);
                    done();
                });
            });
        });
    });

    /*
    * Test the /GET/api/author/:author route and return all danhngon from :author
    */
    describe('/GET/api/danhngon/author/:author danhngon', () => {
        it('it should GET all danhngon from author', (done) => {
            let newDanhngon = new Danhngon({ content: "one two three", author: "test author1", language: "en"});
            newDanhngon.save(function(err, danhngon) {
                if (err) {
                    assert.fail(0, 1, 'Could not save danhngon');
                }
            });

            let newDanhngon2 = new Danhngon({ content: "một hai ba", author: "test author2", language: "vi"});
            newDanhngon2.save(function(err, danhngon) {
                chai.request(server)
                .get('/api/danhngon/author/test%20author2')
                .send(danhngon)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].should.be.a('object');
                    res.body[0].should.have.property('content').eql("một hai ba");
                    res.body[0].should.have.property('author');
                    res.body[0].should.have.property('language');
                    res.body[0].should.have.property('_id').eql(danhngon.id);
                    done();
                });
            });
        });
    });

});