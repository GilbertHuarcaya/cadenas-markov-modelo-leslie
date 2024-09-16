const especie1 = {
  id: 1,
  nombre: "Elefante africano (Loxodonta africana)",
  descripcion:
    "El elefante africano es el mamífero terrestre más grande del mundo, nativo de las sabanas, bosques y desiertos de África subsahariana. Se caracteriza por sus grandes orejas, que ayudan a regular su temperatura corporal, y su trompa, una herramienta versátil utilizada para alimentarse, beber agua y comunicarse. Los elefantes africanos son conocidos por su compleja estructura social y su gran inteligencia, habitan en áreas protegidas y reservas naturales debido a la caza furtiva y la pérdida de hábitat.",
  tasaNatalidadPromedio: {
    joven: 0,
    juvenil: 0.02,
    adulto: 0.15,
  },
  probabilidadDeSupervivencia: {
    joven_juvenil: 0.5,
    juvenil_adulto: 0.85,
    permanecer_adulto: 0.9,
  },
  poblacionInicial: {
    joven: 1000,
    juvenil: 800,
    adulto: 600,
  },
};

const especie2 = {
  id: 2,
  nombre: "Águila calva (Haliaeetus leucocephalus)",
  descripcion:
    "El águila calva es una majestuosa ave rapaz nativa de América del Norte, que habita en áreas cercanas a grandes cuerpos de agua, como lagos y ríos, donde encuentra su principal fuente de alimento: el pescado. Se caracteriza por su plumaje marrón oscuro, cabeza y cola blancas, y su fuerte pico amarillo. El águila calva es un símbolo nacional de los Estados Unidos, y su conservación ha sido exitosa tras años de declive debido a la caza y el uso de pesticidas.",
  tasaNatalidadPromedio: {
    joven: 0,
    juvenil: 0.05,
    adulto: 0.25,
  },
  probabilidadDeSupervivencia: {
    joven_juvenil: 0.4,
    juvenil_adulto: 0.7,
    permanecer_adulto: 0.8,
  },
  poblacionInicial: {
    joven: 500,
    juvenil: 300,
    adulto: 200,
  },
};

const especie3 = {
  id: 3,
  nombre: "Tortuga marina (Chelonioidea)",
  descripcion:
    "Las tortugas marinas son reptiles longevos que habitan los océanos tropicales y subtropicales de todo el mundo. Se caracterizan por su caparazón duro y aplanado, adaptado para nadar largas distancias, y sus aletas en lugar de patas, que las impulsan en el agua. Migran grandes distancias para anidar en playas específicas, donde desovan. A pesar de su longevidad, muchas especies de tortugas marinas están en peligro de extinción debido a la contaminación, la pesca incidental y la destrucción de sus áreas de anidación.",
  tasaNatalidadPromedio: {
    joven: 0,
    juvenil: 0,
    adulto: 0.3,
  },
  probabilidadDeSupervivencia: {
    joven_juvenil: 0.1,
    juvenil_adulto: 0.5,
    permanecer_adulto: 0.85,
  },
  poblacionInicial: {
    joven: 10000,
    juvenil: 1000,
    adulto: 500,
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
