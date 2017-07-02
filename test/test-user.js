//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../api/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

//Require the secret key
let secret = require('../api/secret');

//Require the jwt
let jwt = require('jsonwebtoken');

chai.use(chaiHttp);

var testUser;

//Our parent block
describe('User', () => {
    var that = this;
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
        });
        let newUser = new User({ username: "testAccount", password: "testPassword", admin: true});
        newUser.save(function(err, user) {
            if (err) assert.fail(0, 1, 'Could not save test user');

            testUser = newUser;
            done();
        });
    });

    after((done) => { //After all tests we empty the database
        User.remove({}, (err) => { 
           done();
        });     
    });

    /*
    * Test the /GET route
    */
    describe('/GET user', () => {
        it('it should GET all the user', (done) => {
        chai.request(server)
            .get('/api/user')
            .set('x-access-token', jwt.sign(testUser, secret, {
                expiresIn: 60
            }))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.body[0].username.should.be.eql(testUser.username);
                done();
            });
        });
    });

    /*
    * Test the /GET/api/user/authenticate route
    */
    describe('/GET/api/user/authenticate user', () => {
        it('it should authenticate a user by the username & password and return a token', (done) => {
            chai.request(server)
            .post('/api/user/authenticate')
            .send({ "username": "testAccount", "password": "testPassword" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('token');
                done();
            });
        });
        it('it should authenticate a user by the username & password and return a token', (done) => {
            chai.request(server)
            .post('/api/user/authenticate')
            .send({ "username": "testAccountd", "password": "testPassword" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.not.have.property('token');
                done();
            });
        });
        it('it should authenticate a user by the username & password and return a token', (done) => {
            chai.request(server)
            .post('/api/user/authenticate')
            .send({ "username": "testAccount", "password": "testPasswordd" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.not.have.property('token');
                done();
            });
        });
    });
});