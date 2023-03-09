var express = require('./config/express');
var app = express();
const port = app.get('port');
const https = require('https');
const http = require('http');
const fs = require('fs');
const { Client, Buttons} = require('whatsapp-web.js');
var QRCode = require('qrcode')

const client = new Client();






client.on('qr', (qr) => {
  app.get('/qr', (req, res)=>{

   
    QRCode.toFile(__dirname+"/uploads/qr.png",qr,{color: {
      dark: '#00F',  
      light: '#0000' }
    }, function (err) {
      if (err) throw err
      res.setHeader("Content-Type", "text/html")

      res.send('<img style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="http://localhost:81/avatar/qr.png"></img>')
    })
      

  });
});

client.on('ready', () => {
    
  
  app.get('/grupos', async(req,res)=>{

const chats = await client.getChats()
const groups = chats
    .filter(chat => chat.isGroup)
    .map(chat => {
        return {
            id: chat.id._serialized, 
            name: chat.name 
        }
    }) 

    res.send(groups)

    })

    app.post('/sendwhats', async(req,res)=>{

      const label = await client.getChatLabels("120363029209826299@g.us")
      
      if(req.body.title){
      const msg = `${req.body.title}\n

      ${req.body.msg}
      `
      client.sendMessage("120363029209826299@g.us",msg)
      }
      else{
      const msg = req.body.msg
      client.sendMessage("120363029209826299@g.us",msg)
      }
      



      /*let button = new Buttons('Button body', [{ body: 'Pagar' }, 'title', 'footer'])

     /*client.sendMessage("120363029209826299@g.us",button)*/
  
      res.send(label)
  
      })
  
});



client.initialize();

var pathComp= require("express-static");
app.use('/avatar',pathComp(__dirname+"/uploads",));


const httpServer = http.createServer(app);
/*const httpsServer = https.createServer({
  key: fs.readFileSync(__dirname+'/config/certificates/localhost.key'),
  cert: fs.readFileSync(__dirname+'/config/certificates/localhost.crt'),
}, app);*/



// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
httpServer.listen(8081, '192.168.0.126', () => {
  console.log('HTTP Server running on port 8081');
});

/*httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});*/