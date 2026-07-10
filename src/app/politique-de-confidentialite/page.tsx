import type { Metadata } from "next";
import LegalDocView from "@/components/LegalDocView";
import { getLegalDoc } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getLegalDoc("politique-de-confidentialite")!;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: "/politique-de-confidentialite" },
  };
}

export default function ConfidentialitePage() {
  const doc = getLegalDoc("politique-de-confidentialite")!;
  return <LegalDocView doc={doc} />;
}
