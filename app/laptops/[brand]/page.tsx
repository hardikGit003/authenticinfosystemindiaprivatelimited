import { notFound } from "next/navigation";
import { getLaptopBrandBySlug, getLaptopsByBrand } from "../../data/laptopData";
import BrandClientPage from "./BrandClientPage";

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand: brandSlug } = await params;
  const brand = getLaptopBrandBySlug(brandSlug);

  if (!brand) {
    notFound();
  }

  const laptops = getLaptopsByBrand(brand.slug);

  return <BrandClientPage brand={brand} laptops={laptops} />;
}
