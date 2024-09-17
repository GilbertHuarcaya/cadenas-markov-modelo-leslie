const ExplanationAmount = ({
  data,
  periods,
}: {
  data: { type: string; value: number }[];
  periods: number;
}) => {
  const [child, juvenile, adult] = data;

  const pluralize = ({ type, value }: { type: string; value: number }) => {
    if (value.toFixed(0) === "1") return type;
    const endsInVowel = /[aeiouáéíóú]$/i.test(type);
    return endsInVowel ? `${type}s` : `${type}es`;
  };

  return (
    <p>
      {`Para ${periods} ${
        periods !== 1 ? "periodos" : "periodo"
      } en el futuro, probablemente haya ${child.value.toFixed(0)} ${pluralize(
        child
      )}, ${juvenile.value.toFixed(0)} ${pluralize(juvenile)} y
      ${adult.value.toFixed(0)} ${pluralize(adult)}.`}
    </p>
  );
};

export default ExplanationAmount;
