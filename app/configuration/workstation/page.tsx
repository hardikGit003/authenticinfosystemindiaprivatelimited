import { redirect } from "next/navigation";

export default function WorkstationPage() {
  redirect("/configuration?system=workstation");
}