let nodemailer = require ('nodemailer');


async function sendmail(body){

let transporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
       user: 'danielproenca89@gmail.com', 
       pass: 'gwilfesiykdzzgsy' 
     } 
    });

const mailOptions = {
        from: 'danielproenca89@gmail.com', // sender address
        to: body.email, // receiver (use array of string for a list)
        subject: 'Siga', // Subject line
        html: `<h1>Olá, ${body.nome}!</h1> \n ${body.body}`
      };
console.log(body)

transporter.sendMail(mailOptions, (err, info) => {
        if(err){
//            console.log(err)
            return err
        }else{
//            console.log(info);
            return info
        }
     });
}

module.exports = {sendmail}