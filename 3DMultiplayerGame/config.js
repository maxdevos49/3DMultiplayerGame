//File for config information about the site
module.exports = {
    "name": "Game Jam Fall 2018",
    "apiVersion": "1.0.0",
    "owner": "Maxwell DeVos",
    "dbUrl": process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gamejamfall2018"
};
