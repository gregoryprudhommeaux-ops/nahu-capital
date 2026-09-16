import { Site } from "@/components/site";
import { getDictionary } from "@/lib/copy";

export const dynamic = "force-static";

export default function Page() {
  return <Site locale="es" dict={getDictionary("es")} />;
}
