const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.start = null;
  }

  root() {
    return this.start;
  }

  add(data) {
    this.start = addItem(this.start, data);

    function addItem(element, value) {
      // если нет потомков, то добавляем новый узел
      if (!element) {
        return {
          data: value,
          left: null,
          right: null,
        }
      }

      // для только уникальных элеметнов
      // определяем куда добавлять (влево или вправо)
      if (element.data === value) {
        return element;
      } else if (element.data < value) {
        element.right = addItem(element.right, value);
      } else {
        element.left = addItem(element.left, value);
      }

      return element;
    }
  }

  has(data) {
    return hasItem(this.start, data);

    function hasItem(element, value) {
      if (!element) {
        return false;
      }

      if (element.data === value) {
        return true;
      } else if (element.data < value) {
        return hasItem(element.right, value)
      } else {
        return hasItem(element.left, value);
      }
    }
  }

  find(data) {
    return searchItem(this.start, data);

    function searchItem(element, value) {
      if (!element) {
        return null;
      }

      if (element.data === value) {
        return element;
      } else if (element.data < value) {
        return searchItem(element.right, value)
      } else {
        return searchItem(element.left, value);
      }
    }
  }

  remove(data) {
    this.start = deleteItem(this.start, data);

    function deleteItem(element, value) {
      if (!element) {
        return null;
      }

      if (value > element.data) {
        element.right = deleteItem(element.right, value);
        return element;
      } else if (value < element.data) {
        element.left = deleteItem(element.left, value);
        return element;
      } else {
        // нет потомков
        if (!element.left && !element.right) {
          return null;
        }
        // потомки есть только справа
        if (!element.left) {
          element = element.right;
          return element;
        }
        // потомки есть только слева
        if (!element.right) {
          element = element.left;
          return element;
        }

        // потомки есть и справа, и слева
        let maxLeft = element.left;
        while (maxLeft.right) {
          maxLeft = maxLeft.right;
        }
        element.data = maxLeft.data;
        element.left = deleteItem(element.left, maxLeft.data);

        return element;
      }
    }
  }

  min() {
    if (!this.start) {
      return;
    }

    let element = this.start;
    while (element.left) {
      element = element.left;
    }

    return element.data;
  }

  max() {
    if (!this.start) {
      return;
    }

    let element = this.start;
    while (element.right) {
      element = element.right;
    }

    return element.data;
  }
}

module.exports = {
  BinarySearchTree
};
