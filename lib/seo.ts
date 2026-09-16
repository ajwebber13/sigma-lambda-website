import type { Metadata } from "next";

export const siteUrl = "https://www.sigmalambda.org";
const siteName = "Sigma Lambda Chapter";

export function buildMetadata({
  title,
  description,
  path = "",
  absolute = false,
}: {
  title: string;
  description: string;
  path?: string;
  absolute?: boolean;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const ogTitle = absolute ? title : `${title} | ${siteName}`;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
