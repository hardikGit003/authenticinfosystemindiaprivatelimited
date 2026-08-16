export default function MyProductsPage() {
  const brands = [
    "Lenovo",
    "Dell",
    "HP",
    "ASUS",
    "Acer",
    "MSI",
    "Cisco",
    "TP-Link",
    "Logitech",
    "BenQ",
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          My Products
        </h1>

        <p className="text-gray-400 mb-12">
          Browse products by brand.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="border border-gray-700 rounded-2xl p-8 text-center hover:border-white transition"
            >
              <h2 className="text-xl font-semibold">
                {brand}
              </h2>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}