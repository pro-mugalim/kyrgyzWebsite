import { HiOutlineDocumentText, HiOutlinePresentationChartBar, HiOutlinePhotograph, HiOutlineEye, HiOutlineDownload } from 'react-icons/hi'
import { getFileTypeInfo, getPreviewUrl, getDownloadUrl, extractFileId } from '../utils/driveHelpers'
import { usePreview } from '../context/PreviewContext'

const iconMap = {
    document: HiOutlineDocumentText,
    presentation: HiOutlinePresentationChartBar,
    pdf: HiOutlineDocumentText,
    image: HiOutlinePhotograph,
    file: HiOutlineDocumentText,
}

export default function FileItem({ file }) {
    const { openPreview } = usePreview()
    const info = getFileTypeInfo(file.title)
    const Icon = iconMap[info.icon] || HiOutlineDocumentText
    const fileId = extractFileId(file.link)

    const handleView = () => {
        if (fileId) {
            openPreview(getPreviewUrl(file.link), file.title)
        } else {
            window.open(file.link, '_blank')
        }
    }

    const handleDownload = () => {
        if (fileId) {
            window.open(getDownloadUrl(file.link), '_blank')
        } else {
            window.open(file.link, '_blank')
        }
    }

    // Clean up filename display (remove trailing extensions for readability)
    const displayName = file.title
        .replace(/\.(docx?|pptx?|pptm|pdf|png|jpe?g|jfif)$/i, '')
        .replace(/\s*\(\d+\)\s*$/, '')
        .trim()

    return (
        <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/5 hover:border-primary/15 hover:shadow-md hover:shadow-primary/5 transition-all group">
            {/* File type badge */}
            <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${info.colorClass}`}>
                <Icon className="w-5 h-5" />
            </div>

            {/* Filename */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate" title={file.title}>
                    {displayName}
                </p>
                <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 ${info.colorClass}`}>
                    {info.label}
                </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
                <button
                    onClick={handleView}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/5 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:text-white rounded-xl transition-all cursor-pointer hover:shadow-md hover:shadow-primary/20"
                    title="Көрүү"
                >
                    <HiOutlineEye className="w-4 h-4" />
                    <span className="hidden sm:inline">Көрүү</span>
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-accent-dark bg-accent/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-500 hover:text-white rounded-xl transition-all cursor-pointer hover:shadow-md hover:shadow-accent/20"
                    title="Жүктөө"
                >
                    <HiOutlineDownload className="w-4 h-4" />
                    <span className="hidden sm:inline">Жүктөө</span>
                </button>
            </div>
        </div>
    )
}
