import { motion } from 'framer-motion'
import { HiX } from 'react-icons/hi'

export default function PreviewModal({ url, title, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                className="relative w-full max-w-5xl h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-primary/20"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-primary-dark to-primary text-white">
                    <h3 className="text-sm font-semibold truncate pr-4">
                        {title || 'Документти көрүү'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
                        aria-label="Жабуу"
                    >
                        <HiX className="w-5 h-5" />
                    </button>
                </div>

                {/* Iframe */}
                <iframe
                    src={url}
                    className="w-full h-[calc(85vh-52px)]"
                    frameBorder="0"
                    allow="autoplay"
                    title={title || 'Preview'}
                />
            </motion.div>
        </motion.div>
    )
}
