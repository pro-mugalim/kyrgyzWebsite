/**
 * Extract Google Drive file ID from a Drive link
 */
export function extractFileId(link) {
    const match = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
}

/**
 * Convert a Drive file link to an embeddable preview URL
 */
export function getPreviewUrl(link) {
    const id = extractFileId(link)
    return id ? `https://drive.google.com/file/d/${id}/preview` : link
}

/**
 * Convert a Drive file link to a direct download URL
 */
export function getDownloadUrl(link) {
    const id = extractFileId(link)
    return id ? `https://drive.google.com/uc?export=download&id=${id}` : link
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename) {
    const match = filename.match(/\.(\w+)$/)
    return match ? match[1].toLowerCase() : ''
}

/**
 * Get file type display info (color classes, label) based on filename
 */
export function getFileTypeInfo(filename) {
    const ext = getFileExtension(filename)
    switch (ext) {
        case 'docx': case 'doc':
            return { colorClass: 'bg-doc-bg text-doc', label: 'DOC', icon: 'document' }
        case 'pptx': case 'pptm': case 'ppt':
            return { colorClass: 'bg-ppt-bg text-ppt', label: 'PPT', icon: 'presentation' }
        case 'pdf':
            return { colorClass: 'bg-pdf-bg text-pdf', label: 'PDF', icon: 'pdf' }
        case 'png': case 'jpg': case 'jpeg': case 'jfif':
            return { colorClass: 'bg-img-bg text-img', label: 'IMG', icon: 'image' }
        default:
            return { colorClass: 'bg-gray-100 text-gray-600', label: 'FILE', icon: 'file' }
    }
}

/**
 * Sort class items numerically by their class number
 */
export function sortClasses(classes) {
    return [...classes].sort((a, b) => {
        const numA = parseInt(a.title.match(/\d+/)?.[0] || '0')
        const numB = parseInt(b.title.match(/\d+/)?.[0] || '0')
        return numA - numB
    })
}

/**
 * Count total files recursively in a data tree
 */
export function countFiles(items) {
    let count = 0
    for (const item of items) {
        if (item.type === 'file') count++
        if (item.children) count += countFiles(item.children)
    }
    return count
}

/**
 * Categorize ЖРТ files by type prefix
 */
export function categorizeJRTFiles(files) {
    const categories = {
        'Баары': files,
        'Аналогия': [],
        'Окуу тексти (ОТ)': [],
        'Грамматика (ПГР)': [],
        'Синтаксис (СТ)': [],
        'Сынамык тесттер': [],
        'Пробный тесттер': [],
        'Жооптор': [],
        'Презентациялар': [],
        'Башка': [],
    }

    for (const file of files) {
        const t = file.title
        if (t.startsWith('АНАЛОГИЯ')) categories['Аналогия'].push(file)
        else if (t.startsWith('ОТ-') || t.startsWith('ОТ_')) categories['Окуу тексти (ОТ)'].push(file)
        else if (t.startsWith('ПГР-')) categories['Грамматика (ПГР)'].push(file)
        else if (t.startsWith('СТ-')) categories['Синтаксис (СТ)'].push(file)
        else if (t.includes('СЫНАМЫК ТЕСТ')) categories['Сынамык тесттер'].push(file)
        else if (t.includes('пробный тест')) categories['Пробный тесттер'].push(file)
        else if (t.includes('жооптору') || t.includes('ЖООП') || t.includes('ЖООБУ')) categories['Жооптор'].push(file)
        else if (/\.(pptx?|pptm)$/i.test(t)) categories['Презентациялар'].push(file)
        else categories['Башка'].push(file)
    }

    return Object.fromEntries(
        Object.entries(categories).filter(([_, v]) => v.length > 0)
    )
}
