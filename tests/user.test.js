const request = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../src/models/users");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mickey",
  email: "mickeyblay@gmail.com",
  password: "1234562",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, "thisthismynewcourse"),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

// afterEach(() => {
//     console.log("AfterEach")
// })

test("should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Edward Nagai",
      email: "asmjdhgsf@gmail.com",
      password: "123454567",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertion about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Edward Nagai",
      email: "asmjdhgsf@gmail.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("123454567");
});

test("should login existing users", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  // Assert that the database was changed correctly
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login nonexisting users", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "qwred1234",
    })
    .expect(400);
});

// test('should get user profiles', async () => {
//     await request(app).get('/users/me')
//                       .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//                       .send()
//                       .expect(200);
// })

// test('should not get user profiles unauthenticated', async () => {
//     await request(app).get('/users/me')
//                       .send()
//                       .expect(200);
// })

test("should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not delete account for user unauthorized", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload avatar image", async () => {
  await request(app)
    .post("/users/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatars", "tests/fixtures/ghana.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(Expect.any(Buffer));
});
