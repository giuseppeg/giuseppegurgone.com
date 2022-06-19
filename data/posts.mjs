import fs from "fs";
import path from "path";
import matter from "gray-matter";

const basepath = path.join(process.cwd(), "posts");

export function getPosts() {
  const posts = fs.readdirSync(basepath);
  return posts.map((p) => {
    const slug = path.basename(p, ".md");
    const { data, content } = matter(
      fs.readFileSync(path.join(basepath, p), "utf-8")
    );
    return {
      slug,
      url: `/${slug}`,
      ...data,
      content,
    };
  });
}

export function getPublicPosts() {
  return getPosts()
    .filter((p) => !p.private && !p.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export const suggestedPosts = [
  {
    title: "Quantum Mechanics Distilled",
    author: "Andy Matuschak, Michael Nielsen",
    url: "https://quantum.country/qm",
  },
  {
    title: "Web Shared Libraries",
    author: "Rob Flack",
    url: "https://www.youtube.com/watch?v=cBY3ZcHifXw",
  },
  {
    title:
      "Incremental Parsing with Tree-Sitter: A New Parsing System for Programming Tools",
    author: "Max Brunsfeld",
    url: "https://www.youtube.com/watch?v=Jes3bD6P0To",
  },
  {
    title: "Inversion of Control",
    author: "Kent C. Dodds",
    url: "https://kentcdodds.com/blog/inversion-of-control",
  },
  {
    title:
      "Why you should be storing remote data in a cache (and not in state!)",
    author: "Jason Ankers",
    url: "https://medium.com/@jase.ankers/why-you-should-be-separating-your-server-cache-from-your-ui-state-1585a9ae8336",
  },
  {
    title: "Pure UI",
    author: "Guillermo Rauch",
    url: "https://rauchg.com/2015/pure-ui/",
  },
  {
    title: "The magic of “overflow: hidden”",
    author: "Colin Aarts",
    url: "https://web.archive.org/web/20161029155622/https://colinaarts.com/articles/the-magic-of-overflow-hidden",
  },
  {
    title: "“inline-block” and you",
    author: "Colin Aarts",
    url: "https://web.archive.org/web/20160806230624/http://colinaarts.com/articles/inline-block-and-you/",
  },
];

export const externalPosts = [
  {
    title: "WebAssembly and Emscripten Chat with Alon Zakai",
    date: "04 Dec 2019",
    url: "https://pspdfkit.com/blog/2019/webassembly-emscripten-chat-alon-zakai",
  },
  {
    title: "Beyond Theming with CSS",
    date: "28 May 2019",
    url: "https://pspdfkit.com/blog/2019/beyond-theming-with-css/",
  },
  {
    title: "Building Accessible Modals with React",
    date: "16 Oct 2018",
    url: "https://pspdfkit.com/blog/2018/building-accessible-modals-with-react/",
    suggested: true,
  },
  {
    title: "Next.js 7",
    date: "19 Sep 2018",
    url: "https://nextjs.org/blog/next-7/",
  },
  {
    title: "DSS - Deterministic Style Sheets",
    date: "5 Sep 2018",
    url: "https://survivejs.com/blog/dss-interview/",
  },
  {
    title: "A Real-World WebAssembly Benchmark",
    date: "5 Jul 2018",
    url: "https://pspdfkit.com/blog/2018/an-open-webassembly-benchmark/",
  },
  {
    title: "Optimizing WebAssembly Startup Time",
    date: "26 Feb 2018",
    url: "https://pspdfkit.com/blog/2018/optimize-webassembly-startup-performance/",
    suggested: true,
  },
];
