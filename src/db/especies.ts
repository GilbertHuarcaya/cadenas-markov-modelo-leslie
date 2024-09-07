const especie1 = {
  id: 1,
  nombre: "Perro",
  descripcion: "Animal doméstico",
  tasaNatalidadPromedio: {
    joven: 0,
    juvenil: 0.2,
    adulto: 0.3,
  },
  probabilidadDeSupervivencia: {
    joven_juvenil: 0.8,
    juvenil_adulto: 0.7,
    permanecer_adulto: 1,
  },
  poblacionInicial: {
    joven: 100,
    juvenil: 50,
    adulto: 25,
  },
};

const especie2 = {
  id: 2,
  nombre: "Gato",
  descripcion: "Animal doméstico",
  tasaNatalidadPromedio: {
    joven: 0,
    juvenil: 0.2,
    adulto: 0.3,
  },
  probabilidadDeSupervivencia: {
    joven_juvenil: 0.8,
    juvenil_adulto: 0.7,
    permanecer_adulto: 1,
  },
  poblacionInicial: {
    joven: 100,
    juvenil: 50,
    adulto: 25,
  },
};

const especie3 = {
  id: 3,
  nombre: "Pez",
  descripcion: "Animal doméstico",
  tasaNatalidadPromedio: {
    joven: 0,
    juvenil: 0.2,
    adulto: 0.3,
  },
  probabilidadDeSupervivencia: {
    joven_juvenil: 0.8,
    juvenil_adulto: 0.7,
    permanecer_adulto: 0,
  },
  poblacionInicial: {
    joven: 100,
    juvenil: 50,
    adulto: 25,
  },
};

const especie4 = {
  id: 4,
  nombre: "Ceroxylon quindiuense",
  descripcion:
    "La palma de cera del Quindío (Ceroxylon quindiuense) es una palma nativa de los bosques montañosos húmedos andinos del parque nacional natural Los Nevados, en Colombia.",
  tasaNatalidadPromedio: {
    joven: 0,
    juvenil: 0,
    adulto: 0.459,
  },
  probabilidadDeSupervivencia: {
    joven_juvenil: 0.219,
    juvenil_adulto: 0.078,
    permanecer_adulto: 1,
  },
  poblacionInicial: {
    joven: 639,
    juvenil: 140,
    adulto: 11,
  },
};

export const especies = [especie1, especie2, especie3, especie4];
