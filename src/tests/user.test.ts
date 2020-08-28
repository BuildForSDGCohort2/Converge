import { app, request, expect, BASE_URL } from "./testConfig";
import { testUser } from "../Utils/testHelpers";
describe("Users", () => {
  describe("POST /api/v1/users/register", () => {
    it("should create user", async () => {
      try {
        /**create user */
        let { body } = await request(app)
          .post(`${BASE_URL}/users/register`)
          .set("Accept", "application/json")
          .send(testUser);

        /** Tests */
        expect(body.status).to.eql(201);
      } catch (error) {}
    });
  });
});
