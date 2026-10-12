import { useState, useEffect } from "react";

export default function NumeroAnimado({ valor }) {
  const [mostrado, setMostrado] = useState(0);

  const valorFinal = parseInt(valor);
  const sufijo = valor.replace(/[0-9]/g, "");

  useEffect(() => {
    const pasos = 90;
    const incremento = valorFinal / pasos;
    let valorActual = 0;
    let intervalo;

    const pausa = setTimeout(() => {
      intervalo = setInterval(() => {
        valorActual += incremento;

        if (valorActual >= valorFinal) {
          valorActual = valorFinal;
          clearInterval(intervalo);
        }

        setMostrado(Math.round(valorActual));
      }, 18);
    }, 700);

    return () => {
      clearTimeout(pausa);
      clearInterval(intervalo);
    };
  }, [valorFinal]);

  return (
    <>
      {mostrado}
      {sufijo}
    </>
  );
}