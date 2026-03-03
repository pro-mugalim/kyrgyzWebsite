import { motion } from 'framer-motion'
import { HiPhone, HiChatAlt2 } from 'react-icons/hi'

export default function Contact() {
    const phone = '0555959489'
    const whatsappUrl = `https://wa.me/996${phone.slice(1)}`

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-bg">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-primary/5 border border-primary/5 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-violet-700 via-purple-600 to-violet-700 px-8 py-8 text-center">
                        <h2 className="text-3xl font-extrabold text-white mb-2 font-[Montserrat]">
                            Байланыш
                        </h2>
                        <p className="text-white/60 text-sm">
                            Толук маалымат алуу жана катталуу үчүн байланышыңыз
                        </p>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Contact info */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <a
                                href={`tel:+996${phone.slice(1)}`}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors group"
                            >
                                <div className="p-3 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform shadow-md shadow-violet-500/20">
                                    <HiPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary font-medium">Телефон</p>
                                    <p className="font-bold text-primary">{phone}</p>
                                </div>
                            </a>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors group"
                            >
                                <div className="p-3 bg-green-500 rounded-xl text-white group-hover:scale-110 transition-transform shadow-md shadow-green-500/20">
                                    <HiChatAlt2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary font-medium">WhatsApp</p>
                                    <p className="font-bold text-green-700">Жазуу →</p>
                                </div>
                            </a>
                        </div>

                        {/* CTA */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-green-500/20 text-lg"
                        >
                            💬 WhatsApp аркылуу катталуу
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
