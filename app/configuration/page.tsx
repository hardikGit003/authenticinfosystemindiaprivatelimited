import Configurator from "./Configurator";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const validPresets = ["basic", "office", "development", "creator", "gaming", "workstation"] as const;

type ValidPreset = (typeof validPresets)[number];

export default function ConfigurationPage({ searchParams }: 

{ searchParams?: { system?: string } }) 
{
  const system = (searchParams?.system ?? "basic") as string;
  const defaultSystem = validPresets.includes(system as ValidPreset) ? (system as ValidPreset) : "basic";

  return (
    <>
      <Navbar />
      <Configurator defaultSystem={defaultSystem} />
      <Footer />
    </>
  );
}
