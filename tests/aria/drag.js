import Controls from '../../src/scripts/controls';
import Keyboard from '../../src/scripts/ui/keyboard';
import Drag from '../../src/scripts/aria/drag';

describe("Controls", function () {
  let controls,
    keyboard,
    elements,
    drag;

  beforeEach(function () {
    drag = new Drag();
    keyboard = new Keyboard();
    controls = new Controls([keyboard, drag]);
    elements = [document.createElement("div"), document.createElement("div"), document.createElement("div")];
  });

  it("should add elements correctly", function () {
    // add elements to controls
    elements.forEach(el => controls.addElement(el));

    // needs aria-grabbed attribute to indicate grabability
    expect(elements[0].hasAttribute('aria-grabbed')).toBeTruthy();
    expect(elements[1].hasAttribute('aria-grabbed')).toBeTruthy();
    expect(elements[2].hasAttribute('aria-grabbed')).toBeTruthy();
  });

  it("should indicate grabbed", function () {
    // add elements to controls
    elements.forEach(el => controls.addElement(el));

    // select element 1
    controls.firesEvent('select', elements[1]);

    // only element 1 should have aria-grabbed
    expect(elements[0].getAttribute('aria-grabbed')).toBe('false');
    expect(elements[1].getAttribute('aria-grabbed')).toBe('true');
    expect(elements[2].getAttribute('aria-grabbed')).toBe('false');
  });
});