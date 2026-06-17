import { useState, useEffect } from "react";
import Image from "next/image";
import RegisterForm from "./components/RegisterForm";
import ProgressCircle from "./components/ProgressCircle";

export default function Home() {
  const [status, setStatus] = useState(null);
  const [countInfo, setCountInfo] = useState(null);

  useEffect(() => {
    // Prevenir scroll automático al cargar
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/register", {
          cache: "no-store",
          headers: { "Pragma": "no-cache", "Cache-Control": "no-cache" }
        });
        if (!response.ok) {
          throw new Error("No se pudo obtener el estado de registros.");
        }
        const data = await response.json();
        setCountInfo({ count: data.count, max: data.maxParticipants });
      } catch (error) {
        console.warn(error.message ?? error);
      }
    };

    fetchStatus();

    // Polling cada 5 segundos para actualizar contador en tiempo real
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
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

  const isFull = countInfo?.count >= countInfo?.max;

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
        <div className="absolute bottom-10 w-full h-32 md:h-64 flex justify-center items-center z-10">
          <button className="bg-green-950/80 text-lg md:text-2xl text-gray-100 font-bold py-4 px-8 rounded hover:scale-110 transition-transform">
            <a className="font-runner" href="#form">
              ¡REGISTRATE AHORA!
            </a>
          </button>
        </div>
      </div>

      {/* Form */}
      <div id="form" className="min-h-screen w-full flex flex-col md:flex-row bg-black">
        {/* Left side */}
        <div className="w-full md:w-1/2 flex items-center justify-center pt-8 md:py-0">
          <div className="w-11/12 h-48 md:h-[80vh] p-6 md:p-12 relative overflow-hidden text-white rounded-2xl md:rounded-l-2xl">
            <Image src="/run.jpg" alt="Run" fill className="object-cover absolute inset-0 w-full h-full z-0 rounded-2xl md:rounded-l-2xl" />
            <div className="absolute inset-0 bg-linear-to-br from-green-950/60 via-green-950/50 to-green-900/30 z-1"></div>
            <ProgressCircle count={countInfo?.count} max={countInfo?.max} />
          </div>
        </div>
        {/* Right side */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-8 md:py-0 px-4 md:px-0">
          <div className="w-full md:w-3/4 max-w-lg p-6 md:p-8 rounded-2xl text-gray-200 shadow-lg">
            {!isFull && (
              <>
                <h3 className="text-lg md:text-xl font-semibold mb-2 font-runner">
                  Regístrate para la carrera Sendero Olvidado Trail Run
                </h3>
                <p className="text-xs md:text-sm text-gray-400 mb-6 font-runner">Rellena el siguiente formulario con tus datos personales.</p>
              </>
            )}
            <RegisterForm onSubmit={onSubmit} status={status} countInfo={countInfo} />
          </div>
        </div>
      </div>
      <div className="w-full h-16 p-10 bg-black text-gray-200 flex items-center justify-center border-t border-gray-950">
        <p className="text-sm font-runner animate-pulse">
          <a href="https://devshore.com.mx" target="_blank" rel="noopener noreferrer">
            crafted by{" "} Devshore
          </a>
        </p>
      </div>
    </main>
  );
}
