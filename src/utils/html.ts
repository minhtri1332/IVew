import striptags from 'striptags';
import he from 'he';

export const getStrippedTagContent = (content: string | undefined) => {
  const strippedContent =
    typeof content !== 'undefined'
      ? striptags(content, [], ' ')
        .replace(/\s+/g, ' ')
        .trim()
      : undefined;
  return strippedContent;
};

export const getFirstXChar = (content: string | undefined, x: number = 50) => {
  return typeof content !== 'undefined' ? content.substring(0, x) : content;
};

export const unescapeString = (content: string | undefined) => {
  const unescapedContent =
    typeof content === 'string' ? he.unescape(content) : content;
  return unescapedContent;
};

export const getPlainText = (raw: string) => {
  let html = raw;
  html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
  html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
  html = html.replace(/<\/div>/gi, '\n');
  html = html.replace(/<\/li>/gi, '\n');
  html = html.replace(/<li>/gi, '  *  ');
  html = html.replace(/<\/ul>/gi, '\n');
  html = html.replace(/<\/p>/gi, '\n');
  html = html.replace(/<br\s*[\/]?>/gi, '\n');
  html = html.replace(/<[^>]+>/gi, '');
  return html;
};
