import { useState } from "react";
import { useForm } from "react-hook-form";
import TermsAndConditionModal from "./TermsAndConditionsModal";

export default function RegisterForm({ onSubmit, status }) {
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const onSubmitForm = async (data) => {
        const result = await onSubmit(data);
        if (result?.success) {
            reset();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                        <label className="block text-xs md:text-sm text-gray-350 font-runner">Nombre</label>
                        <input required {...register("name")} className="mt-1 w-full border border-white/15 rounded px-3 py-2 text-xs md:text-sm text-gray-100" placeholder="ej: Juan" />
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm text-gray-350 font-runner">Apellido</label>
                        <input required {...register("lastname")} className="mt-1 w-full border border-white/15 rounded px-3 py-2 text-xs md:text-sm text-gray-100" placeholder="ej: Pérez" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                        <label className="block text-xs md:text-sm text-gray-350 font-runner">Numero</label>
                        <input type="number" required {...register("phone")} className="mt-1 w-full border border-white/15 rounded px-3 py-2 text-xs md:text-sm text-gray-100" placeholder="ej: 123456789" />
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm text-gray-350 font-runner">Comunidad Runner</label>
                        <select required {...register("community")} className="mt-1 w-full border border-white/15 rounded px-3 py-2 text-xs md:text-sm text-gray-100">
                            <option value="">Selecciona una opcion</option>
                            <option value="manza-run">Manza Run Club</option>
                            <option value="hybrids">Hybrids</option>
                            <option value="monkeys-bar">Monkey Bars</option>
                            <option value="independent">Independiente</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-end">
                    <div>
                        <label className="block text-xs md:text-sm text-gray-350 font-runner">Contacto de Emergencia</label>
                        <input type="text" required {...register("emergencyContactName")} className="mt-1 w-full border border-white/15 rounded px-3 py-2 text-xs md:text-sm text-gray-100" placeholder="Nombre" />
                    </div>
                    <div>
                        <label className="block text-xs md:text-sm text-gray-350 font-runner md:hidden">Teléfono</label>
                        <input type="number" required {...register("emergencyContactPhone")} className="mt-1 w-full border border-white/15 rounded px-3 py-2 text-xs md:text-sm text-gray-100" placeholder="Numero de contacto" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-2 space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <input id="acceptTerms" type="checkbox" required {...register("acceptTerms")} className="h-4 w-4" />
                        <label htmlFor="acceptTerms" className="text-xs md:text-sm text-gray-350 font-runner">Acepto los términos y condiciones</label>
                    </div>
                    <button type="button" onClick={() => setIsTermsOpen(true)} className="font-runner text-xs md:text-sm text-blue-300 underline hover:text-blue-200">
                        Ver términos y condiciones
                    </button>
                </div>

                {status && (
                    <div className={`font-runner rounded-md px-3 py-2 text-xs md:text-sm ${status.type === "success" ? "bg-green-950 text-green-100" : status.type === "error" ? "bg-red-950 text-red-100" : "bg-gray-950 text-gray-100"}`}>
                        {status.message}
                    </div>
                )}

                <button className="font-runner w-full bg-green-950/95 hover:bg-green-900/80 transition-colors text-white font-semibold py-2 rounded-md text-sm md:text-base" type="submit">Enviar</button>
            </form>
            <TermsAndConditionModal isVisible={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
        </>
    )
}