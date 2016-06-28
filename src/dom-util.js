
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

  static bindElements(elements){
    // console.log(elements);

    var mutationObserver = new MutationObserver((mutations) => {

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

}
