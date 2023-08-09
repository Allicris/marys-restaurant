// create the Stack class with two methods to remove and add an element
class Stack {
  //by default it's an empty array
  constructor(container = []){
    this.container = container;
  }

  addToSTack(el){
    return this.container.unshift(el);
  }

  removeFromStack(){
    return this.container.shift();
  }
}

module.exports = Stack;