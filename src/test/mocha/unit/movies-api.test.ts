import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import {describe, it} from "mocha";
import * as MovieServices from "../../../services/movie";
import { Movies } from "../../../database/movies.db-model";

chai.use(chaiHttp);

const newTestMovie: any = {
  id: 9,
  title: "Wonder Boys",
  director: "Curtis Hansen",
};

describe("route calls correct service function", () => {
  it("calls getMovie from /movies/favorites/9", async () => {

    const moviesStub = sinon.stub(Movies, "findByPk");
    moviesStub.returns(Promise.resolve(newTestMovie));

    let result = await MovieServices.getMovieById(9);
    
    expect(result).to.eq(newTestMovie);

  });

  it("calls createNewMovie from /movies/favorites", async () => {

    const moviesStub = sinon.stub(Movies, "create");
    moviesStub.returns(Promise.resolve(newTestMovie));
    let result = await MovieServices.createNewMovie(newTestMovie);
    
    expect(result).to.eq(newTestMovie);
  });
});
