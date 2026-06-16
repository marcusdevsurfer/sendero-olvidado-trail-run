export default function TermsAndConditionModal({ isVisible, onClose }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/50 font-runner" onClick={onClose}>
            <div className="bg-black text-gray-100 rounded-lg p-6 max-w-lg w-full shadow-xl">
                <h2 className="text-xl font-bold mb-4">Términos y Condiciones</h2>
                <p className="text-sm mb-4">
                    Al enviar este formulario, declaro voluntariamente que me encuentro en perfecto estado de salud física y mental para participar en el evento de trail running y recovery zone. deslindo de toda responsabilidad legal, civil o médica a los organizadores, marcas aliadas y al staff ante cualquier incidente, lesión o complicación que pudiera presentarse durante el desarrollo de las actividades físicas o de recuperación del evento."
                </p>
                <button className="bg-green-950/95 hover:bg-green-900/80 text-white font-bold py-2 px-4 rounded font-runner" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    )
}