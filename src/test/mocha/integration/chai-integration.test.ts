import assert from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../app";

let expect = chai.expect;

chai.use(chaiHttp);

describe("a simple test", () => {
  it("should return true on simple assertion", function () {
    assert.equal(1, 1);
  });
});


