import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiAcademicCap, HiBookOpen, HiDocumentText, HiClipboardList } from 'react-icons/hi'

function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    const start = Date.now()
                    const animate = () => {
                        const elapsed = Date.now() - start
                        const progress = Math.min(elapsed / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3)
                        setCount(Math.floor(eased * target))
                        if (progress < 1) requestAnimationFrame(animate)
                    }
                    requestAnimationFrame(animate)
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target, duration])

    return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
    { icon: HiAcademicCap, value: 11, suffix: '', label: 'Класс', color: 'from-violet-500 to-purple-600' },
    { icon: HiBookOpen, value: 4, suffix: '', label: 'Чейрек', color: 'from-cyan-400 to-teal-500' },
    { icon: HiDocumentText, value: 500, suffix: '+', label: 'Материал', color: 'from-pink-500 to-rose-500' },
    { icon: HiClipboardList, value: 143, suffix: '', label: 'ЖРТ тест', color: 'from-amber-400 to-orange-500' },
]

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Modern mesh gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E1B4B]" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-violet-600/30 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
                {/* Floating grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 w-full">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-cyan-300 rounded-full text-sm font-semibold mb-8 border border-white/10">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                            Мугалимдер үчүн ресурстар
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight"
                    >
                        Кыргыз Тили{' '}
                        <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                            Мугалимдин
                        </span>{' '}
                        Китепканасы
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl text-white/60 mb-12 max-w-2xl leading-relaxed"
                    >
                        1-11-класска чейинки кыргыз тили жана адабияты боюнча даяр сабак
                        материалдары. Бардыгы бир жерде — ыңгайлуу жана тез.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button
                            onClick={() => document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-violet-600/25 transition-all hover:shadow-violet-500/40 hover:-translate-y-0.5 cursor-pointer"
                        >
                            Материалдарды көрүү
                        </button>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold text-lg rounded-2xl border border-white/20 transition-all hover:-translate-y-0.5 cursor-pointer"
                        >
                            Байланыш
                        </button>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
                >
                    {stats.map(({ icon: Icon, value, suffix, label, color }, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -4 }}
                            className="relative bg-white/[0.07] backdrop-blur-lg rounded-2xl p-5 border border-white/10 group hover:bg-white/[0.12] transition-colors"
                        >
                            <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${color} mb-3`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-3xl font-black text-white tracking-tight">
                                <AnimatedCounter target={value} suffix={suffix} />
                            </div>
                            <div className="text-sm text-white/40 font-medium mt-1">{label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
