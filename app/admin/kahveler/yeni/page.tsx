import { CoffeeEditor } from "@/components/admin/coffee-editor";
import { requireAdmin } from "@/lib/admin/session";

export default async function NewCoffeePage() {
  await requireAdmin();
  return <CoffeeEditor />;
}
