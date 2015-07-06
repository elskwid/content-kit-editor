function renderMarkupSection(doc, section, markers) {
  var element = doc.createElement(section.tagName);
  var elements = [element];
  var currentElement = element;
  var i, l, j, m, marker, openTypes, closeTypes, text;
  var markerType, markerTypeAttrs;
  var openedElement, openedTagName;
  for (i=0, l=markers.length;i<l;i++) {
    marker = markers[i];
    openTypes = marker.open;
    closeTypes = marker.close;
    text = marker.value;

    for (j=0, m=openTypes.length;j<m;j++) {
      markerType = openTypes[j];
      openedElement = createElementFromMarkerType(doc, markerType);
      currentElement.appendChild(openedElement);
      elements.push(openedElement);
      currentElement = openedElement;
    }

    currentElement.appendChild(doc.createTextNode(text));

    for (j=0, m=closeTypes;j<m;j++) {
      elements.pop();
      currentElement = elements[elements.length-1];
    }

  }

  return element;
}

function createElementFromMarkerType(doc, markerType) {
  var element = doc.createElement(markerType.tagName);
  if (markerType.attributes) {
    for (var i=0, l=markerType.attributes.length;i<l;i=i+2) {
      element.setAttribute(markerType.attributes[i], markerType.attributes[i+1]);
    }
  }
  return element;
}

function NewDOMRenderer(doc, cards) {
  if (!doc) {
    throw new Error('renderer must be created with a document');
  }
  this.document = doc;
  if (!cards) {
    throw new Error('renderer must be created with cards');
  }
  this.cards = cards;
};

NewDOMRenderer.prototype.render = function NewDOMRenderer_render(data, elementMap, target) {
  var sections = data.sections;
  var i, l, section, node;
  for (i=0, l=sections.length;i<l;i++) {
    node = this.document.createElement('section');
    section = sections[i];
    elementMap.set(node, section);
    switch (section.type) {
    case 1:
      node.appendChild(renderMarkupSection(this.document, section, section.markups));
      break;
    case 5:
      throw new Error('unimplemented');
      var componentFn = this.cards[section[1]];
      node.appendChild(componentFn(this.document, section.markups));
      break;
    }
    target.appendChild(node);
  }
};

export default NewDOMRenderer;