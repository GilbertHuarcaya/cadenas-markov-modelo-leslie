const ExplanationPercentaje = ({
  data,
}: {
  data: { type: string; value: number }[];
}) => {
  const [child, juvenile, adult] = data;
  const dangerCase =
    child.value < juvenile.value && child.value < adult.value
      ? child
      : juvenile.value < child.value && juvenile.value < adult.value
      ? juvenile
      : adult;

  const toPercentaje = (value: number) => (value * 100).toFixed(2);

  const pluralize = ({
    type,
    value,
  }: {
    type: string;
    value: number | string;
  }) => {
    if (value == 1) return type;
    const endsInVowel = /[aeiouáéíóú]$/i.test(type);
    return endsInVowel ? `${type}s` : `${type}es`;
  };

  return (
    <p>
      {`Es posible deducir que a largo plazo probablemente ${toPercentaje(
        child.value
      )}% de la población serán ${pluralize(child)}, ${toPercentaje(
        juvenile.value
      )}% ${pluralize(juvenile)} y ${toPercentaje(adult.value)}% ${pluralize(
        adult
      )}. Lo que deja en evidencia que los individuos ${pluralize({
        ...dangerCase,
        value: 2,
      })} son los que se encuentran en un estado más vulnerable.`}
    </p>
  );
};

export default ExplanationPercentaje;
