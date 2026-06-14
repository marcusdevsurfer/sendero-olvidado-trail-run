import Image from "next/image";
import { useForm } from "react-hook-form"

export default function Home() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <main>
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gray-900 text-white flex items-center justify-center">
        Este espacio sera el Navbar
      </div>

      {/* Cover Video */}
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-700">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/video-cover.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
        <div className="absolute bottom-0 left-0 w-full h-64 flex justify-center items-center">
          <button className="z-2 bg-green-950/45 text-xl text-white font-bold py-3 px-6 rounded hover:scale-105 transition-transform">
            ¡Registrate ahora!
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="min-h-screen w-full flex bg-black">
        {/* Left side */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-11/12 h-[80vh] p-12 relative overflow-hidden text-white">
            <Image src="/run.jpg" alt="Run" fill className="object-cover absolute inset-0 w-full h-full z-0 rounded-l-2xl" />
            <div className="absolute inset-0 bg-linear-to-br from-green-950/60 via-green-950/50 to-green9600/30 z-1"></div>
            <div className="absolute left-0 bottom-0 p-10 z-10">
              <h2 className="text-4xl font-semibold mb-4">Corre con nosotros!</h2>
              <p className="mb-8 text-green-100/90">Completa estos sencillos pasos para registrar tu cuenta.</p>

              <div className=" mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white text-black rounded-lg shadow-md flex items-center space-x-3">
                  <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-semibold">Registra tu cuenta</p>
                    <p className="text-sm text-black/60">Información básica</p>
                  </div>
                </div>

                <div className="p-4 bg-white/10 rounded-lg flex items-center space-x-3">
                  <div className="bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center">3</div>
                  <div>
                    <p className="font-semibold text-white/90">Personaliza tu perfil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-3/4 max-w-lg p-8 rounded-2xl text-gray-200 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Crear cuenta</h3>
            <p className="text-sm text-gray-400 mb-6">Introduce tus datos personales para registrarte a la carrera</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-350">Nombre</label>
                  <input {...register("name")} className="mt-1 w-full border border-white/15 rounded px-3 py-2 text-gray-100" />
                </div>
                <div>
                  <label className="block text-sm text-gray-350">Apellido</label>
                  <input {...register("lastname")} className="mt-1 w-full border border-white/15 rounded px-3 py-2 text-gray-100" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-350">Email</label>
                <input {...register("email")} className="mt-1 w-full  border border-white/15 rounded px-3 py-2 text-gray-100" />
              </div>

              <div className="flex items-center space-x-3">
                <input id="acceptTerms" type="checkbox" {...register("acceptTerms")} className="h-4 w-4" />
                <label htmlFor="acceptTerms" className="text-sm text-gray-350">Acepto los términos y condiciones</label>
              </div>

              <button className="w-full bg-green-950/95 hover:bg-green-900/80 transition-colors text-white font-semibold py-2 rounded-md" type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-16 bg-green-950/30 text-gray-200 flex items-center justify-center">
        <p className="text-sm">
          Desarrollado por: <a href="https://devshore.com.mx" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            Devshore
          </a>
        </p>
      </div>
    </main>
  );
}
