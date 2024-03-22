const express = require("express");
const app = express();
const  mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "perfumes_crud"

});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const marca = req.body.marca;
    const detalle = req.body.detalle;
    const aroma = req.body.aroma;
    const precio = req.body.precio;

    db.query('INSERT INTO perfumes(nombre,marca,detalle,aroma,precio) VALUES (?,?,?,?,?)', [nombre,marca,detalle,aroma,precio],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.get("/perfumes",(req,res)=>{
    db.query('SELECT * FROM perfumes',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const marca = req.body.marca;
    const detalle = req.body.detalle;
    const aroma = req.body.aroma;
    const precio = req.body.precio;

    db.query('UPDATE perfumes SET nombre=?,marca=?,detalle=?,aroma=?,precio=? WHERE id=?', [nombre,marca,detalle,aroma,precio,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.delete("/delete:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM perfumes WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
});