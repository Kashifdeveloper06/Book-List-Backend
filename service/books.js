var express = require("express");
var router = express.Router();
require("dotenv").config();

const bookController = require("../controllers/BooksController");
// Get Users List

router.get("/list", bookController.booksList);

// Get Specific User

router.get("/get/:id", bookController.specificBook);

module.exports = router;
