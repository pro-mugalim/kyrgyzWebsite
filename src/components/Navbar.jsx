import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
    { id: 'hero', label: 'Башкы бет' },
    { id: 'classes', label: 'Класстар' },
    { id: 'jrt', label: 'ЖРТ' },
    { id: 'resources', label: 'Ресурстар' },
    { id: 'contact', label: 'Байланыш' },
]

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('hero')
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Only transition after scrolling fully past the hero (dark violet) section
            const heroEl = document.getElementById('hero')
            const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : window.innerHeight
            setScrolled(window.scrollY > heroBottom - 64) // 64px = navbar height
            if (window.scrollY < 100) {
                setActiveSection('hero')
                return
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: '-20% 0px -70% 0px' }
        )

        navLinks.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setMobileOpen(false)
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-primary/5'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
                            <span className="text-white text-lg font-black">K</span>
                        </div>
                        <span className={`font-bold text-lg tracking-tight font-[Montserrat] transition-colors ${scrolled ? 'text-primary-dark' : 'text-white'
                            }`}>
                            Китепкана
                        </span>
                    </button>

                    {/* Desktop nav */}
                    <div className={`hidden md:flex items-center gap-1 rounded-2xl p-1 transition-all duration-500 ${scrolled
                        ? 'bg-primary/[0.04] border border-primary/10'
                        : 'bg-white/10 backdrop-blur-md border border-white/10'
                        }`}>
                        {navLinks.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer ${activeSection === id
                                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                                    : scrolled
                                        ? 'text-text-secondary hover:text-primary hover:bg-primary/5'
                                        : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`md:hidden p-2 rounded-xl transition-colors cursor-pointer ${scrolled ? 'text-text hover:bg-primary/5' : 'text-white hover:bg-white/10'
                            }`}
                    >
                        {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden bg-white/90 backdrop-blur-xl border-t border-primary/5"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollTo(id)}
                                    className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${activeSection === id
                                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                                        : 'text-text hover:text-primary hover:bg-primary/5'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
