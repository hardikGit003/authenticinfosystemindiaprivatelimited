import { redirect } from "next/navigation";

export default function DevelopmentSystemPage() {
  redirect("/configuration?system=development");
}