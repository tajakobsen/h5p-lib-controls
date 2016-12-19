import {setAttribute} from '../utils/elements';

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
    /**
     * @property {function} grabElement
     */
    this.grabElement = setAttribute('aria-grabbed', 'true');
    /**
     * @property {function} unGrabElement
     */
    this.unGrabElement = setAttribute('aria-grabbed', 'false');

    // handle add element event
    this.controls.on('addElement', this.addElement, this);

    // handle select event
    this.controls.on('select', this.select, this);
  };

  /**
   * Marks element as grabbable (but not grabbed)
   *
   * @param element
   */
  addElement({element}) {
    this.unGrabElement(element);
  }

  /**
   * Handle grabbing objects
   *
   * @param element
   * @param oldElement
   */
  select({element, oldElement}) {
    // ungrabs the currently grabbed element
    this.unGrabElement(oldElement);

    // don't reselect same element
    if(element !== oldElement){
      this.grabElement(element);
    }
  }
}