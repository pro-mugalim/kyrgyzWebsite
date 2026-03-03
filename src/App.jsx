import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClassBrowser from './components/ClassBrowser'
import JRTSection from './components/JRTSection'
import ResourceSection from './components/ResourceSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { PreviewProvider } from './context/PreviewContext'

import classData from '../drive_links_2.json'
import extraData from '../drive_links.json'

const jrtFiles = extraData['ЖРТ'] || []
const ktpFiles = extraData['КТП 2025-2026'] || []
const olympiadData = extraData['ОЛИМПИАДА'] || []

export default function App() {
    return (
        <PreviewProvider>
            <div className="min-h-screen">
                <Navbar />
                <Hero />
                <ClassBrowser classData={classData} />
                <JRTSection files={jrtFiles} />
                <ResourceSection ktpFiles={ktpFiles} olympiadData={olympiadData} />
                <Contact />
                <Footer />
            </div>
        </PreviewProvider>
    )
}
