import React, { useState } from 'react';

const ContenedorJuego = ({ children }) => {
  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
      {children}
    </div>
  );
};

const MensajePista = ({ suposicion, numeroSecreto }) => {
  if (suposicion === null) return <p>Ingresa un numero para comenzar a jugar.</p>;
  if (suposicion === numeroSecreto) return <p style={{ color: 'green', fontWeight: 'bold' }}>Correcto. Adivinaste el numero.</p>;
  return suposicion < numeroSecreto 
    ? <p style={{ color: 'blue' }}>El numero secreto es mayor.</p> 
    : <p style={{ color: 'orange' }}>El numero secreto es menor.</p>;
};

export default function AdivinaNumero() {
  const [numeroSecreto, setNumeroSecreto] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [entrada, setEntrada] = useState('');
  const [suposicion, setSuposicion] = useState(null);
  const [intentos, setIntentos] = useState(0);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const numero = parseInt(entrada);
    if (isNaN(numero) || numero < 1 || numero > 100) return;
    setSuposicion(numero);
    setIntentos(intentos + 1);
  };

  const reiniciarJuego = () => {
    setNumeroSecreto(Math.floor(Math.random() * 100) + 1);
    setEntrada('');
    setSuposicion(null);
    setIntentos(0);
  };

    return (
    <ContenedorJuego>
      <h2>Adivina el Numero (1 al 100)</h2>
      <p>Intentos realizados: {intentos}</p>
      
      <MensajePista suposicion={suposicion} numeroSecreto={numeroSecreto} />

      {suposicion !== numeroSecreto ? (
        <form onSubmit={manejarEnvio} style={{ marginTop: '15px' }}>
          <input
            type="number"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            min="1"
            max="100"
            style={{ padding: '8px', width: '80px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Intentar</button>
        </form>
      ) : (
        <button onClick={reiniciarJuego} style={{ marginTop: '15px', padding: '8px 16px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Jugar de nuevo
        </button>
      )}
    </ContenedorJuego>
  );
}