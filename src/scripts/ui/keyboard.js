/**
 * @class
 * @classdesc Keyboard navigation for accessibility support
 */
export default class Keyboard {
  constructor() {
    /**
     * @property {boolean} selectability
     */
    this.selectability = true;
  }

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
    this.controls.on('addElement', this.listenForKeyDown, this);
  };

  /**
   * Listens for a keyboard press when element is focused
   *
   * @param {HTMLElement} element
   * @private
   */
  listenForKeyDown({element}) {
    element.addEventListener('keydown', this.handleKeyDown.bind(this));
  };

  /**
   * Handles key down
   *
   * @param {KeyboardEvent} event Keyboard event
   * @private
   */
  handleKeyDown(event){
    switch (event.which) {
      case 13: // Enter
      case 32: // Space
        this.select(event.target);
        event.preventDefault();
        break;

      case 37: // Left Arrow
      case 38: // Up Arrow
        this.previousElement(event.target);
        event.preventDefault();
        break;
      case 39: // Right Arrow
      case 40: // Down Arrow
        this.nextElement(event.target);
        event.preventDefault();
        break;
    }
  };

  /**
   * Fires the previous element event
   *
   * @param {HTMLElement|EventTarget} el
   * @fires Controls#previousElement
   */
  previousElement(el) {
    this.controls.firesEvent('previousElement', el)
  };

  /**
   * Fire the next element event
   *
   * @param {HTMLElement|EventTarget} el
   * @fires Controls#nextElement
   */
  nextElement(el) {
    this.controls.firesEvent('nextElement', el)
  };

  /**
   * Fires the select event
   *
   * @param {EventTarget|HTMLElement} el
   * @fires Controls#select
   */
  select(el){
    if(this.selectability) {
      this.controls.firesEvent('select', el)
    }
  };

  /**
   * Disable possibility to select a word trough click and space or enter
   *
   * @public
   */
  disableSelectability() {
    this.selectability = false;
  };

  /**
   * Enable possibility to select a word trough click and space or enter
   *
   * @public
   */
  enableSelectability() {
    this.selectability = true;
  }
}