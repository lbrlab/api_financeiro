const md5 = require('md5');
const fs = require('fs');
const post = require('./post');
async function uploadImage(image, name, query, params=null){

    
    const buff = Buffer.from(image.split(';base64,').pop(), 'base64');
    
    
    const imageId = md5(`${Date.now()}`)
    fs.writeFile(`./uploads/${imageId}.jpg`, buff, function(err) {
        console.log(buff);
})

params.image = imageId;

post.getResult(name, query, {image:params.image,cpf:params.cpf})
    return imageId
   
}

module.exports = {uploadImage}
