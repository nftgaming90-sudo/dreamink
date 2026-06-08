import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Admin() {
    const [tattoos, setTattoos] = useState([])
    const [form, setForm] = useState({ title: '', category: '', description: '' })
    const [image, setImage] = useState(null)
    const [pesan, setPesan] = useState({ teks: '', tipe: '' })
    const [previewGambar, setPreviewGambar] = useState(null) // 👈 State untuk simpan link pratinjau

    // Ambil data terbaru
    const ambilData = async () => {
        const { data, error } = await supabase.from('tattoos').select('*').order('created_at', { ascending: false })
        if (!error) setTattoos(data)
    }

    useEffect(() => {
        ambilData()
    }, [])

    // 👇 FUNGSI TAMBAHAN: Saat gambar dipilih, langsung buat pratinjau
    const handlePilihGambar = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setImage(file)
        // Buat URL sementara untuk ditampilkan di layar
        const urlPratinjau = URL.createObjectURL(file)
        setPreviewGambar(urlPratinjau)
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        setPesan({ teks: '', tipe: '' })
        if (!image) return setPesan({ teks: '⚠️ Pilih gambar dulu!', tipe: 'eror' })

        try {
            const fileExt = image.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}`
            const { error: errUp } = await supabase.storage.from('tattoo-images').upload(fileName, image)
            if (errUp) throw errUp

            const { data: { publicUrl } } = supabase.storage.from('tattoo-images').getPublicUrl(fileName)
            const { error: errDb } = await supabase.from('tattoos').insert([{ ...form, image_url: publicUrl }])
            if (errDb) throw errDb

            setPesan({ teks: '✅ Berhasil disimpan!', tipe: 'sukses' })
            // 👇 KOSONGKAN FORM & HAPUS PRATINJAUAN SETELAH SUKSES
            setForm({ title: '', category: '', description: '' })
            setImage(null)
            setPreviewGambar(null) // <-- Hapus gambar pratinjau
            ambilData()

        } catch (err) {
            setPesan({ teks: '❌ Gagal: ' + err.message, tipe: 'eror' })
        }
    }

    const handleDelete = async (id, urlGambar) => {
        if (!confirm('Yakin mau hapus?')) return

        try {
            const { data, error: errHapus } = await supabase
                .from('tattoos')
                .delete()
                .eq('id', id)
                .select()

            if (errHapus) throw errHapus
            if (data.length === 0) throw new Error("Data tidak ada")

            const namaFile = urlGambar.split('/').pop()
            await supabase.storage.from('tattoo-images').remove([namaFile])

            setPesan({ teks: '✅ BERHASIL DIHAPUS!', tipe: 'sukses' })
            ambilData()

        } catch (err) {
            setPesan({ teks: '❌ ' + err.message, tipe: 'eror' })
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold">Admin Panel</h2>

            {pesan.teks && (
                <div className={`p-3 rounded-xl text-center font-medium ${pesan.tipe === 'sukses' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {pesan.teks}
                </div>
            )}

            <form onSubmit={handleUpload} className="glass p-6 space-y-4">
                <input
                    type="text"
                    placeholder="Judul"
                    className="input-glass"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Kategori"
                    className="input-glass"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Deskripsi"
                    className="input-glass"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                />

                {/* 👇 BAGIAN PILIH GAMBAR + PRATINJAUAN */}
                <div className="space-y-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePilihGambar} // <-- Panggil fungsi baru
                        required
                        className="text-sm text-gray-300 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/40"
                    />

                    {/* 👇 TAMPILAN GAMBAR YANG DIPILIH (HANYA MUNCUL KALAU UDAH PILIH) */}
                    {previewGambar && (
                        <div className="mt-3 p-2 border border-dashed border-purple-400/50 rounded-lg w-fit">
                            <p className="text-xs text-purple-300 mb-1">📸 Gambar yang dipilih:</p>
                            <img
                                src={previewGambar}
                                alt="Pratinjau Gambar"
                                className="h-32 w-auto rounded shadow-md object-cover"
                            />
                        </div>
                    )}
                </div>
                {/* 👆 AKHIR BAGIAN PRATINJAUAN */}

                <button type="submit" className="btn-neon w-full">Simpan Karya</button>
            </form>

            <div className="space-y-4">
                {tattoos.map(item => (
                    <div key={item.id} className="glass p-4 flex gap-4 items-center">
                        <img src={item.image_url} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.category}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(item.id, item.image_url)}
                            className="text-red-400 hover:text-red-600 px-3 py-1 rounded-lg hover:bg-red-500/10"
                        >
                            Hapus
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}