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
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('content');
                    res.body.errors.content.should.have.property('kind').eql('required');
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
                res.body.should.have.property('message').eql('Danhngon created!');
                res.body.danhngon.should.have.property('content');
                res.body.danhngon.should.have.property('author');
                res.body.danhngon.should.have.property('language');
                done();
            });
        });
    });

    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id danhngon', () => {
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
                    res.body.should.have.property('message').eql('Danhngon successfully deleted!');
                    done();
                });
            });
        });
    });
});