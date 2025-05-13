import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

export async function htmlReplacer() {
  let config;

  const transformIndexHtml = (html) => {
    let answer = html;
    answer = answer.replaceAll('crossorigin', '');
    answer = answer.replaceAll('script type="module"', 'script defer');
    answer = answer.replaceAll('/assets', 'assets');
    return answer;
  }

  return {
    name: 'htmlReplacer',
    enforce: 'post',
    configResolved(resolvedConfig) {
        config = resolvedConfig;
    },
    transform(source) {
        return { code: transformIndexHtml(source), map: undefined };
    },
    transformIndexHtml
  }
}