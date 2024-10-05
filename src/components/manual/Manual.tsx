import React from "react";

const Manual: React.FC = () => {
  return (
    <div>
      <h1 className="title">Manual de Uso de la Aplicación</h1>
      <section>
        <h2 className="title">Introducción</h2>
        <p>
          Esta aplicación está diseñada para modelar cadenas de Markov
          utilizando el modelo de Leslie.
        </p>
      </section>
      <section>
        <h2 className="title">Pasos para usar la aplicación</h2>
        <ol className=" flex flex-col gap-2">
          <li>
            Haga clic en el botón
            <span className="button-primary">Ver Especies</span> para mostrar
            las especies de la base de datos.
          </li>
          <li>Seleccione la especie deseada.</li>
          <li>Ingrese el Periodo o cantidad de Periodos deseado.</li>
          <li>
            Haga clic en el botón{" "}
            <span className="button-primary">Calcular</span> para generar los
            resultados.
          </li>
          <li>Revise los resultados en la sección de salida.</li>
        </ol>
      </section>
    </div>
  );
};

export default Manual;
