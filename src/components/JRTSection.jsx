import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { HiSearch, HiX } from 'react-icons/hi'
import FileItem from './FileItem'
import SectionTitle from './SectionTitle'
import { categorizeJRTFiles } from '../utils/driveHelpers'

export default function JRTSection({ files }) {
    const [activeCategory, setActiveCategory] = useState('Баары')
    const [searchQuery, setSearchQuery] = useState('')

    const categories = useMemo(() => categorizeJRTFiles(files), [files])
    const categoryNames = Object.keys(categories)

    const displayFiles = useMemo(() => {
        let result = categories[activeCategory] || files
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            result = result.filter(f => f.title.toLowerCase().includes(q))
        }
        return result
    }, [activeCategory, searchQuery, categories, files])

    return (
        <section id="jrt" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-bg to-white">
            <div className="max-w-7xl mx-auto">
                <SectionTitle
                    title="ЖРТ — Жалпы Республикалык Тест"
                    subtitle={`Тесттерге даярдануу үчүн ${files.length} материал: аналогиялар, окуу тексттери, грамматика, презентациялар`}
                />

                {/* Search bar */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Материал издөө..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-10 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                            >
                                <HiX className="w-4 h-4 text-text-secondary" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category tabs */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-6">
                    {categoryNames.map(name => {
                        const count = categories[name]?.length || 0
                        const isActive = activeCategory === name

                        return (
                            <button
                                key={name}
                                onClick={() => setActiveCategory(name)}
                                className={`shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all cursor-pointer ${isActive
                                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/20'
                                        : 'bg-white/80 backdrop-blur-sm text-text-secondary hover:bg-primary/5 border border-primary/5'
                                    }`}
                            >
                                {name}
                                <span className={`ml-1.5 text-xs ${isActive ? 'text-white/70' : 'text-text-secondary'}`}>
                                    ({count})
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Results count */}
                <p className="text-sm text-text-secondary mb-4">
                    {displayFiles.length} материал табылды
                    {searchQuery && <span className="text-primary font-medium"> — «{searchQuery}»</span>}
                </p>

                {/* File grid */}
                {displayFiles.length > 0 ? (
                    <motion.div
                        key={activeCategory + searchQuery}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="grid gap-2 md:grid-cols-2"
                    >
                        {displayFiles.map((file, i) => (
                            <FileItem key={i} file={file} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-16 text-text-secondary">
                        <p className="text-lg">Материал табылган жок</p>
                        <p className="text-sm mt-1">Издөө суроосун өзгөртүп көрүңүз</p>
                    </div>
                )}
            </div>
        </section>
    )
}
