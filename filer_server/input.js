const { resolve } = require('path');
const readLine = require('readline');


let connection;
const userInput = process.argv.slice(2);



const setUpInput = (conn) =>{
  connection = conn;

  const askFile = () =>{
    
    rl.question("What file do you want? ", (ans)=>{
      if(ans === "q"){
        process.exit();
      }else{
        connection.write(ans);
      }
    });

  }

  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  connection.setEncoding("utf-8");
  
  
  askFile();

  connection.on("data", (data)=>{
    
    try{
      const serverMssg = JSON.parse(data);
      if(serverMssg.files){
        console.log("Files available: ", serverMssg.files.join(' '));
        askFile();
      }else{
        console.log(serverMssg);
        askFile();
      }
    }catch(e){
          console.log(e);
    }
    askFile();
   
   
  })
  return rl;
}

module.exports = {setUpInput};