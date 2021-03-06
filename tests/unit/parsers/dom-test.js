import DOMParser from 'content-kit-editor/parsers/dom';
import PostNodeBuilder from 'content-kit-editor/models/post-node-builder';
import Helpers from '../../test-helpers';

const { module, test } = Helpers;

function buildDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div;
}

let parser, builder, expectedPost;

module('Unit: DOMParser', {
  beforeEach() {
    builder = new PostNodeBuilder();
    parser = new DOMParser(builder);
    expectedPost = builder.createPost();
  },
  afterEach() {
    parser = null;
    builder = null;
    expectedPost = null;
  }
});

test('parse empty content', (assert) => {
  const post = parser.parse(buildDOM(''));
  let section = builder.createMarkupSection('p');
  expectedPost.sections.append(section);

  assert.deepEqual(post, expectedPost);
});

test('blank textnodes are ignored', (assert) => {
  let post = parser.parse(buildDOM('<p>first line</p>\n<p>second line</p>'));

  let expectedFirst = builder.createMarkupSection('P');
  expectedFirst.markers.append(builder.createMarker('first line'));
  expectedPost.sections.append(expectedFirst);
  let expectedSecond = builder.createMarkupSection('P');
  expectedSecond.markers.append(builder.createMarker('second line'));
  expectedPost.sections.append(expectedSecond);

  assert.deepEqual(post, expectedPost);
});

test('textnode adjacent to p tag becomes section', (assert) => {
  const post = parser.parse(buildDOM('<p>first line</p>second line'));

  let expectedFirst = builder.createMarkupSection('P');
  expectedFirst.markers.append(builder.createMarker('first line'));
  expectedPost.sections.append(expectedFirst);
  let expectedSecond = builder.createMarkupSection('P', [], true);
  expectedSecond.markers.append(builder.createMarker('second line'));
  expectedPost.sections.append(expectedSecond);

  assert.deepEqual(post, expectedPost);
});

