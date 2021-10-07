import { useState, useEffect } from "react";
import Axios from "axios";

const Formulario = () => {



  const [materiales, setMateriales] = useState([]);
  const [id, setId] = useState(0);



  const [registro, setRegistro] = useState({
    herramienta: "",
    precio: "",
    foto: "",
  });



  useEffect(() => {
    obtenerTodosLosMateriales();
  }, []);

  useEffect(() => {
    console.log(registro);
  }, [registro]);





  //Llamados a las APIS:
  // GET => Toma los registros
  const obtenerTodosLosMateriales = async () => {
    let url = "http://localhost:5050/materiales";
    const respuesta = await Axios.get(url);
    setMateriales(respuesta.data);
  };

  // Las funciones propias del formulario
  const handleClickEliminar = async (pId) => {
    const respuesta = await Axios.delete(
      `http://localhost:5050/materiales/${pId}`
    );
    console.log(respuesta);
    obtenerTodosLosMateriales();
  };

  const handleClickNuevo = async () => {
    const respuesta = await Axios.post(
      "http://localhost:5050/materiales",
      registro
    );
    console.log(respuesta);
    obtenerTodosLosMateriales();
    limpiarCampos();
  };

  const limpiarCampos = () => {
    setRegistro({
      herramienta: "",
      precio: "",
      foto: "",
    });
  };




  
  const handleChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };




  const handleSubmit = (e) => e.preventDefault();

  const handleObtieneRegistro = async (pId) => {
    const respuesta = await Axios.get(`http://localhost:5050/material/${pId}`);
    setRegistro(respuesta.data[0]);
    setId(pId);
  };

  const handleClickActualizar = async () => {
    const respuesta = await Axios.put(
      `http://localhost:5050/materiales/${id}`,
      registro
    );
    console.log(respuesta);
    obtenerTodosLosMateriales();
    setId(0);
    limpiarCampos();
  };

  return (
    <>
      <h1>Ferretería del tío Tito</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="herramienta"
          placeholder="herramienta"
          onChange={(e) => handleChange(e)}
          value={registro && registro.herramienta}
        />{" "}
        <br />
        <input
          name="precio"
          placeholder="precio"
          onChange={(e) => handleChange(e)}
          value={registro && registro.precio}
        />
        <br />
        {/* <input
          name="pais"
          placeholder="pais"
          onChange={(e) => handleChange(e)}
          value={registro && registro.pais}
        />
        <br /> */}
        <input
          name="foto"
          placeholder="foto"
          onChange={(e) => handleChange(e)}
          value={registro && registro.foto}
        />
        <br />
        {id > 0 ? (
          <button onClick={() => handleClickActualizar()}>Actualizar</button>
        ) : (
          <button onClick={() => handleClickNuevo()}>Agregar</button>
        )}
      </form>


      {materiales &&
        materiales.map((a) => {
          return (
            <>
              <h3>Herramienta:</h3>
              <p>
                { a.herramienta }
              </p>
              <h3> Precio: </h3>
              <p>{ a.precio }</p>
              <h3>Foto</h3>
              <img src={a.foto} alt={a.herramienta} /> <br />
              <button
                style={{ background: "yellow", color: "black" }}
                onClick={() => handleObtieneRegistro(a.id)}
              >
                Editar
              </button>
              <button
                onClick={() => handleClickEliminar(a.id)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Eliminar
              </button>
            </>
          );
        })}
    </>
  );
};

export { Formulario };
