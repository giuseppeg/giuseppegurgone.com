import fs from "fs";
import { read } from "to-vfile";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkHTML from "remark-html";
import remarkHighlight from "remark-highlight.js";
import { parse as yamlParse } from "yaml";

export async function compile(path, slug) {
  if (!fs.existsSync(`${path}/${slug}.md`)) {
    return null;
  }
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkExtractFrontmatter, { yaml: yamlParse })
    .use(remarkHighlight)
    .use(remarkHTML, { sanitize: false })
    .process(await read(`${path}/${slug}.md`));

  // @TODO Compile front matter tldr markdown when present.
  return { content: String(result), meta: { slug, ...result.data } };
}
