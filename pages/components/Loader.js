export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-green-900 border-t-green-500 rounded-full animate-spin"></div>
        <p className="text-white text-sm">Cargando video...</p>
      </div>
    </div>
  );
}
