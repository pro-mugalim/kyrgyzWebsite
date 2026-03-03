import { motion } from 'framer-motion'

export default function SectionTitle({ title, subtitle, light = false }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
        >
            <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 tracking-tight ${light ? 'text-white' : 'gradient-text'
                }`}>
                {title}
            </h2>
            {subtitle && (
                <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${light ? 'text-white/70' : 'text-text-secondary'
                    }`}>
                    {subtitle}
                </p>
            )}
            <div className="flex items-center justify-center gap-1.5 mt-5">
                <div className="w-8 h-1 rounded-full bg-primary" />
                <div className="w-3 h-1 rounded-full bg-accent" />
                <div className="w-1.5 h-1 rounded-full bg-primary-light" />
            </div>
        </motion.div>
    )
}
