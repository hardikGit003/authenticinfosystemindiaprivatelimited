import { redirect } from "next/navigation";

export default function CreatorSystemPage() {
  redirect("/configuration?system=creator");
}