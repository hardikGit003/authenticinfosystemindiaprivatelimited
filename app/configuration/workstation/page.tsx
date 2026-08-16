export default function WorkstationPage() {
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "60px" }}>
      <h1>Power Machine / Workstation</h1>

      <h2>Recommended Configuration</h2>

      <p>Processor: Intel Xeon / AMD Threadripper</p>
      <p>RAM: 64GB DDR5</p>
      <p>Storage: 2TB NVMe SSD</p>
      <p>Graphics: RTX 4080 / RTX A Series</p>

      <h3>Best For</h3>

      <ul>
        <li>AI & Machine Learning</li>
        <li>CAD Design</li>
        <li>3D Rendering</li>
        <li>Simulation</li>
        <li>Enterprise Workloads</li>
      </ul>

      <button>Request Quote</button>
    </div>
  );
}