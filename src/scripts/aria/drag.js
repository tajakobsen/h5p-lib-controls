import {setAttribute, attributeEquals, hasAttribute} from '../utils/elements';
import {compose, filter, some} from '../utils/functional';

/**
 * @type {string}
 * @readonly
 */
const ATTRIBUTE_ARIA_GRABBED = 'aria-grabbed';

/**
 * @type {function} setGrabbedTrue
 * @param {HTMLElement} element
 */
const setGrabbed = setAttribute(ATTRIBUTE_ARIA_GRABBED);

/**
 * @type {function} isGrabbed
 * @param {HTMLElement} element
 */
const isGrabbed = attributeEquals(ATTRIBUTE_ARIA_GRABBED, 'true');

/**
 * @type {function} filterHasAttributeDropEffect
 */
const filterHasAttributeGrabbed = filter(hasAttribute(ATTRIBUTE_ARIA_GRABBED));

/**
 * @type {function} hasGrabbed
 * @param {HTMLElement[]} elements
 */
const hasGrabbed = compose(some(isGrabbed), filterHasAttributeGrabbed);

/**
 * @class
 */
export default class Drag {
  /**
   * Inits this class
   *
   * @param {Controls} controls
   */
  init(controls) {
    /**
     * @type {Controls}
     */
    this.controls = controls;

    // handle select event
    this.controls.on('select', this.select, this);
  };

  /**
   * Marks element as aria-grabbed = 'false' and adds to controller
   *
   * @param element
   */
  addElement(element) {
    setGrabbed('false', element);
    this.controls.addElement(element);
  }

  /**
   * Returns true if any of the elements are grabbed
   *
   * @return {boolean}
   */
  hasAnyGrabbed(){
    return hasGrabbed(this.controls.elements)
  }

  /**
   * Handle grabbing objects
   *
   * @param {HTMLElement} element
   */
  select({element}) {
    setGrabbed((!isGrabbed(element)).toString(), element);
  }
}