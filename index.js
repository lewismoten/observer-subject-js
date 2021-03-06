(() => {

  'use strict';

  let isFunction = require('is-function'),
    observers = Symbol('observers');

  module.exports = class Observable {

    constructor() {

      this[observers] = new Map();

    }

    registerObserver(observer) {

      if (!isFunction(observer.notify)) {

        throw new TypeError(
          `${observer.constructor.name}.notify is not a function`
        );

      }

      this[observers].set(observer, 0);

    }

    unregisterObserver(observer) {

      return this[observers].delete(observer);

    }

    notifyObservers(...args) {

      this[observers].forEach((v, observer) => observer.notify(...args));

    }

  };

})();
