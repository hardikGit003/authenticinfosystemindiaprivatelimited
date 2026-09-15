import { redirect } from "next/navigation";

export default function BasicSystemPage() {
  redirect("/configuration?system=basic");
}