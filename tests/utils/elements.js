import { setAttribute } from '../../src/scripts/utils/elements';

describe("elements", function () {
  const attributeKey = 'myKey';
  const attributeValue = 'myValue';

  it("should set attribute of element", function (done) {
    let el = {
      setAttribute: function(key, value){
        expect(key).toEqual(attributeKey);
        expect(value).toEqual(attributeValue);
        done();
      }
    };

    setAttribute(attributeKey, attributeValue)(el);
  });
});