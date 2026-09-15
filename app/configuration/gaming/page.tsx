import { redirect } from "next/navigation";

export default function GamingSystemPage() {
  redirect("/configuration?system=gaming");
}