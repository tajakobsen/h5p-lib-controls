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
   * @param {HTMLElement} element
   * @param {HTMLElement} oldElement
   */
  select({element, oldElement}) {
    const grabbed = element.getAttribute('aria-grabbed') === 'true';
    element.setAttribute('aria-grabbed', grabbed ? 'false' : 'true');
    /*
    // ungrabs the currently grabbed element
    this.unGrabElement(oldElement);

    // don't reselect same element
    if(element !== oldElement){
      console.log('do grab');
      this.grabElement(element);
    }*/
  }
}