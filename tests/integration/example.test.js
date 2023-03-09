const request = require("supertest");
const { faker } = require("@faker-js/faker");
const httpStatus = require("http-status");
const app = require("../../src/app");

const { basicUser, managerUser, adminUser, createUserAndGetToken } = require("../fixtures/user.fixture");

describe("Test User routes", () => {
  let newUser;

  beforeEach(() => {
    newUser = {
      username: faker.internet.userName(),
      password: "password123",
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      fk_roleId: 1,
    };
  });

  test("It should response the GET method", (done) => {
    request(app)
      .get("/user/roles")
      .then((response) => {
        // console.log('response',response)
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("should return 200 and successfully return all the roles", async () => {
    const res = await request(app).get("/user/roles").expect(httpStatus.OK);
    expect(res.body).toEqual([
      { id: 1, name: "Regular" },
      { id: 2, name: "Manager" },
      { id: 3, name: "Admin" },
    ]);
  });

  test("should return 201 and successfully create new user if data is ok", async () => {
    const { user, token } = await createUserAndGetToken(adminUser);
    const res = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send(newUser)
      .expect(httpStatus.CREATED);

    console.log("res.body", res.body);
    expect(res.body).toEqual({
      id: expect.anything(),
      ...newUser,
    });
  });
});

//   const res = await request(app)
//     .post('/v1/users')
//     .set('Authorization', `Bearer ${adminAccessToken}`)
//     .send(newUser)
//     .expect(httpStatus.CREATED);

//   expect(res.body).not.toHaveProperty('password');
//   expect(res.body).toEqual({
//     id: expect.anything(),
//     name: newUser.name,
//     email: newUser.email,
//     role: newUser.role,
//     isEmailVerified: false,
//   });
