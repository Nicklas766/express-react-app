

// To avoid errors
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;

var request = require('supertest');
var app = require('../../app.js');



describe('Check routes', function() {
    it('Main page content', function(done) {
        request(app).get("/")
            .expect(200, done);
    });


    // it('tests report route with id', function(done) {
    //     request(app).get('/api/report/1')
    //         .set('Accept', 'application/json')
    //         .expect(200)
    //         .then((response) => {
    //           assert(response.body.name == 'kmom01', 'kmom01');
    //           done();
    //       })
    // });
});
