const footerLinks = [
    { id: 'hero', label: 'Башкы бет' },
    { id: 'classes', label: 'Класстар' },
    { id: 'jrt', label: 'ЖРТ' },
    { id: 'resources', label: 'Ресурстар' },
    { id: 'contact', label: 'Байланыш' },
]

export default function Footer() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <footer className="relative bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E1B4B] text-white overflow-hidden">
            {/* Decorative */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl" />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-xl flex items-center justify-center">
                                <span className="text-white text-lg font-black">K</span>
                            </div>
                            <span className="font-bold text-xl font-[Montserrat]">Китепкана</span>
                        </div>
                        <p className="text-white/40 text-sm">
                            Кыргыз тили мугалимдери үчүн ресурстар
                        </p>
                    </div>

                    {/* Nav links */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {footerLinks.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className="text-sm text-white/40 hover:text-cyan-300 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/5"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 text-center">
                    <p className="text-sm text-white/30">
                        © {new Date().getFullYear()} Кыргыз Тили Китепканасы
                    </p>
                </div>
            </div>
        </footer>
    )
}
