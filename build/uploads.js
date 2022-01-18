// Copy upload folder from strapi to gridsome
const fs = require("fs-extra");
const path = require("path");
 
const source = path.join(__dirname, "../../api/public/uploads/thumbs");
const destination = path.join(__dirname, "../static/uploads");
 
fs.copy(source, destination, function (err) {
    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy completed!')
});