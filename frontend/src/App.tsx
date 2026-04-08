function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Навігація */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white text-xl font-bold">A</span>
            </div>
            <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              Delivery APP
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-indigo-600 transition-colors">Services</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Business</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
            </div>
            <button className="bg-slate-900 text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
              Get Started
            </button>
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
                The fastest and most reliable service in your city.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                <input
                  type="text"
                  placeholder="Where to deliver?"
                  className="flex-1 px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                />
                <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Декоративний елемент на фоні */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10" />
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Our Services</h2>
              <p className="text-slate-500">Whatever you need, we deliver.</p>
            </div>
            <a href="#" className="text-indigo-600 font-semibold text-sm hover:underline">View all services →</a>
          </div>

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

      <footer className="bg-slate-50 border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale brightness-50">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">A</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Delivery APP</span>
          </div>
          <div className="text-slate-400 text-sm">
            © 2026 Delivery APP. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
