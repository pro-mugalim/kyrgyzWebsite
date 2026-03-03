import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiFolder, HiFolderOpen, HiExternalLink } from 'react-icons/hi'
import FileItem from './FileItem'
import SectionTitle from './SectionTitle'
import { sortClasses, countFiles } from '../utils/driveHelpers'

/* ─── Recursive content renderer ─── */
function ContentTree({ items, depth = 0 }) {
    const [openFolders, setOpenFolders] = useState(new Set())

    const folders = items.filter(i => i.type === 'folder')
    const files = items.filter(i => i.type === 'file')

    const toggleFolder = (idx) => {
        setOpenFolders(prev => {
            const next = new Set(prev)
            next.has(idx) ? next.delete(idx) : next.add(idx)
            return next
        })
    }

    return (
        <div className={depth > 0 ? 'ml-3 sm:ml-5 pl-3 sm:pl-4 border-l-2 border-violet-200/50' : ''}>
            {/* Folders first */}
            {folders.map((folder, i) => {
                const isOpen = openFolders.has(i)
                const hasChildren = folder.children && folder.children.length > 0

                return (
                    <div key={`folder-${i}`} className="mb-2">
                        <button
                            onClick={() => hasChildren ? toggleFolder(i) : null}
                            className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${isOpen
                                    ? 'bg-folder-bg text-folder'
                                    : 'hover:bg-gray-50 text-text'
                                }`}
                        >
                            {isOpen ? (
                                <HiFolderOpen className="w-5 h-5 text-folder shrink-0" />
                            ) : (
                                <HiFolder className="w-5 h-5 text-folder shrink-0" />
                            )}
                            <span className="font-semibold text-sm flex-1">{folder.title}</span>
                            {hasChildren ? (
                                <HiChevronDown className={`w-4 h-4 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                            ) : (
                                <a
                                    href={folder.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="text-xs text-primary hover:text-accent font-medium flex items-center gap-1"
                                >
                                    Ачуу <HiExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </button>

                        <AnimatePresence>
                            {isOpen && hasChildren && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-1">
                                        <ContentTree items={folder.children} depth={depth + 1} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )
            })}

            {/* Files */}
            {files.length > 0 && (
                <div className="space-y-1.5 mt-1">
                    {files.map((file, i) => (
                        <FileItem key={`file-${i}`} file={file} />
                    ))}
                </div>
            )}
        </div>
    )
}

/* ─── Main ClassBrowser component ─── */
export default function ClassBrowser({ classData }) {
    const sortedClasses = useMemo(() => sortClasses(classData), [classData])
    const [selectedClass, setSelectedClass] = useState(0)
    const [expandedQuarters, setExpandedQuarters] = useState(new Set([0]))

    const currentClass = sortedClasses[selectedClass]
    const quarters = currentClass?.children?.filter(c => c.type === 'folder') || []
    const directFiles = currentClass?.children?.filter(c => c.type === 'file') || []

    const toggleQuarter = (idx) => {
        setExpandedQuarters(prev => {
            const next = new Set(prev)
            next.has(idx) ? next.delete(idx) : next.add(idx)
            return next
        })
    }

    const handleClassChange = (idx) => {
        setSelectedClass(idx)
        setExpandedQuarters(new Set([0]))
    }

    return (
        <section id="classes" className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <SectionTitle
                    title="Класстар боюнча материалдар"
                    subtitle="1-11-класска чейинки кыргыз тили жана адабияты сабактары үчүн даяр материалдар"
                />

                {/* Class selector tabs */}
                <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-4 mb-8">
                    {sortedClasses.map((cls, i) => {
                        const classNum = cls.title.match(/\d+/)?.[0] || '?'
                        const fileCount = countFiles(cls.children || [])
                        const isSelected = i === selectedClass

                        return (
                            <button
                                key={i}
                                onClick={() => handleClassChange(i)}
                                className={`shrink-0 flex flex-col items-center justify-center min-w-[72px] px-4 py-3 rounded-2xl font-bold transition-all cursor-pointer ${isSelected
                                        ? 'bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-violet-500/25 scale-105'
                                        : 'bg-white/80 backdrop-blur-sm text-text hover:bg-primary/5 border border-primary/5 hover:border-primary/20'
                                    }`}
                            >
                                <span className="text-2xl leading-none">{classNum}</span>
                                <span className={`text-[10px] mt-1 font-medium ${isSelected ? 'text-white/70' : 'text-text-secondary'}`}>
                                    класс
                                </span>
                                {fileCount > 0 && (
                                    <span className={`text-[9px] mt-0.5 px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-cyan-400/30 text-cyan-100' : 'bg-primary/5 text-text-secondary'
                                        }`}>
                                        {fileCount} файл
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Selected class content */}
                <motion.div
                    key={selectedClass}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg shadow-primary/5 border border-primary/5 overflow-hidden"
                >
                    {/* Class header */}
                    <div className="px-6 py-5 bg-gradient-to-r from-violet-700 via-purple-600 to-violet-700">
                        <h3 className="text-xl font-bold text-white">{currentClass?.title}</h3>
                        <p className="text-white/50 text-sm mt-1">
                            {quarters.length} чейрек • {countFiles(currentClass?.children || [])} материал
                        </p>
                    </div>

                    {/* Quarters */}
                    <div className="divide-y divide-gray-100">
                        {quarters.map((quarter, qi) => {
                            const isExpanded = expandedQuarters.has(qi)
                            const qFileCount = countFiles(quarter.children || [])

                            return (
                                <div key={qi}>
                                    <button
                                        onClick={() => toggleQuarter(qi)}
                                        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${isExpanded ? 'bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-md shadow-cyan-500/20' : 'bg-primary/5 text-text-secondary'
                                                }`}>
                                                {qi + 1}
                                            </div>
                                            <div className="text-left">
                                                <span className="font-semibold text-text">{quarter.title}</span>
                                                <span className="text-xs text-text-secondary ml-2">({qFileCount} файл)</span>
                                            </div>
                                        </div>
                                        <HiChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''
                                            }`} />
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-5">
                                                    <ContentTree items={quarter.children || []} />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>

                    {/* Direct files (if any at class root level) */}
                    {directFiles.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-100">
                            <h4 className="font-semibold text-sm text-text-secondary mb-3">Кошумча файлдар</h4>
                            <div className="space-y-1.5">
                                {directFiles.map((file, i) => (
                                    <FileItem key={i} file={file} />
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
