/* global JSON */
import mobiledocParsers from '../parsers/mobiledoc';
import HTMLParser from '../parsers/html';
import HTMLRenderer from 'mobiledoc-html-renderer';
import TextRenderer from 'mobiledoc-text-renderer';

export function setClipboardCopyData(copyEvent, editor) {
  const { cursor, post } = editor;
  const { clipboardData } = copyEvent;

  const range = cursor.offsets;
  const mobiledoc = post.cloneRange(range);

  let unknownCardHandler = () => {}; // ignore unknown cards
  let unknownAtomHandler = () => {}; // ignore unknown atoms
  let {result: innerHTML } = new HTMLRenderer({unknownCardHandler, unknownAtomHandler})
                                     .render(mobiledoc);

  const html =
    `<div data-mobiledoc='${JSON.stringify(mobiledoc)}'>${innerHTML}</div>`;
  const {result: plain} = new TextRenderer({unknownCardHandler, unknownAtomHandler})
                      .render(mobiledoc);

  clipboardData.setData('text/plain', plain);
  clipboardData.setData('text/html', html);
}

export function parsePostFromPaste(pasteEvent, builder, cardParsers=[]) {
  let mobiledoc, post;
  const mobiledocRegex = new RegExp(/data\-mobiledoc='(.*?)'>/);

  let html = pasteEvent.clipboardData.getData('text/html');

  if (mobiledocRegex.test(html)) {
    let mobiledocString = html.match(mobiledocRegex)[1];
    mobiledoc = JSON.parse(mobiledocString);
    post = mobiledocParsers.parse(builder, mobiledoc);
  } else {
    post = new HTMLParser(builder, {cardParsers}).parse(html);
  }

  return post;
}
