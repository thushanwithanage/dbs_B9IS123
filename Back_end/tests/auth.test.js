const request = require("supertest");
const express = require("express");
const authRouter = require("../routes/auth");
const User = require("../models/user");

jest.mock("../models/user");

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("POST /auth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Admin login", async () => {
    User.findOne.mockResolvedValue({
      email: "thushan@gmail.com",
      password: "thushan",
      isAdmin: true
    });

    const res = await request(app).post("/auth").send({
      email: "thushan@gmail.com",
      password: "thushan"
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toBe(true);
  });

  it("Non-admin login", async () => {
    User.findOne.mockResolvedValue({
      email: "aneesha@gmail.com",
      password: "aneesha",
      isAdmin: false
    });

    const res = await request(app).post("/auth").send({
      email: "aneesha@gmail.com",
      password: "aneesha"
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toBe(false);
  });

  it("Invalid password", async () => {
    User.findOne.mockResolvedValue({
      email: "thushan@gmail.com",
      password: "thushan",
      isAdmin: false
    });

    const res = await request(app).post("/auth").send({
      email: "thushan@gmail.com",
      password: "thush"
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid password");
  });

  it("Unknown email", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app).post("/auth").send({
      email: "thushan2@gmail.com",
      password: "thushan"
    });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });

  it("Server/database error", async () => {
    User.findOne.mockRejectedValue(new Error("DB Error"));

    const res = await request(app).post("/auth").send({
      email: "thushan@error.com",
      password: "error"
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Error");
  });
});