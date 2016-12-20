import {removeAttribute, setAttribute} from './utils/elements';
import {forEach} from './utils/functional';
import Events from './utils/events';

/**
 * Controls Event
 * @typedef {Object} ControlsEvent
 * @property {HTMLElement} element
 * @property {number} index
 * @property {HTMLElement[]} elements
 * @property {HTMLElement} oldElement
 */
/**
 * Add element event
 * @event Controls#addElement
 * @type ControlsEvent
 */
/**
 * Previous element event
 * @event Controls#previousElement
 * @type ControlsEvent
 */
/**
 * Next element event
 * @event Controls#nextElement
 * @type ControlsEvent
 */
/**
 * Select option event
 * @event Controls#select
 * @type ControlsEvent
 */
/**
 * Drag element event
 * @event Controls#drag
 * @type ControlsEvent
 */

/**
 * @class
 */
export default class Controls extends Events {
  constructor(plugins) {
    super();

    /**
     *@property {HTMLElement} tabbableElement
     */
    /**
     * @property {object[]} plugins
     */
    this.plugins = plugins || [];

    /**
     * @property {HTMLElement[]} elements
     */
    this.elements = [];

    /**
     * @property {function} removeTabIndexForAll
     */
    this.removeTabIndexForAll = forEach(removeAttribute('tabindex'));
    /**
     * @property {function} setTabIndexZero
     */
    this.setTabIndexZero = setAttribute('tabindex', '0');

    // move tabindex to next element
    this.on('nextElement', this.nextElement, this);

    // move tabindex to previous element
    this.on('previousElement', this.previousElement, this);

    // init plugins
    this.initPlugins();
  }

  /**
   * Add controls to an element
   *
   * @param {HTMLElement} el
   *
   * @fires Controls#addElement
   * @public
   */
  addElement(el) {
    this.elements.push(el);

    this.firesEvent('addElement', el);

    if(this.elements.length === 1){ // if first
      this.setTabbable(el);
    }
  };

  /**
   * Fire event
   *
   * @param {string} type
   * @param {HTMLElement|EventTarget} el
   *
   * @public
   */
  firesEvent(type, el) {
    const index = this.elements.indexOf(el);

    this.fire(type, {
      element: el,
      index: index,
      elements: this.elements,
      oldElement: this.tabbableElement
    });
  }

  /**
   * Sets tabindex on an element, remove it from all others
   *
   * @param {number} index
   *
   * @private
   */
  nextElement({index}) {
    const isLastElement = index === (this.elements.length - 1);
    const nextEl = this.elements[isLastElement ? 0 : (index + 1)];

    this.setTabbable(nextEl);
    nextEl.focus();
  }

  /**
   * Sets tabindex on an element, remove it from all others
   *
   * @param {number} index
   *
   * @private
   */
  previousElement({index}) {
    const isFirstElement = index === 0;
    const prevEl = this.elements[isFirstElement ? (this.elements.length - 1) : (index - 1)];

    this.setTabbable(prevEl);
    prevEl.focus();
  }

  /**
   * Sets tabindex on an element, remove it from all others
   *
   * @param {HTMLElement} el
   * @private
   */
  setTabbable(el) {
    this.removeTabIndexForAll(this.elements);
    this.setTabIndexZero(el);
    this.tabbableElement = el;
  }

  /**
   * Initializes the plugins
   *
   * @private
   */
  initPlugins() {
    this.plugins.forEach(function(plugin){
      if(plugin.init !== undefined){
        plugin.init(this);
      }
    }, this);
  }
}