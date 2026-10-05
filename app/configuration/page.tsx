import { Suspense } from "react";
import Configurator from "./Configurator";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ConfigurationPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-50 pt-28 pb-16 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Configurator />
      </Suspense>
      <Footer />
    </>
  );
}


