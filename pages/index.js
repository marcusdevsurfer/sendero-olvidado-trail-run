import { useState, useEffect } from "react";
import Image from "next/image";
import RegisterForm from "./components/RegisterForm";
import Loader from "./components/Loader";

export default function Home() {
  const [status, setStatus] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  useEffect(() => {
    // Fallback: ocultar loader después de 3 segundos
    const timer = setTimeout(() => {
      setIsVideoLoading(false);
    }, 3000);

    // Prevenir scroll automático al cargar
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setStatus({ type: "loading", message: "Enviando datos..." });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Error al guardar los datos.");
      }

      setStatus({ type: "success", message: "Registro guardado en Google Sheets." });
      return { success: true };
    } catch (error) {
      const message = error.message || "Error al enviar el formulario.";
      setStatus({ type: "error", message });
      return { success: false, error: message };
    }
  };

  return (
    <main>
      {/* Navbar */}
      {/* <div className="absolute top-0 left-0 w-full h-16 bg-gray-900 text-white flex items-center justify-center">
        Este espacio sera el Navbar
      </div> */}

      {/* Cover Video */}
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-700 relative overflow-hidden">
        <video
          src="https://res.cloudinary.com/dl8fw5mv9/video/upload/v1781558132/video-cover_ijpo5c.mp4"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline
          x5-playsinline
          preload="auto"
          controls={false}
          controlsList="nofullscreen"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          Tu navegador no soporta el video.
        </video>
        <div className="absolute inset-0 z-5 pointer-events-auto" onClick={(e) => e.preventDefault()} />
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-64 flex justify-center items-center z-10">
          <button className="bg-green-950/45 text-lg md:text-xl text-white font-bold py-3 px-6 rounded hover:scale-105 transition-transform">
            <a href="#form">
              ¡Registrate ahora!
            </a>
          </button>
        </div>
      </div>

      {/* Form */}
      <div id="form" className="min-h-screen w-full flex flex-col md:flex-row bg-black">
        {/* Left side */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-8 md:py-0">
          <div className="w-11/12 h-48 md:h-[80vh] p-6 md:p-12 relative overflow-hidden text-white rounded-2xl md:rounded-l-2xl">
            <Image src="/run.jpg" alt="Run" fill className="object-cover absolute inset-0 w-full h-full z-0 rounded-2xl md:rounded-l-2xl" />
            <div className="absolute inset-0 bg-linear-to-br from-green-950/60 via-green-950/50 to-green-900/30 z-1"></div>
            <div className="absolute left-0 bottom-0 p-4 md:p-10 z-10">
              <h2 className="text-2xl md:text-4xl font-semibold mb-2 md:mb-4">Corre con nosotros!</h2>
              <p className="text-sm md:text-base mb-4 md:mb-8 text-green-100/90">Completa estos sencillos pasos para registrar tu cuenta.</p>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-8 md:py-0 px-4 md:px-0">
          <div className="w-full md:w-3/4 max-w-lg p-6 md:p-8 rounded-2xl text-gray-200 shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Regístrate para la carrera Sendero Olvidado Trail Run
            </h3>
            <p className="text-xs md:text-sm text-gray-400 mb-6">Rellena el siguiente formulario con tus datos personales.</p>
            <RegisterForm onSubmit={onSubmit} status={status} />
          </div>
        </div>
      </div>
      <div className="w-full h-16 p-10 bg-black text-gray-200 flex items-center justify-start border-t border-gray-900">
        <p className="text-sm">
          Desarrollado por: <a href="https://devshore.com.mx" target="_blank" rel="noopener noreferrer">
            Devshore
          </a>
        </p>
      </div>
    </main>
  );
}