test('p tag (section markup) should create a block', (assert) => {
  const post = parser.parse(buildDOM('<p>text</p>'));

  let expectedFirst = builder.createMarkupSection('P');
  expectedFirst.markers.append(builder.createMarker('text'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('strong tag (stray markup) without a block should create a block', (assert) => {
  const post = parser.parse(buildDOM('<strong>text</strong>'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  expectedFirst.markers.append(builder.createMarker('text', [
    builder.createMarkup('STRONG')
  ]));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('strong tag with inner em (stray markup) without a block should create a block', (assert) => {
  const post = parser.parse(buildDOM('<strong><em>stray</em> markup tags</strong>.'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  let strong = builder.createMarkup('STRONG');
  expectedFirst.markers.append(builder.createMarker('stray', [
    strong,
    builder.createMarkup('EM')
  ]));
  expectedFirst.markers.append(builder.createMarker(' markup tags', [strong]));
  expectedFirst.markers.append(builder.createMarker('.'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('stray text (stray markup) should create a block', (assert) => {
  const post = parser.parse(buildDOM('text'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  expectedFirst.markers.append(builder.createMarker('text'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('text node, strong tag, text node (stray markup) without a block should create a block', (assert) => {
  const post = parser.parse(buildDOM('start <strong>bold</strong> end'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  expectedFirst.markers.append(builder.createMarker('start '));
  expectedFirst.markers.append(builder.createMarker('bold', [
    builder.createMarkup('STRONG')
  ]));
  expectedFirst.markers.append(builder.createMarker(' end'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('italic tag (stray markup) without a block should create a block', (assert) => {
  const post = parser.parse(buildDOM('<em>text</em>'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  expectedFirst.markers.append(builder.createMarker('text', [
    builder.createMarkup('EM')
  ]));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('u tag (stray markup) without a block should strip U and create a block', (assert) => {
  const post = parser.parse(buildDOM('<u>text</u>'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  expectedFirst.markers.append(builder.createMarker('text'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('a tag (stray markup) without a block should create a block', (assert) => {
  var url = "http://test.com";
  const post = parser.parse(buildDOM('<a href="'+url+'">text</a>'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  expectedFirst.markers.append(builder.createMarker('text', [
    builder.createMarkup('A', {href:url})
  ]));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

/* FIXME: What should happen with br
test('markup: break', (assert) => {
  const post = parser.parse(buildDOM('line <br/>break'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  expectedFirst.markers.append(builder.createMarker('line '));
  expectedFirst.markers.append(builder.createMarker('break'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});
*/

test('sub tag (stray markup) without a block should filter SUB and create a block', (assert) => {
  const post = parser.parse(buildDOM('footnote<sub>1</sub>'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  expectedFirst.markers.append(builder.createMarker('footnote'));
  expectedFirst.markers.append(builder.createMarker('1'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('sup tag (stray markup) without a block should filter SUP and create a block', (assert) => {
  const post = parser.parse(buildDOM('e=mc<sup>2</sup>'));

  let expectedFirst = builder.createMarkupSection('P', [], true);
  expectedFirst.markers.append(builder.createMarker('e=mc'));
  expectedFirst.markers.append(builder.createMarker('2'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

// This is not the way a list should be created -- it should be list sections
// and list items
Helpers.skip('list (stray markup) without a block should create a block', (assert) => {
  const post = parser.parse(buildDOM('<ul><li>Item 1</li><li>Item 2</li></ul>'));

  let expectedFirst = builder.createMarkupSection('UL');
  expectedFirst.markers.append(builder.createMarker('Item 1', [
    builder.createMarkup('LI')
  ]));
  expectedFirst.markers.append(builder.createMarker('Item 2', [
    builder.createMarkup('LI')
  ]));
  expectedPost.sections.append(expectedFirst);

  assert.ok(post === expectedPost, 'should generate correct output');
});

test('nested tags (section markup) should create a block', (assert) => {
  const post = parser.parse(buildDOM('<p><em><strong>Double.</strong></em> <strong><em>Double staggered</em> start.</strong> <strong>Double <em>staggered end.</em></strong> <strong>Double <em>staggered</em> middle.</strong></p>'));

  let expectedFirst = builder.createMarkupSection('P');
  expectedFirst.markers.append(builder.createMarker('Double.', [
    builder.createMarkup('EM'),
    builder.createMarkup('STRONG')
  ]));
  expectedFirst.markers.append(builder.createMarker(' '));
  let firstStrong = builder.createMarkup('STRONG');
  expectedFirst.markers.append(builder.createMarker('Double staggered', [
    firstStrong,
    builder.createMarkup('EM')
  ]));
  expectedFirst.markers.append(builder.createMarker(' start.', [firstStrong]));
  expectedFirst.markers.append(builder.createMarker(' '));
  let secondStrong = builder.createMarkup('STRONG');
  expectedFirst.markers.append(builder.createMarker('Double ', [
    secondStrong
  ]));
  expectedFirst.markers.append(builder.createMarker('staggered end.', [
    secondStrong,
    builder.createMarkup('EM')
  ]));
  expectedFirst.markers.append(builder.createMarker(' '));
  let thirdStrong = builder.createMarkup('STRONG');
  expectedFirst.markers.append(builder.createMarker('Double ', [
    thirdStrong
  ]));
  expectedFirst.markers.append(builder.createMarker('staggered', [
    thirdStrong,
    builder.createMarkup('EM')
  ]));
  expectedFirst.markers.append(builder.createMarker(' middle.', [thirdStrong]));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
  let sectionMarkers = post.sections.head.markers;
  assert.equal(sectionMarkers.objectAt(2).markups[0], sectionMarkers.objectAt(3).markups[0]);
});

/*
 * FIXME: Update these tests to use the renderer
 *
test('markup: nested/unsupported tags', (assert) => {
  var parsed = compiler.parse('<p>Test one <strong>two</strong> <em><strong>three</strong></em> <span>four</span> <span><strong>five</strong></span> <strong><span>six</span></strong> <strong></strong><span></span><strong><span></span></strong><span><strong></strong></span>seven</p>');

  equal ( parsed.length, 1 );
  equal ( parsed[0].type, Type.PARAGRAPH.id );
  equal ( parsed[0].value, 'Test one two three four five six seven' );
  equal ( parsed[0].markup.length, 5 );

  equal ( parsed[0].markup[0].type, Type.BOLD.id );
  equal ( parsed[0].markup[0].start, 9 );
  equal ( parsed[0].markup[0].end, 12 );

  equal ( parsed[0].markup[1].type, Type.ITALIC.id );
  equal ( parsed[0].markup[1].start, 13 );
  equal ( parsed[0].markup[1].end, 18 );

  equal ( parsed[0].markup[2].type, Type.BOLD.id );
  equal ( parsed[0].markup[2].start, 13 );
  equal ( parsed[0].markup[2].end, 18 );

  equal ( parsed[0].markup[3].type, Type.BOLD.id );
  equal ( parsed[0].markup[3].start, 24 );
  equal ( parsed[0].markup[3].end, 28 );

  equal ( parsed[0].markup[4].type, Type.BOLD.id );
  equal ( parsed[0].markup[4].start, 29 );
  equal ( parsed[0].markup[4].end, 32 );
});

test('markup: preserves spaces in empty tags', (assert) => {
  var rendered = compiler.rerender('<p>Testing a<span> </span><em>space</em></p>');
  equal ( rendered, '<p>Testing a <em>space</em></p>');
});

test('markup: self-closing tags with nesting', (assert) => {
  var input = '<p><strong>Blah <br/>blah</strong> <br/>blah</p>';
  var parsed = compiler.parse(input);

  equal ( parsed[0].value, 'Blah blah blah' );
  equal ( parsed[0].markup.length, 3 );

  equal ( parsed[0].markup[0].type, Type.BOLD.id );
  equal ( parsed[0].markup[0].start, 0 );
  equal ( parsed[0].markup[0].end, 9 );

  equal ( parsed[0].markup[1].type, Type.BREAK.id );
  equal ( parsed[0].markup[1].start, 5 );
  equal ( parsed[0].markup[1].end, 5 );

  equal ( parsed[0].markup[2].type, Type.BREAK.id );
  equal ( parsed[0].markup[2].start, 10 );
  equal ( parsed[0].markup[2].end, 10 );
});

test('markup: whitespace', (assert) => {
  var parsed = compiler.parse('<ul>   ' +
                              '\t <li>Item <em>1</em></li> &nbsp;\n' +
                              '   <li><strong>Item 2</strong></li>\r\n &nbsp; ' +
                              '\t\t<li><strong>Item</strong> 3</li>\r' +
                              '</ul>');
  equal ( parsed.length, 1 );
  equal ( parsed[0].value, 'Item 1 Item 2 Item 3' );

  var markup = parsed[0].markup
  equal ( markup.length, 6);
  equal ( markup[0].type, Type.LIST_ITEM.id );
  equal ( markup[0].start, 0 );
  equal ( markup[0].end, 6 );
  equal ( markup[1].type, Type.ITALIC.id );
  equal ( markup[1].start, 5 );
  equal ( markup[1].end, 6 );
  equal ( markup[2].type, Type.LIST_ITEM.id );
  equal ( markup[2].start, 7 );
  equal ( markup[2].end, 13 );
  equal ( markup[3].type, Type.BOLD.id );
  equal ( markup[3].start, 7 );
  equal ( markup[3].end, 13 );
  equal ( markup[4].type, Type.LIST_ITEM.id );
  equal ( markup[4].start, 14 );
  equal ( markup[4].end, 20 );
  equal ( markup[5].type, Type.BOLD.id );
  equal ( markup[5].start, 14 );
  equal ( markup[5].end, 18 );
});

test('markup: consistent order', (assert) => {
  var correctlyOrdered = compiler.parse('<p><a><strong>text</strong></a></p>');
  var incorrectlyOrdered = compiler.parse('<p><strong><a>text</a></strong></p>');

  equal( compiler.render(correctlyOrdered),  compiler.render(incorrectlyOrdered) );
});
*/

test('attributes', (assert) => {
  const href = 'http://google.com';
  const rel = 'nofollow';
  const post = parser.parse(buildDOM(`<p><a href="${href}" rel="${rel}">Link to google.com</a></p>`));

  let expectedFirst = builder.createMarkupSection('P');
  expectedFirst.markers.append(builder.createMarker('Link to google.com', [
    builder.createMarkup('A', {href, rel})
  ]));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('attributes filters out inline styles and classes', (assert) => {
  const post = parser.parse(buildDOM('<p class="test" style="color:red;"><b style="line-height:11px">test</b></p>'));

  let expectedFirst = builder.createMarkupSection('P');
  expectedFirst.markers.append(builder.createMarker('test', [
    builder.createMarkup('B')
  ]));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('blocks: paragraph', (assert) => {
  const post = parser.parse(buildDOM('<p>TEXT</p>'));

  let expectedFirst = builder.createMarkupSection('P');
  expectedFirst.markers.append(builder.createMarker('TEXT'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('blocks: heading', (assert) => {
  const post = parser.parse(buildDOM('<h2>TEXT</h2>'));

  let expectedFirst = builder.createMarkupSection('H2');
  expectedFirst.markers.append(builder.createMarker('TEXT'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('blocks: subheading', (assert) => {
  const post = parser.parse(buildDOM('<h3>TEXT</h3>'));

  let expectedFirst = builder.createMarkupSection('H3');
  expectedFirst.markers.append(builder.createMarker('TEXT'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

/* FIXME: should not create a markup type section
test('blocks: image', (assert) => {
  var url = "http://domain.com/text.png";
  const post = parser.parse(buildDOM('<img src="'+url+'" />'));
  assert.deepEqual( post, {
    sections: [{
      type: MARKUP_SECTION,
      tagName: 'IMG',
      attributes: ['src', url],
      markups: []
    }]
  });
});
*/

test('blocks: quote', (assert) => {
  const post = parser.parse(buildDOM('<blockquote>quote</blockquote>'));

  let expectedFirst = builder.createMarkupSection('BLOCKQUOTE');
  expectedFirst.markers.append(builder.createMarker('quote'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('blocks: list', (assert) => {
  const post = parser.parse(buildDOM('<ul><li>Item 1</li> <li>Item 2</li></ul>'));

  let expectedFirst = builder.createMarkupSection('UL');
  expectedFirst.markers.append(builder.createMarker('Item 1', [
    builder.createMarkup('LI')
  ]));
  expectedFirst.markers.append(builder.createMarker(' '));
  expectedFirst.markers.append(builder.createMarker('Item 2', [
    builder.createMarkup('LI')
  ]));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

test('blocks: ordered list', (assert) => {
  const post = parser.parse(buildDOM('<ol><li>Item 1</li> <li>Item 2</li></ol>'));

  let expectedFirst = builder.createMarkupSection('OL');
  expectedFirst.markers.append(builder.createMarker('Item 1', [
    builder.createMarkup('LI')
  ]));
  expectedFirst.markers.append(builder.createMarker(' '));
  expectedFirst.markers.append(builder.createMarker('Item 2', [
    builder.createMarkup('LI')
  ]));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});

/*
test('blocks: mixed', (assert) => {
  var input = '<h2>The Title</h2><h3>The Subtitle</h3><p>TEXT <strong>1</strong></p><p>TEXT <strong><em>2</em></strong></p><p>TEXT with a <a href="http://google.com/">link</a>.</p><blockquote>Quote</blockquote>';
  var parsed = compiler.parse(input);

  equal ( parsed.length, 6 );
  equal ( parsed[0].type, Type.HEADING.id );
  equal ( parsed[1].type, Type.SUBHEADING.id );
  equal ( parsed[2].type, Type.PARAGRAPH.id );
  equal ( parsed[3].type, Type.PARAGRAPH.id );
  equal ( parsed[4].type, Type.PARAGRAPH.id );
  equal ( parsed[5].type, Type.QUOTE.id );
});
*/

/* FIXME: needs images, br support
test('blocks: self-closing', (assert) => {
  var url = 'http://domain.com/test.png';
  const post = parser.parse(buildDOM('<img src="'+url+'"/><p>Line<br/>break</p>'));

  assert.deepEqual( post, {
    sections: [{
      type: MARKUP_SECTION,
      tagName: 'IMG',
      attributes: ['src', url],
      markups: []
    }, {
      type: MARKUP_SECTION,
      tagName: 'P',
      markups: [{
        open: [],
        close: 0,
        value: 'Line'
      }, {
        open: [{
          tagName: 'BR'
        }],
        close: 1,
        value: null
      }, {
        open: [],
        close: 0,
        value: 'break'
      }]
    }]
  });
});
*/

test('converts tags to mapped values', (assert) => {
  // FIXME: Should probably be normalizing b to strong etc
  const post = parser.parse(buildDOM('<p><b><i>Converts</i> tags</b>.</p>'));

  let expectedFirst = builder.createMarkupSection('P');
  let bold = builder.createMarkup('B');
  expectedFirst.markers.append(builder.createMarker('Converts', [
    bold,
    builder.createMarkup('I')
  ]));
  expectedFirst.markers.append(builder.createMarker(' tags', [bold]));
  expectedFirst.markers.append(builder.createMarker('.'));
  expectedPost.sections.append(expectedFirst);

  assert.deepEqual(post, expectedPost);
});
