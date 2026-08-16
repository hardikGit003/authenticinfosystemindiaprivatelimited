export default function BasicSystemPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          Basic System
        </h1>

        <div className="border border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl mb-6">
            Recommended Configuration
          </h2>

          <div className="space-y-4">
            <p>Processor: Intel Core i3 / Ryzen 3</p>
            <p>RAM: 8GB DDR4</p>
            <p>Storage: 256GB SSD</p>
            <p>Graphics: Integrated Graphics</p>
            <p>Best For: Browsing, Online Classes, Office Documents</p>
          </div>

          <button className="mt-10 px-6 py-3 bg-white text-black rounded-lg font-medium">
            Request Quote
          </button>
        </div>

      </div>
    </main>
  );
}