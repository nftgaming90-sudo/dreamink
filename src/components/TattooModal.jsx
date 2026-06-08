export default function TattooModal({ data, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="glass max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
                <img src={data.image_url} alt={data.title} className="w-full h-64 object-cover" />
                <div className="p-5 space-y-3">
                    <h3 className="text-2xl font-bold">{data.title}</h3>
                    <p className="text-purple-light">{data.category}</p>
                    <p className="text-gray-300">{data.description}</p>
                    <button onClick={onClose} className="btn-neon w-full">Tutup</button>
                </div>
            </div>
        </div>
    )
}