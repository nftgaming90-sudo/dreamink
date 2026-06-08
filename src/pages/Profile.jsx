export default function Profile() {
    return (
        <div className="glass p-8 max-w-md mx-auto text-center space-y-6">
            <img
                src="https://picsum.photos/id/1012/300/300"
                alt="Artist"
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-purple-neon/50"
            />
            <h2 className="text-2xl font-bold">Ricky Yulianto</h2>
            <p className="text-gray-300">Seniman tato profesional dengan pengalaman lebih dari 7 tahun. Mengkhususkan diri dalam gaya realis dan geometris.</p>

            <div className="flex justify-center gap-4">
                <a href="#" className="text-2xl hover:text-purple-neon">📷</a>
                <a href="#" className="text-2xl hover:text-purple-neon">📘</a>
                <a href="https://wa.me/6285229827840" className="btn-neon">Hubungi WhatsApp</a>
            </div>
        </div>
    )
}