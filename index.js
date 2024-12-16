const express = require("express");
const mongoose = require("mongoose");
const UsersModel = require("./models/usersmodels.js");
const cors = require("cors");
App.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

const App = express();
App.use(express.json());


App.get("/users", async (req, res) => {
  try {
    const result = await UsersModel.find({});
    res.status(200).send({
      isSuccessfull: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send({
      isSuccessfull: false,
      message: error.message,
    });
  }
});

App.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UsersModel.findById(id);

    if (!result) {
      return res.status(404).send({
        isSuccessfull: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      isSuccessfull: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send({
      isSuccessfull: false,
      message: error.message,
    });
  }
});


App.post("/users", async (req, res) => {
  try {
    const { fname, lname, email } = req.body;
    const newUser = new UsersModel({ fname, lname, email });

    const result = await newUser.save();

    res.status(201).send({
      isSuccessfull: true,
      message: "User added successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      isSuccessfull: false,
      message: error.message,
    });
  }
});


App.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UsersModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({
        isSuccessfull: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      isSuccessfull: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      isSuccessfull: false,
      message: error.message,
    });
  }
});


App.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await UsersModel.findByIdAndUpdate(id, body, { new: true });

    if (!result) {
      return res.status(404).send({
        isSuccessfull: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      isSuccessfull: true,
      message: "Record updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      isSuccessfull: false,
      message: error.message,
    });
  }
});



mongoose
  .connect("mongodb+srv://todoApp:todoapp123456@todocls-3.buqof.mongodb.net/")
  .then(() => {
    App.listen(1026, (err) => {
      if (err) {
        console.log("Error is Start in server");
      } else {
        console.log(
          " MongoDB Connected and Server is listening on http://localhost:1026"
        );
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });