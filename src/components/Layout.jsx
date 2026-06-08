import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="min-h-screen bg-[#120E1B]">
            {/* ✅ NAVBAR ATAS: PENUH KIRI KANAN LAYAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 
                            bg-[#120E1B]/80 backdrop-blur-md 
                            border-b border-purple-500/10 
                            px-0 py-4">

                {/* ✅ ISI NAVBAR: DIBATASI LEBARNYA SAMA DENGAN HOME */}
                <div className="max-w-md mx-auto px-4 flex justify-between items-center">

                    {/* LOGO */}
                    <Link to="/" className="text-purple-neon font-bold text-lg">
                        DreamInk
                    </Link>

                    {/* MENU KANAN */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-purple-neon transition-colors"
                        >
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-7.43 2.52c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                            </svg>
                            <span className="hidden sm:inline">Admin</span>
                        </Link>

                        
                    </div>
                </div>
            </nav>


            {/* ✅ NAVIGASI BAWAH: TETAP ADA SEPERTI AWAL */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 
                            bg-[#120E1B]/80 backdrop-blur-md 
                            border-t border-purple-500/10 
                            px-0 py-3 md:hidden">

                <div className="max-w-md mx-auto px-4 flex justify-around items-center">

                    {/* Home */}
                    <Link
                        to="/"
                        className="flex flex-col items-center gap-1 text-xs text-gray-300 hover:text-purple-neon transition-colors"
                    >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h5v8z" />
                        </svg>
                        <span>Home</span>
                    </Link>

                    {/* Gallery */}
                    <Link
                        to="/gallery"
                        className="flex flex-col items-center gap-1 text-xs text-gray-300 hover:text-purple-neon transition-colors"
                    >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                        </svg>
                        <span>Gallery</span>
                    </Link>

                    {/* Request */}
                    <Link
                        to="/request"
                        className="flex flex-col items-center gap-1 text-xs text-gray-300 hover:text-purple-neon transition-colors"
                    >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6V4h12v10zm-6-1c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
                        </svg>
                        <span>Request</span>
                    </Link>

                    {/* Profile */}
                    <Link
                        to="/profile"
                        className="flex flex-col items-center gap-1 text-sm text-gray-300 hover:text-purple-neon transition-colors duration-200"
                    >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span className="text-[11px] md:text-sm">Profile</span>
                    </Link>
                </div>
            </nav>


            {/* ✅ ISI KONTEN: DIKASIH JARAK DI ATAS BIAR TERTUTUP NAVBAR */}
            <main className="pt-16 pb-20 max-w-md mx-auto">
                <Outlet />
            </main>
        </div>
    )
}