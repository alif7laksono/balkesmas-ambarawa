// app/utils/fonts.ts

import {
  Bodoni_Moda,
  Montserrat,
  Roboto,
  Open_Sans,
  Cinzel,
  Albert_Sans,
  Exo,
  Raleway,
  Cormorant_Garamond,
  Lora,
  Playfair_Display,
  Ibarra_Real_Nova,
  Inter,
} from "next/font/google";

export const inter = Inter({
  subsets: ["cyrillic"],
});

export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});

export const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  style: ["italic", "normal"],
});

export const lora = Lora({
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "latin",
    "latin-ext",
    "math",
    "symbols",
    "vietnamese",
  ],
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const albertsans = Albert_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "800"],
  style: ["italic", "normal"],
});

export const exo = Exo({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "600", "800"],
  style: ["italic", "normal"],
});

export const raleway = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["italic", "normal"],
});

export const cormorant_garamond = Cormorant_Garamond({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["italic", "normal"],
});

export const playfair_display = Playfair_Display({
  subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
});

export const ibarra_real_nova = Ibarra_Real_Nova({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
});

export const fonts = {
  bodoni: bodoni.className,
  cinzel: cinzel.className,
  montserrat: montserrat.className,
  lora: lora.className,
  roboto: roboto.className,
  openSans: openSans.className,
  albertsans: albertsans.className,
  exo: exo.className,
  raleway: raleway.className,
  cormorant_garamond: cormorant_garamond.className,
  playfair_display: playfair_display.className,
  ibarra_real_nova: ibarra_real_nova.className,
};
