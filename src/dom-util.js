
class DOMUtil{

  static insertAfter(element, insert){
    element.parentNode.insertBefore(insert, element.nextSibling);
  }

  static wrap(element, wrapper){
    element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
  }

  static boundClone(element){
    var clone = element.cloneNode(true);
    this.bindElements([element, clone])

    return clone;
  }

  static syncInnerText(elements, text){
    elements.forEach((element) => {
      if(element.innerText !== text){
        element.innerText = text;
      }
    })
  }

  static syncAttribute(elements, name, value){
    elements.forEach((element) => {
      if(value === null){
        element.removeAttribute(name);
      }else if(element.getAttribute(name) !== value){
        element.setAttribute(name, value);
      }
    })
  }

  static bindElements(elements){
    // console.log(elements);

    var mutationObserver = new MutationObserver((mutations) => {
      // console.log(mutations)
      mutations.forEach((mutation) => {
        if(mutation.type === 'attributes'){
          var name = mutation.attributeName;
          var value = mutation.target.getAttribute(name);
          this.syncAttribute(elements, name, value);
        }
      })

      var mutation = mutations[mutations.length - 1];
      var type = mutation.type;
      var text;
      if(type === 'characterData'){
        text = mutation.target.data;
      }else{
        text = mutation.target.innerText;
      }
      this.syncInnerText(elements, text);

    });

    var options = {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true,
    };

    elements.forEach((element) => {
      mutationObserver.observe(element, options);
    });

  }

  static getAbsoluteTop(element){
    var scrollY = window.scrollY;
    var rect = element.getBoundingClientRect();
    return rect.top + window.pageYOffset;
  }

  static getAbsoluteBottom(element){
    var scrollY = window.scrollY;
    var rect = element.getBoundingClientRect();
    return rect.bottom + window.pageYOffset;
  }

  static getHeight(element){
    var rect = element.getBoundingClientRect();
    return rect.height;
  }

}
