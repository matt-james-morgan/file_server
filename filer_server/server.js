const net = require("net");
const {IP, PORT} = require("./constants");
const fsPromises = require("fs").promises;

const server = net.createServer();

server.listen(PORT, ()=>{
  console.log("Listening on port ", PORT);
})

server.on("connection", (client)=>{
  client.setEncoding("utf8"); // interpret data as text
  
  client.on("data", (data)=>{
    if(data === "list"){
      fsPromises.readdir("./files")
        .then(files=>{
          client.write(JSON.stringify({files:files}) + "\n");
        }).catch(err =>{
          client.write("Error retrieving file list.\n");
            console.error(err);
        });
    }else{
      fsPromises.readFile(`./files/${data}`, 'utf-8')
      .then((file)=>{
        client.write(JSON.stringify(file));
      }).catch(err =>{
        client.write("Error retrieving file list.\n");
          console.error(err);
      });
      
    }
    
  })
  
})

  
  