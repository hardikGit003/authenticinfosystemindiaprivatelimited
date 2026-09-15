import { redirect } from "next/navigation";

export default function OfficeSystemPage() {
  redirect("/configuration?system=office");
}