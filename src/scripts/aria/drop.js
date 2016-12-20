import {setAttribute} from '../utils/elements';
import {curry, forEach} from '../utils/functional';

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
     * @type {Array}
     */
    this.dragDropMapping = [];

    /**
     * @property {function} setDropEffectNone
     */
    this.setDropEffectNone = setAttribute('aria-dropeffect', Drop.DropEffect.NONE);
    /**
     * @property {function} setAriaDropEffectForAll
     */
    this.setAriaDropEffectForAll = curry(function(dropEffect, {elements}){
      forEach(setAttribute('aria-dropeffect', dropEffect), elements);
    });

    // handle add element event
    this.controls.on('addElement', this.addElement, this);

    // handle remove drop effect when selected
    this.controls.on('select', this.setAriaDropEffectForAll(Drop.DropEffect.NONE), this);
  };

  /**
   * Sets element to be droppable
   *
   * @param {HTMLElement} element
   *
   * @private
   */
  addElement({element}) {
    this.setDropEffectNone(element);
  }

  /**
   * Apply drop effect where filter returns true
   *
   * @param {Drop.DropEffect} dropEffect
   * @param {function} [filter]
   * @param {*} [scope]
   */
  applyDropEffectWhere(dropEffect, filter, scope){
    filter = filter || (el => true);
    this.controls.elements
      .filter(filter, scope)
      .forEach(setAttribute('aria-dropeffect', dropEffect))
  }
}

/**
 * Enum for ARIA drop effects
 * @readonly
 * @enum {string}
 */
Drop.DropEffect = {
  COPY: 'copy',
  MOVE: 'move',
  EXECUTE: 'execute',
  POPUP: 'popup',
  NONE: 'none'
};