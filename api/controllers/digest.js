const dig = require('urllib')
const fs = require("fs");
   
// Read users.json file
const body = ()=>{return JSON.parse(fs.readFileSync(`${__dirname}\\options.json`))}

module.exports = class Digest{

    constructor(user, pass, request, params){
  
        this.auth = `${user}:${pass}`;
        this.request = request;
        this.params = params;
        this.body = ""
    }


      setBody(){
      const b = new Object(body())
      this.body = b
      
      }

      path(){
        this.setBody()
        return this.body.options[this.request].path;
      }
        url(){
          return 'http://192.168.18.27'+this.path()
      
        }  

        options(){
            this.setBody()
            const params = this.params;
            this.body.options[this.request].digestAuth = this.auth
            //delete this.body.options[this.request]['path'];
            //this.body.options[this.request].digestAuth = this.auth;
            

            const isObject = (obj)=>{
              console.log(obj)
              Object.keys(obj).forEach(element => {
                if(typeof(obj[element]) == 'object'){

                  isObjectAux(obj[element])
  
                }else{  
                  params[element]?obj[element] = params[element]:'';
                }
            })
            }

            const isObjectAux=(obj)=>{
                Object.keys(obj).forEach(element => {

                  if(typeof(obj[element]) == 'object'){
                      isObject(obj[element])
                  }else{
    
                    params[element]?obj[element] = params[element]:'';                
    
                  }
              })

            }

             Object.keys(this.body.options[this.request]).forEach(element => {
              

              if(typeof(this.body.options[this.request][element]) == 'object'){
                
                isObjectAux(this.body.options[this.request][element])

              }else{

                params[element]?this.body.options[this.request][element] = params[element]:'';             

              }



            });
            this.body.options[this.request].content?this.body.options[this.request].content = JSON.stringify(this.body.options[this.request].content):'';

            console.log(this.body.options[this.request])
            return this.body.options[this.request];
  
        }


        async fire(){

            const responseHandler = (req,err, data, res) => {
                if (err) {

                  console.log(err);
                  console.log(data)
                }
                console.log(res);
                console.log(req)
                console.log(data.toString('utf8'));
              }
            
            const ret =  await dig.request(this.url(), this.options(), responseHandler)
            delete this.body
           
            return ret
           }
  }
  
 /* 
  const params = {employeeNo:'0008', name:'teste2', beginTime:'2022-08-16T10:00:00', endTime:'2022-08-30T00:00:00'}
  const req = new Digest('admin', '18a80b01c', 'insertUser', params);

  const opt = async ()=>{let res = await req.fire()
 
    console.log(res.data.toString())
  }
opt()*/
  



