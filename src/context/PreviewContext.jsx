import { createContext, useContext, useState } from 'react'
import PreviewModal from '../components/PreviewModal'

const PreviewContext = createContext()

export function PreviewProvider({ children }) {
    const [preview, setPreview] = useState(null)

    const openPreview = (url, title) => {
        setPreview({ url, title })
    }

    const closePreview = () => setPreview(null)

    return (
        <PreviewContext.Provider value={{ openPreview }}>
            {children}
            {preview && (
                <PreviewModal
                    url={preview.url}
                    title={preview.title}
                    onClose={closePreview}
                />
            )}
        </PreviewContext.Provider>
    )
}

export const usePreview = () => useContext(PreviewContext)
