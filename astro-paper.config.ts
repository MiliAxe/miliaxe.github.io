import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://miladzm.ir",
    title: "Milad Zarei",
    description:
      "Personal blog of Milad Zarei (Milad Zarei Maleki) — thoughts and write-ups on low-level programming, GNU/Linux, networking, and software engineering.",
    author: "Milad Zarei",
    profile: "https://miladzm.ir/",
    ogImage: "og.png",
    lang: "en",
    timezone: "Asia/Tehran",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/MiliAxe" },
    { name: "linkedin", url: "https://www.linkedin.com/in/milad-zarei-maleki" },
    { name: "mail",     url: "mailto:miliaxe0@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});