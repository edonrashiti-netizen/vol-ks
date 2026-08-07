import { localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";

export function JsonLd() {
  const payloads = [localBusinessJsonLd(), websiteJsonLd()];

  return (
    <>
      {payloads.map((data) => (
        <script
          key={data["@id"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
