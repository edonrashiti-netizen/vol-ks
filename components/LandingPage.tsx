import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import { getDictionary } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/types";

type Props = {
  locale: Locale;
};

export async function LandingPage({ locale }: Props) {
  const dict = getDictionary(locale);
  const content = await getContent();

  return (
    <>
      <HtmlLang locale={locale} />
      <Header locale={locale} dict={dict} />
      <main>
        <Hero locale={locale} dict={dict} />
        <About locale={locale} dict={dict} />
        <Services locale={locale} dict={dict} services={content.services} />
        <Gallery locale={locale} dict={dict} gallery={content.gallery} />
        <Contact locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
