import View from './view';
import { inherit } from 'content-kit-utils';
import { positionElementCenteredBelow, getEventTargetMatchingTag } from '../utils/element-utils';

function Tooltip(options) {
  var tooltip = this;
  var rootElement = options.rootElement;
  var delay = options.delay || 200;
  var timeout;
  options.classNames = ['ck-tooltip'];
  View.call(tooltip, options);

  this.addEventListener(rootElement, 'mouseover', (e) => {
    var target = getEventTargetMatchingTag(options.showForTag, e.target, rootElement);
    if (target && target.isContentEditable) {
      timeout = setTimeout(function() {
        tooltip.showLink(target.href, target);
      }, delay);
    }
  });
  
  this.addEventListener(rootElement, 'mouseout', (e) => {
    clearTimeout(timeout);
    var toElement = e.toElement || e.relatedTarget;
    if (toElement && toElement.className !== tooltip.element.className) {
      tooltip.hide();
    }
  });
}
inherit(Tooltip, View);

Tooltip.prototype.showMessage = function(message, element) {
  var tooltip = this;
  var tooltipElement = tooltip.element;
  tooltipElement.innerHTML = message;
  tooltip.show();
  positionElementCenteredBelow(tooltipElement, element);
};

Tooltip.prototype.showLink = function(link, element) {
  var message = '<a href="' + link + '" target="_blank">' + link + '</a>';
  this.showMessage(message, element);
};

export default Tooltip;
