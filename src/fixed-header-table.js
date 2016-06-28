
class FixedTable{

  constructor(table){

    this.table = table;
    this.col = 2;
    this.row = 2;

    table.style.position = 'relative';

    this._wrap();

    var header = this._createTopHeader();
    header.style.position = 'absolute';
    header.style.top = '22px';
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
