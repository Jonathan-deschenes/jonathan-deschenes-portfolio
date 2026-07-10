import type { Metadata } from "next";
import LegalDocView from "@/components/LegalDocView";
import { getLegalDoc } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getLegalDoc("conditions-utilisation")!;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: "/conditions-utilisation" },
  };
}

export default function ConditionsUtilisationPage() {
  const doc = getLegalDoc("conditions-utilisation")!;
  return <LegalDocView doc={doc} />;
}
