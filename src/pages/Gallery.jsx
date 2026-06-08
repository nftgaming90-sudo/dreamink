import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import TattooModal from '../components/TattooModal'
import TattooCard from '../components/TattooCard'

export default function Gallery() {
    const [tattoos, setTattoos] = useState([])
    const [selected, setSelected] = useState(null)
    const [filter, setFilter] = useState('semua')

    useEffect(() => {
        const load = async () => {
            let q = supabase.from('tattoos').select('*')
            if (filter !== 'semua') q = q.eq('category', filter)
            const { data } = await q
            if (data) setTattoos(data)
        }
        load()
    }, [filter])

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Galeri Karya</h2>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-glass max-w-xs"
            >
                <option value="semua">Semua Kategori</option>
                <option value="realis">Realis</option>
                <option value="tradisional">Tradisional</option>
                <option value="geometris">Geometris</option>
                <option value="minimalis">Minimalis</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tattoos.map(item => (
                    <div key={item.id} onClick={() => setSelected(item)} className="cursor-pointer">
                        <TattooCard data={item} />
                    </div>
                ))}
            </div>

            {selected && <TattooModal data={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}