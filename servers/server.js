const express = require('express');
const app = express();

app.get("/", function(req, res) {
    res.json({"result" : "sucess"});
})

app.get("/api/blog/:id", function(req, res) {
    if(req.params.id === "a1b2c3") {
        res.json({"id" : "a1b2c3", "title" : "The standard Lorem Ipsum passage, used since the 1500s",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
                "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in " +
                "voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint " +
                "occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})
    } else {
        res.json({"result" : "404_NOT_FOUND"})
    }
})

app.listen(8000, function() {
    console.log("express API server is running on port 8000.");
})