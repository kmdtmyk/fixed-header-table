
class FixedTable{

  constructor(table){

    this.table = table;
    this.col = 2;
    this.row = 2;

    table.style.position = 'relative';

    this._wrap();

    var header = this._createTopHeader();
    header.style.position = 'absolute';
    header.style.top = '-22px';
    DOMUtil.insertAfter(table, header);


    this._observe(table, function(){
      console.log(arguments);
    });

  }

  _wrap(){
    var div = document.createElement('div');
    div.style.position = 'relative';
    DOMUtil.wrap(this.table, div);
  }


  _observe(element, callback){
    var mutationObserver = new MutationObserver(callback);
    var options = {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true,
    };
    mutationObserver.observe(element, options);

  }

  _createCorner(){

  }

  _createTopHeader(){
    var clone = this.table.cloneNode(true);
    clone.querySelectorAll('tbody').forEach(function(tbody){
      clone.removeChild(tbody);
    })
    return clone;
  }

  _createLeftHeader(){

  }




}


class DOMUtil{

  static insertAfter(element, insert){
    element.parentNode.insertBefore(insert, element.nextSibling);
  }

  static wrap(element, wrapper){
    element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
  }

  static twoWayBind(element1, element2){

  }

}











(function(){
'use strict';

window.addEventListener('DOMContentLoaded', function(){
  // main();
});

function main(){

  var tables = document.querySelectorAll('table');
  // console.log(tables);


  tables.forEach(function(table){
    var div = document.createElement('div');
    div.style.position = 'relative';
    wrap(table, div);

    table.style.position = 'relative';

    // console.log(table.innerHTML);

    var cloneTable = cloneHeader(table);
    cloneTable.style.position = 'absolute';
    cloneTable.style.top = '-22px';
    insertAfter(table, cloneTable);


    // var cloneTable = table.cloneNode(true);
    // cloneTable.style.position = 'absolute';
    // cloneTable.style.top = 0;
    // div.appendChild(cloneTable);

    // table.addEventListener('DOMNodeInserted', function(e){
    //   console.log(e)
    // })
    // table.addEventListener('DOMNodeRemoved', function(e){
    //   console.log(e)
    // })
  })


  var mo = new MutationObserver(function(){
    console.log(arguments);
  });

  tables.forEach(function(table){
    var options = {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true,
    };
    mo.observe(table, options);
  });



}

function observe(element, callback){
  var mutationObserver = new MutationObserver(callback);
  var options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  };
  mutationObserver.observe(element, options);

}

function twoWayBind(element1, element2){

}



function wrap(element, wrapper){
  element.parentNode.replaceChild(wrapper, element);
  wrapper.appendChild(element);
}

function insertAfter(element, insert){
  element.parentNode.insertBefore(insert, element.nextSibling);
}

function cloneHeader(table){
  var clone = table.cloneNode(true);
  clone.querySelectorAll('tbody').forEach(function(tbody){
    clone.removeChild(tbody);
  })
  return clone;
}

function eachChild(elements, name, callback){
  elements.forEach(function(element){
    element.querySelectorAll(name).forEach(function(child){
      callback(child);
    })
  });
}

function scrollTop(){

}



})()
