console.log("Init script");

const express = require("express");
const cool = require("cool-ascii-faces");
const app = express(); //para llamar al framework express
const Port = process.env.PORT || 16078; //Esto es para que si se ejecuta en la pagina web(la primera) que coja ese port y 
//que si se ejecuta en local coja el segundo 

//En express siempre se pone "/" que es la ruta y la segunda opcion es el callback

app.use("/",express.static("./public/index.html")); //Esto es para que ponga el html  ya que coje la carpeta static 

app.use("/about",express.static("./public/Readme.html")); //Esto es para que ponga el html  ya que coje la carpeta static 

app.get("/", (request,response)=>{
    response.send("Hello from the server");
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server

app.get("/cool", (request,response)=>{
    response.send(cool());
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server

app.get("/", (request,response)=>{
    response.send("Hello from the server");
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server

app.listen(Port,()=>{
    console.log(`Server Running on Port ${Port}`);
}); //Esto es para usar el framework en ese puerto (poner un puerto alto)

