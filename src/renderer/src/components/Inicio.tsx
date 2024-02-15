import React, { useState, useEffect, useContext } from 'react';
import { themeContext } from '@renderer/App';
import imagen from '../assets/img/img_logo.png'; // Ruta relativa desde Inicio.tsx a la imagen

const Inicio: React.FC = () => {
  const [mensajeCompleto, setMensajeCompleto] = useState('');
  const [mostrarImagen, setMostrarImagen] = useState(false); // Estado para controlar la visibilidad de la imagen
  const mensajeOriginal = '¡Bienvenid@!';
  const theme = useContext(themeContext);

  useEffect(() => {
    const mostrarMensajeConEfecto = async () => {
      for (let i = 0; i <= mensajeOriginal.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Espera 100 milisegundos entre cada caracter
        setMensajeCompleto(mensajeOriginal.substring(0, i));
      }
      // Una vez completada la animación del texto, esperar 3 segundos y luego mostrar la imagen
      setTimeout(() => {
        setMensajeCompleto('');
        setMostrarImagen(true);
      }, 2000);
    };

    mostrarMensajeConEfecto(); // Llama a la función directamente al iniciar el componente
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`${theme === 'Dark' ? 'bg-slate-80 text-white' : 'bg-white'} text-center relative flex items-center`}>
        <div className="flex-1"> 
          <h1 className={`text-6xl font-bold mb-8 font-serif transition-opacity duration-500 ${mensajeCompleto ? 'opacity-100' : 'opacity-0'}`}>{mensajeCompleto}</h1>
          <div className={`relative transition-opacity duration-500 ${mensajeCompleto ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-16 h-16 rounded-full bg-yellow-300 absolute top-0 left-1/4 transform -translate-x-1/2 animate-bounce"></div>
            <div className="w-16 h-16 rounded-full bg-orange-400 absolute top-0 right-1/4 transform -translate-x-1/2 animate-bounce"></div>
          </div>
          <img
            src={imagen}
            alt="Logo de celifrut"
            className={`d-flex justify-content-center transition duration-1000 transform hover:scale-110 ${mostrarImagen ? 'opacity-100' : 'opacity-0'}`}
            style={{ maxHeight: '300%', maxWidth: '300%', marginLeft: '5px', marginBottom: '160px' }}
          />
        </div>
      </div>
    </div>
  );
};
export default Inicio;