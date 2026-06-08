import { Link } from 'react-router-dom'

export default function TattooCard({ data }) {
    return (
        <Link
            to={`/detail/${data.id}`}
            className="group relative block rounded-3xl overflow-hidden bg-[#1a1426] border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-neon/20 hover:border-purple-neon/30"
        >
            {/* Gambar Utama */}
            <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                    src={data.image_url}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            {/* Informasi di Bawah Gambar */}
            <div className="p-3">
                <h3 className="font-semibold text-white text-sm md:text-base truncate">{data.title}</h3>
                <p className="text-xs text-purple-300/80 mt-1">{data.category}</p>
            </div>

            {/* Efek lapisan saat disentuh */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
    )
}