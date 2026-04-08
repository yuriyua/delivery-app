import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    const [user, setUser] = useState<{ name: string } | null>(null)

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <span className="text-white text-xl font-bold">D</span>
                        </div>
                        <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                            Delivery APP
                        </span>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
                            <a href="#" className="hover:text-indigo-600 transition-colors">Services</a>
                            <a href="#" className="hover:text-indigo-600 transition-colors">Business</a>
                        </div>

                        {user ? (
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-indigo-600">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-slate-900 text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <main>
                {/* Hero Section */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="max-w-3xl">
                            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
                                Deliver <span className="text-indigo-600">anything</span> <br />
                                to your door.
                            </h1>
                            <p className="text-xl text-slate-500 max-w-xl leading-relaxed mb-12">
                                From documents to dinner, we handle every delivery with precision.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                                <input
                                    type="text"
                                    placeholder="Where to deliver?"
                                    className="flex-1 px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600"
                                />
                                <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10" />
                </section>
                {/* Categories */}
                <section className="max-w-7xl mx-auto px-6 pb-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Documents', icon: '📄', desc: 'Secure & Instant' },
                            { name: 'Groceries', icon: '🛒', desc: 'Fresh from market' },
                            { name: 'Ecommerce', icon: '📦', desc: 'Shop to home' },
                            { name: 'Gifts', icon: '🎁', desc: 'Make someone happy' }
                        ].map((service) => (
                            <div key={service.name} className="group p-8 bg-white border border-slate-100 rounded-[32px] hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer">
                                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                                <p className="text-slate-400 text-sm">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-slate-50 border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
                    © 2026 Delivery APP. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
