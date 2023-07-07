module.exports = {
  booksList: async function (req, res, next) {
    try {
      const response = await fetch(`${process.env.BASE_URL}/action/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.API_KEY,
        },
        body: JSON.stringify({
          collection: "books",
          database: process.env.DATA_BASE,
          dataSource: process.env.DATA_SOURCE,
        }),
      });
      let result = await response.json();
      res.json({
        documents: result.documents,
        result: true,
      });
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
  specificBook: async function (req, res, next) {
    try {
      const response = await fetch(`${process.env.BASE_URL}/action/findOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": process.env.API_KEY,
        },
        body: JSON.stringify({
          collection: "books",
          database: process.env.DATA_BASE,
          dataSource: process.env.DATA_SOURCE,
          filter: {
            _id: { $oid: req.params.id },
          },
        }),
      });
      let result = await response.json();
      if (result.document === null) {
        res.json({
          document: "Book not found!",
          result: false,
        });
      } else {
        res.json({
          document: result.document,
          result: true,
        });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
};
