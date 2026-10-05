import { redirect } from "next/navigation";

export default function EnterpriseConfigurationPage() {
  redirect("/configuration?system=enterprise");
}
