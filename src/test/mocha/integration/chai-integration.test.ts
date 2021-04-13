import assert from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../app";
import Movie from "../../../models/Movie";

let expect = chai.expect;

chai.use(chaiHttp);

describe("a simple test", () => {
  it("should return true on simple assertion", function () {
    assert.equal(1, 1);
  });
});

describe("peform correct db operations from endpoints", () => {
  it("should return the correct movie from the DB from get /movies/favorites/movieID", function (done) {
    chai
      .request(app)
      .get("/movies/favorites/9")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.id).to.equal(9);
        done();
      });
  });

  it("should add movie to db with post /movies/favorites", function (done) {
    const newMovie: Movie = {
      title: "The Godfather",
      director: "Francis Ford Coppala",
    };
    chai
      .request(app)
      .post("/movies/favorites")
      .type("json")
      .send({ movie: newMovie })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.title).to.equal("The Godfather");
        done();
      });
  });

  it("should update a movie to db with put /movies/favorites/movieId", function () {
    const newMovie: Movie = {
      title: "The Godfather",
      director: "Francis Ford Coppola",
		};
		
		const updatedMovie: Movie = {
			title: "The Godfather Part II",
      director: "Francis Ford Coppola",
		};

    chai
      .request(app)
      .post("/movies/favorites")
      .type("json")
      .send({ movie: newMovie })
      .then((response) => {
				expect(response).to.have.status(200);
				
        chai
          .request(app)
          .put(`/movies/favorites/${response.body.id}`)
          .type("json")
          .send({ movie: updatedMovie })
          .end((err, res) => {
            // assert agaisnt the actual upate 
            expect(res).to.have.status(200);
            
          });
      });
  });

  it("should delete movie in db with delete /movies/favorites/movieId", async function () {

    const newMovie: Movie = {
      title: "The Movie",
      director: "The Director",
    };

    chai
      .request(app)
      .post("/movies/favorites")
      .type("json")
      .send({ movie: newMovie })
      .then((response) => {
				expect(response).to.have.status(200);

        chai
          .request(app)
          .delete(`/movies/favorites/${response.body.id}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
					});
      });
	});
	

});
