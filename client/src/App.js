import './App.css';
import {useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'



function App() {

  const [nombre,setNombre] = useState(""); 
  const [marca,setMarca] = useState(""); 
  const [detalle,setDetalle] = useState(""); 
  const [aroma,setAroma] = useState(""); 
  const [precio,setPrecio] = useState(); 
  const [id,setId] = useState(0); 

  const [editar,setEditar] = useState(false);

  const [perfumesList, setPerfumes] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre: nombre,
      marca: marca,
      detalle: detalle,
      aroma: aroma,
      precio: precio
    }).then(()=>{
      getPerfumes();
      limpiarCampos();
      Swal.fire({
        title: '<strong>Registro Exitoso!</strong>',
        html: '<i>El Perfume <strong>'+nombre+'</strong> fue registrado con exito!!</i>',
        icon: 'success',
        timer: 3000
      })
    });
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
      id: id,
      nombre: nombre,
      marca: marca,
      detalle: detalle,
      aroma: aroma,
      precio: precio
    }).then(()=>{
      getPerfumes();
      limpiarCampos();
      Swal.fire({
        title: '<strong>Actualización Exitosa!</strong>',
        html: '<i>El Perfume <strong>'+nombre+'</strong> fue actualizado con exito!!</i>',
        icon: 'success',
        timer: 3000
      })
    });
  }


  const limpiarCampos = ()=>{
    setNombre("");
    setMarca("");
    setDetalle("");
    setAroma("");
    setPrecio("");
    setId("");
    setEditar(false);
  }

  const editarPerfume = (val) =>{
    setEditar(true);

    setNombre(val.nombre);
    setMarca(val.marca);
    setDetalle(val.detalle);
    setAroma(val.aroma);
    setPrecio(val.precio);
    setId(val.id);
  }


  const getPerfumes = ()=> {
    Axios.get("http://localhost:3001/perfumes").then((response)=>{
      setPerfumes(response.data);
    });
  }

  getPerfumes();


  return (
    <div className="container">

    <div className="card text-center">
    <div className="card-header">
    Gestion de Perfumes 
    </div>
   <div className="card-body">

    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Nombre:</span>
    <input type="text" 
         onChange={(event)=>{
          setNombre(event.target.value);
        }}
    className="form-control" value = {nombre} placeholder="Ingrese Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Marca:</span>
    <input type="text" value = {marca} 
        onChange={(event)=>{
          setMarca(event.target.value);
          }}
    className="form-control" placeholder="Ingrese la Marca" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Detalle:</span>
    <input type="text" value = {detalle} 
        onChange={(event)=>{
          setDetalle(event.target.value);
          }} 
    className="form-control" placeholder="Ingrese el Detalle" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Aroma:</span>
    <input type="text" value = {aroma} 
        onChange={(event)=>{
          setAroma(event.target.value);
          }}
    className="form-control" placeholder="Ingrese el Aroma" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Precio:</span>
    <input type="number" value = {precio} 
        onChange={(event)=>{
          setPrecio(event.target.value);
          }}
    className="form-control" placeholder="Ingrese el Precio" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
   </div>

   <div className="card-footer text-muted">

      {
        editar?
        <div>
        <button className = 'btn btn-warning m-2' onClick={update}>Actualizar</button>
        <button className = 'btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
        </div>
        :<button className = 'btn btn-success' onClick={add}>Registrar</button>
      }
    </div>

    <table className="table">
  <thead className="table-dark">
    <tr>
      <th scope="col">N°</th>
      <th scope="col">Nombre</th>
      <th scope="col">Marca</th>
      <th scope="col">Detalle</th>
      <th scope="col">Aroma</th>
      <th scope="col">Precio</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  {
        perfumesList.map((val,key)=>{
          return <tr key = {val.id}>
          <th scope="row">{val.id}</th>
          <td>{val.nombre}</td>
          <td>{val.marca}</td>
          <td>{val.detalle}</td>
          <td>{val.aroma}</td>
          <td>{val.precio}</td>
          <td>
          <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button"
          onClick={()=>{
            editarPerfume(val)
          }}
          className="btn btn-info">Editar</button>
          <button type="button" className="btn btn-danger">Eliminar</button>
          </div>
          </td>
          </tr>
        })
      }
  </tbody>
</table>

  </div>
    </div>
  );
}

export default App;
