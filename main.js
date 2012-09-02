/*
 * qwiksort.js
 *
 * Totally redundant quicksort implementation
 *
 * Robert Kenny kenoir@gmail.com
 */

Array.prototype.qwiksort = function (startKey, endKey) {
  if (startKey == undefined) {
    startKey = 0;
    endKey = this.length - 1;
  }
  if (!(startKey < endKey)) return;

  var pivotKey = this.partition(startKey, endKey, startKey);

  this.qwiksort(startKey, pivotKey - 1);
  this.qwiksort(pivotKey + 1, endKey);
}

Array.prototype.partition = function (startKey, endKey, pivotKey) {
  var pivotValue = this[pivotKey];
  var key = currentPosition = startKey;

  this.swap(pivotKey, endKey)

  while (currentPosition < endKey) {
    if (this[currentPosition] < pivotValue) {
      this.swap(currentPosition, key);
      key++;
    }
    currentPosition++;
  }
  this.swap(key, endKey);

  return key;
}

Array.prototype.swap = function (a, b) {
  var tmp = this[a];
  this[a] = this[b];
  this[b] = tmp;
}

// Equally redundant test harness :)
var testHarness = {
  actualSortComparison: function (a, b) {
    return a - b
  },
  arraysEqual: function (arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  },
  testArray: [
    [9, 1, 10, 5, 4, 3, 6, 7, 2, 8],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    [3, 4, 1],
    [10],
    []
  ],
  run: function () {
    try {
      var t = this.smokeTest();
      if (t) {
        console.log("PASS");
      } else {
        console.log("FAIL");
      }
      return t;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  smokeTest: function () {
    for (var i = 0; i < this.testArray.length; i++) {
      var expectedTestArray = this.testArray.slice(0);
      var actualTestArray = this.testArray.slice(0);

      expectedTestArray[i].qwiksort();
      actualTestArray[i].sort(this.actualSortComparison);

      if (!this.arraysEqual(expectedTestArray[i], actualTestArray[i])) {
        return false;
      }
    }

    return true;

  }
}

testHarness.run();