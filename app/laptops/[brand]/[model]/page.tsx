import { notFound } from "next/navigation";
import { getLaptopBySlug, getLaptopBrandBySlug } from "../../../data/laptopData";
import ProductClientPage from "./ProductClientPage";

interface ProductPageProps {
  params: Promise<{ brand: string; model: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { brand: brandSlug, model: modelSlug } = await params;
  const laptop = getLaptopBySlug(brandSlug, modelSlug);

  if (!laptop) {
    notFound();
  }

  const brand = getLaptopBrandBySlug(laptop.brandSlug);

  if (!brand) {
    notFound();
  }

  return <ProductClientPage laptop={laptop} brand={brand} />;
}
