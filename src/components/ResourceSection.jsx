import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiFolder, HiFolderOpen } from 'react-icons/hi'
import FileItem from './FileItem'
import SectionTitle from './SectionTitle'

function FolderAccordion({ folder }) {
    const [isOpen, setIsOpen] = useState(false)
    const files = folder.children?.filter(c => c.type === 'file') || []
    const subfolders = folder.children?.filter(c => c.type === 'folder') || []
    const hasContent = files.length > 0 || subfolders.length > 0

    return (
        <div className="border border-primary/5 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
            <button
                onClick={() => hasContent && setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    {isOpen ? (
                        <HiFolderOpen className="w-5 h-5 text-folder" />
                    ) : (
                        <HiFolder className="w-5 h-5 text-folder" />
                    )}
                    <span className="font-semibold text-sm">{folder.title}</span>
                </div>
                {hasContent && (
                    <HiChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                )}
            </button>

            <AnimatePresence>
                {isOpen && hasContent && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-4 space-y-2">
                            {subfolders.map((sf, i) => (
                                <FolderAccordion key={i} folder={sf} />
                            ))}
                            {files.map((file, i) => (
                                <FileItem key={i} file={file} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function ResourceSection({ ktpFiles, olympiadData }) {
    const [activeTab, setActiveTab] = useState('ktp')

    const tabs = [
        { id: 'ktp', label: 'КТП 2025-2026', emoji: '📋' },
        { id: 'olympiad', label: 'Олимпиада', emoji: '🏆' },
    ]

    return (
        <section id="resources" className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <SectionTitle
                    title="Кошумча ресурстар"
                    subtitle="Календардык-тематикалык пландар жана олимпиада материалдары"
                />

                {/* Tabs */}
                <div className="flex justify-center gap-3 mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all cursor-pointer ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                                    : 'bg-white/80 backdrop-blur-sm text-text border border-primary/5 hover:border-primary/20'
                                }`}
                        >
                            <span>{tab.emoji}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'ktp' && (
                        <motion.div
                            key="ktp"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-primary/5 border border-primary/5 p-6">
                                <h3 className="font-bold text-lg gradient-text mb-4 flex items-center gap-2">
                                    📋 Календардык-тематикалык пландар (2025-2026)
                                </h3>
                                <div className="space-y-2">
                                    {ktpFiles.map((file, i) => (
                                        <FileItem key={i} file={file} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'olympiad' && (
                        <motion.div
                            key="olympiad"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-primary/5 border border-primary/5 p-6">
                                <h3 className="font-bold text-lg gradient-text mb-4 flex items-center gap-2">
                                    🏆 Олимпиада материалдары
                                </h3>
                                <div className="space-y-3">
                                    {olympiadData.map((item, i) => (
                                        <FolderAccordion key={i} folder={item} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
