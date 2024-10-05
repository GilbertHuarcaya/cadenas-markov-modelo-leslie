type TTasaNatalidadPromedio = {
  joven: number;
  juvenil: number;
  adulto: number;
};

type TProbabilidadDeSupervivencia = {
  joven_juvenil: number;
  juvenil_adulto: number;
  permanecer_adulto: number;
};

type TPoblacionInicial = {
  joven: number;
  juvenil: number;
  adulto: number;
};

type TEspecie = {
  id: number;
  nombre: string;
  descripcion: string;
  tasaNatalidadPromedio: TTasaNatalidadPromedio;
  probabilidadDeSupervivencia: TProbabilidadDeSupervivencia;
  poblacionInicial: TPoblacionInicial;
};
