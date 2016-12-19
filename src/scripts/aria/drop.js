import {setAttribute} from '../utils/elements';
import {forEach} from '../utils/functional';

export default class Drop {
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
     * @property {function} setDropEffectNone
     */
    this.setDropEffectNone = setAttribute('aria-dropeffect', Drop.DropEffects.NONE);
    /**
     * @property {function} setAriaDropEffectForAll
     */
    this.setAriaDropEffectForAll = curry(function(dropEffect, {elements}){
      forEach(setAttribute('aria-dropeffect', dropEffect), elements);
    });

    // handle add element event
    this.controls.on('addElement', this.addElement, this);

    // handle remove drop effect when selected
    this.controls.on('select', this.setAriaDropEffectForAll(Drop.DropEffects.NONE), this);
  };

  /**
   * Sets element to be droppable
   *
   * @param {HTMLElement} element
   */
  addElement({element}) {
    this.setDropEffectNone(element);
  }
}

/**
 * Enum for ARIA drop effects
 * @readonly
 * @enum {string}
 */
Drop.DropEffects = {
  NONE: 'none',
  MOVE: 'move'
};