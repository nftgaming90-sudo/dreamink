import { useState } from 'react'

export default function Request() {
    const [form, setForm] = useState({
        nama: '',
        deskripsi: '',
        ukuran: '',
        lokasi: '',
        referensi: ''
    })

    const generateWA = () => {
        const text = `Halo, saya ingin pesan desain tato%0A%0ANama: ${form.nama}%0ADeskripsi: ${form.deskripsi}%0AUkuran: ${form.ukuran}%0ALokasi di tubuh: ${form.lokasi}%0ALink referensi: ${form.referensi}`
        window.open(`https://wa.me/6281234567890?text=${text}`, '_blank')
    }

    return (
        <div className="glass p-6 max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">Pesan Desain Kustom</h2>

            <input
                type="text"
                placeholder="Nama Lengkap"
                className="input-glass"
                value={form.nama}
                onChange={e => setForm({ ...form, nama: e.target.value })}
            />
            <textarea
                placeholder="Jelaskan desain yang kamu inginkan..."
                className="input-glass h-32 resize-none"
                value={form.deskripsi}
                onChange={e => setForm({ ...form, deskripsi: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Ukuran (cm)"
                    className="input-glass"
                    value={form.ukuran}
                    onChange={e => setForm({ ...form, ukuran: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Lokasi di tubuh"
                    className="input-glass"
                    value={form.lokasi}
                    onChange={e => setForm({ ...form, lokasi: e.target.value })}
                />
            </div>
            <input
                type="text"
                placeholder="Link gambar referensi (opsional)"
                className="input-glass"
                value={form.referensi}
                onChange={e => setForm({ ...form, referensi: e.target.value })}
            />

            <button onClick={generateWA} className="btn-neon w-full">Kirim ke WhatsApp</button>
        </div>
    )
}