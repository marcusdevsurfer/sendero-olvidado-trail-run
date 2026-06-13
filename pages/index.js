import { useForm } from "react-hook-form"

export default function Home() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <main>
      <div className="absolute top-0 left-0 w-full h-16 bg-gray-900 text-white flex items-center justify-center">
        Este espacio sera el Navbar
      </div>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-700">
        <h1 className="">
          Este sera el espacio para el video introductorio del evento.
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-64 flex justify-center items-center">
          <button className="z-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Registro
          </button>
        </div>
      </div>
      <div className="min-h-screen w-full">
        <div className="w-full p-16 flex items-center justify-center">
          <h1 className="text-xl font-bold">Formulario de Registro</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 p-8 flex flex-col items-center justify-center">
          <div>
            <label htmlFor="name">Nombre</label>
            <br />
            <input className="border border-gray-300 rounded py-2 w-lg" defaultValue="" {...register("name")} />
          </div>

          <div>
            <label htmlFor="lastName">Apellido</label>
            <br />
            <input className="border border-gray-300 rounded py-2 w-lg" defaultValue="" {...register("lastname")} />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input className="border border-gray-300 rounded py-2 w-lg" defaultValue="" {...register("email")} />
          </div>

          <button className="bg-green-950 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Enviar
          </button>
        </form>
      </div>

      <div className="w-full h-16 bg-blue-950 text-gray-200 flex items-center justify-center">
        <p>Desarrollado por: Devshore</p>
      </div>
    </main>
  );
}
