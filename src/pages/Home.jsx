import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import TattooCard from '../components/TattooCard'

export default function Home() {
    const [tattoos, setTattoos] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('semua')

    const categories = [
        'semua',
        'realis',
        'tradisional',
        'geometris',
        'minimalis',
        'neo-traditional',
        'dotwork',
        'jepang',
        'abstrak'
    ]

    const ambilData = async () => {
        let query = supabase.from('tattoos').select('*').order('created_at', { ascending: false })

        if (category !== 'semua') {
            query = query.eq('category', category)
        }

        if (search) {
            query = query.ilike('title', `%${search}%`)
        }

        const { data, error } = await query.limit(100)
        if (!error) setTattoos(data)
    }

    useEffect(() => {
        ambilData()
        const timer = setInterval(ambilData, 3000)
        return () => clearInterval(timer)
    }, [search, category])

    return (
        <div className="bg-[#120E1B] min-h-screen text-white px-4 py-6 max-w-md mx-auto">

            <div className="mb-8 space-y-2">
                <h1 className="text-[28px] font-bold text-white">AI Tattoo Generator</h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Turn your ideas into stunning tattoo designs with the help of AI. Create unique artwork in seconds.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
                <Link to="/request" className="bg-[#1E182F] rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all shadow-lg shadow-purple-900/10">
                    <div className="text-3xl mb-2">🎨</div>
                    <h3 className="font-semibold text-sm">Create your Tattoo</h3>
                </Link>

                <Link to="/gallery" className="bg-[#1E182F] rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all shadow-lg shadow-purple-900/10">
                    <div className="text-3xl mb-2">✍️</div>
                    <h3 className="font-semibold text-sm">Words and Phrases</h3>
                </Link>
            </div>


            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold">Explore</h2>
                    <span className="text-xs text-purple-400 font-medium">Popular</span>
                </div>

                {/* 👇 BAGIAN KATEGORI DIPERBAIKI: SCROLL BERJALAN TAPI GAK ADA GARISNYA */}
                <div
                    className="flex gap-3 pb-2 overflow-x-auto 
                               [scrollbar-width:none] 
                               [&::-webkit-scrollbar]:hidden"
                >
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat
                                    ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md shadow-purple-500/20'
                                    : 'bg-[#1E182F] text-gray-300 hover:bg-[#2A2240]'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>


            <div className="mb-6">
                <input
                    type="text"
                    placeholder="🔍 Cari karya tato..."
                    className="w-full bg-[#1E182F] border border-purple-500/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>


            <div className="grid grid-cols-2 gap-4">
                {tattoos.length === 0 ? (
                    <div className="col-span-2 text-center py-10 text-gray-500 text-sm">
                        Belum ada karya di kategori ini
                    </div>
                ) : (
                    tattoos.map(item => <TattooCard key={item.id} data={item} />)
                )}
            </div>

        </div>
    )
}