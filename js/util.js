'use strict';

(() => {
  window.util = {
    /** Returns a random element of the given array
     *  @param {array} arr - an array with a random element of which will be returned
     *  @return {element} returns a random element of the give array
     */
    getRandomElementFromArray: (arr) => {
      return arr[window.util.getRandomNumber(0, arr.length - 1)];
    },
    /**
     *  Returns an array with random quantity of items gotten from a given array
     *  @param {array} arr - Given array
     *  @return {array} returns new array with random quantity of items
     */
    getRandomArray: (arr) => {
      const newArray = [];
      const newArrayLength = window.util.getRandomNumber(1, arr.length);
      const arrCopy = arr.slice();
      for (let i = 0; i < newArrayLength; i++) {
        const takenItem = window.util.getRandomNumber(0, arrCopy.length - 1);
        newArray.push(arrCopy.splice(takenItem, 1)[0]);
      }
      return newArray;
    },
    /**
     *  Returns a random number between the given min and max, both inclusive
     *  @param {int} min - minimum number
     *  @param {int} max - maximum number
     *  @return {int} returns random number between min and max
     */
    getRandomNumber: (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();

