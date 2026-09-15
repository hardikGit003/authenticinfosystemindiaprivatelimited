import Link from "next/link";

const systemCategories = [
  {
    key: "basic",
    title: "Basic System",
    bestFor: "Students • Home Users • Everyday Tasks",
    image: "/Photos/BasicSystem.png",
    btn1: "Start Build",
    btn2: "Configure Now",
  },
  {
    key: "office",
    title: "Office System",
    bestFor: "Businesses • Office Staff • Accounting",
    image: "/Photos/OfficeSystem.png",
    btn1: "Start Build",
    btn2: "Configure Now",
  },
  {
    key: "development",
    title: "Development System",
    bestFor: "Developers • Programmers • DevOps",
    image: "/Photos/DevelopmentSystem.png",
    btn1: "Start Build",
    btn2: "Configure Now",
  },
  {
    key: "creator",
    title: "Editing / Creator",
    bestFor: "Designers • Video Editors • 3D Artists",
    image: "/Photos/Editing%26Creater.png",
    btn1: "Start Build",
    btn2: "Configure Now",
  },
  {
    key: "gaming",
    title: "Gaming System",
    bestFor: "Gamers • Streamers • eSports",
    image: "/Photos/GamingSystem.png",
    btn1: "Start Build",
    btn2: "Configure Now",
  },
  {
    key: "workstation",
    title: "Power Machine",
    bestFor: "AI & ML • Engineering • CAD • Research",
    image: "/Photos/PowerMachine.png",
    btn1: "Start Build",
    btn2: "Configure Now",
  },
];

export default function ConfigurationSection() {
  return (
    <section id="configuration" className="w-full bg-[#042442] py-16 sm:py-20 lg:py-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-2">
            CUSTOM WORKSTATIONS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Start Your Build.
          </h2>
          <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed px-2">
            Select a category that matches your workflow. We&apos;ll guide you to the perfect configuration for your needs.
          </p>
        </div>

        {/* 6 DELL-STYLE PRODUCT CATEGORY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {systemCategories.map((system) => (
            <div
              key={system.key}
              className="bg-white rounded-none sm:rounded-[2px] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group border border-slate-100"
            >
              {/* IMAGE AREA */}
              <div className="w-full h-56 sm:h-64 p-6 bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={system.image}
                  alt={system.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* CARD DETAILS */}
              <div className="p-6 sm:p-7 pt-2 flex flex-col flex-grow justify-between bg-white border-t border-slate-100">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-1.5 tracking-tight group-hover:text-blue-700 transition-colors">
                    {system.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-6 uppercase tracking-wider">
                    {system.bestFor}
                  </p>
                </div>

                {/* DELL-STYLE ACTION BUTTONS */}
                <div className="flex flex-wrap items-center gap-3 mt-auto">
                  <Link
                    href={`/configuration?system=${system.key}`}
                    className="inline-flex items-center justify-center bg-[#0076d6] hover:bg-[#005bb5] text-white text-sm font-semibold px-5 py-2.5 rounded-none sm:rounded-[2px] transition-colors shadow-xs"
                  >
                    {system.btn1}
                  </Link>

                  <Link
                    href={`/configuration?system=${system.key}`}
                    className="inline-flex items-center justify-center bg-[#0076d6] hover:bg-[#005bb5] text-white text-sm font-semibold px-5 py-2.5 rounded-none sm:rounded-[2px] transition-colors shadow-xs"
                  >
                    {system.btn2}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
