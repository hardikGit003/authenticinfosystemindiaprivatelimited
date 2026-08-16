import Link from "next/link";

const systemCategories = [
  {
    key: "basic",
    title: "Basic System",
    bestFor: "Students • Home Users • Everyday Tasks",
    color: "from-blue-500 to-cyan-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    key: "office",
    title: "Office System",
    bestFor: "Businesses • Office Staff • Accounting",
    color: "from-indigo-500 to-blue-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    key: "development",
    title: "Development System",
    bestFor: "Developers • Programmers • DevOps",
    color: "from-purple-500 to-indigo-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    key: "creator",
    title: "Editing / Creator",
    bestFor: "Designers • Editors • Creators",
    color: "from-pink-500 to-rose-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    key: "gaming",
    title: "Gaming System",
    bestFor: "Gamers • Streamers • eSports",
    color: "from-emerald-500 to-teal-400",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    key: "workstation",
    title: "Power Machine",
    bestFor: "AI • Engineering • CAD • Research",
    color: "from-orange-500 to-red-500",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
];

export default function ConfigurationSection() {
  return (
    <section id="configuration" className="configuration-section relative">
      <div className="w-full">
        
        {/* HUGE PARENT CARD */}
        <div className="w-full bg-white border border-gray-200 shadow-2xl rounded-[2.5rem] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-50 blur-[80px] pointer-events-none"></div>

          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 mb-6 tracking-tight">
              Start Your Build.
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Select a category that matches your workflow. We'll guide you to the perfect configuration for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {systemCategories.map((system) => (
              <Link
                key={system.key}
                href={`/configuration?system=${system.key}`}
                className="group flex flex-col p-8 rounded-[2rem] bg-[#0A0F1C] border border-gray-800 hover:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-all duration-500 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${system.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}></div>
                
                <div className="mb-8 flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-800/50 border border-gray-700/50 text-gray-300 group-hover:text-white group-hover:border-transparent relative z-10 overflow-hidden transition-all duration-500 shadow-sm`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${system.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      {system.icon}
                    </div>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 group-hover:bg-blue-500 group-hover:border-transparent group-hover:text-white transition-all duration-500 -rotate-45 group-hover:rotate-0 shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {system.title}
                  </h3>
                  <div className="w-12 h-1 bg-gray-800 rounded-full mb-4 group-hover:w-full transition-all duration-500">
                    <div className={`h-full rounded-full bg-gradient-to-r ${system.color} w-0 group-hover:w-full transition-all duration-700 delay-100`}></div>
                  </div>
                  <p className="text-[0.65rem] text-gray-500 uppercase tracking-widest mb-2 font-bold">Ideal For</p>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">
                    {system.bestFor}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
