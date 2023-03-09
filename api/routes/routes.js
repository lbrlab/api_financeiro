module.exports = async app => {
    const get = require('../controllers/get');
    const post = require('../controllers/post');
    const mail = require('../controllers/mail');
    const upload = require('../controllers/uploadImage');

    const servers = app.data.querys;
    const pathimage = app.images
    let methods = [];
    console.log(servers)

    servers.routes.forEach((e)=>{
    
    if(e.method === 'get'){
    methods.push(app.route('/'+e.name)
      .get(async (req, res)=>res.status(200).json(await get.getResult(e.name, e.query))));

    }

    if(e.method === 'post'){
    methods.push(app.route('/'+e.name)
      .post(async (req, res)=>res.status(200).json(await post.getResult(e.name, e.query, req.body, req.headers['Autentication']))));
  
    }
  
    if (e.method === 'mail'){
    methods.push(app.route('/'+e.name)
      .post(async (req, res)=>res.status(200).json(await mail.sendmail(req.body))))

    }

   if (e.method === 'image'){
      methods.push(app.route('/'+e.name)
        .post(async (req, res)=>res.status(200).json(await upload.uploadImage(req.body.foto, e.name, e.query, {cpf:req.body.cpf}))))

    }


    
  


  
  
    })

  return methods;
}