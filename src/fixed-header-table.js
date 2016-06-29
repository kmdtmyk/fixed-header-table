
class FixedTable{

  constructor(table){

    this.table = table;
    this.col = 2;
    this.row = 2;

    this._wrap();
    this._createTopHeader();

    this._observe(table, () => {
      this._syncTopHeaderSize();
      this._updateHeaders();
    });

    this._scrollWatch();

  }

  _scrollWatch(){
    document.addEventListener('scroll', (e) => {
      this._updateHeaders();
    });
  }

  _updateHeaders(){
    this._updateTopHeader();
  }

  _updateTopHeader(){
    var scrollY = window.scrollY;
    var tableTop = DOMUtil.getAbsoluteTop(this.table);
    var tableBottom = DOMUtil.getAbsoluteBottom(this.table);
    var headerBottom = DOMUtil.getAbsoluteBottom(this.topHeader);
    var headerHeight = this.topHeader.getBoundingClientRect().height;

    if(tableBottom - headerHeight < scrollY){
      // console.log('leave')
      this._leaveTopHeader();
    }else if(tableTop < scrollY){
      // console.log('fix')
      this._fixTopHeader();
    }else{
      // console.log('reset')
      this._resetTopHeader();
    }
  }

  _fixTopHeader(){
    this.topHeader.style.display = 'block';
    this.topHeader.style.position = 'fixed';
    this.topHeader.style.top = 0;
  }

  _leaveTopHeader(){
    this.topHeader.style.display = 'block';
    this.topHeader.style.position = 'absolute';
    this.topHeader.style.top = DOMUtil.getHeight(this.table) - DOMUtil.getHeight(this.topHeader) + 'px';
  }

  _resetTopHeader(){
    this.topHeader.style.position = 'absolute';
    this.topHeader.style.top = 0;
  }

  _syncTopHeaderSize(){
    var tableThs = this.table.querySelectorAll('th');
    var topHeaderThs = this.topHeader.querySelectorAll('th');

    this.topHeader.style.width = this.table.offsetWidth + 'px';

    topHeaderThs.forEach((th, index) => {
      var tableTh = tableThs[index];
      var offsetWidth = tableTh.offsetWidth;
      var offsetHeight = tableTh.offsetHeight;
      // console.log(offsetWidth, offsetHeight)
      th.style.width = offsetWidth - 3 + 'px';
      // th.style.height = offsetHeight + 'px';
    });
  }

  _wrap(){
    var div = document.createElement('div');
    div.style.position = 'relative';
    DOMUtil.wrap(this.table, div);
    this.table.style.position = 'relative';
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
    var table = this.table;

    var topHeader = table.cloneNode(true);
    topHeader.querySelectorAll('tbody').forEach(function(tbody){
      topHeader.removeChild(tbody);
    });

    var originalThs = table.querySelectorAll('th');
    var topHeaderThs = topHeader.querySelectorAll('th');

    topHeaderThs.forEach((th, index) => {
      var originalTh = originalThs[index];
      DOMUtil.bindElements([th, originalTh])
    });

    topHeader.style.position = 'absolute';
    topHeader.style.top = 0;
    DOMUtil.insertAfter(table, topHeader);
    this.topHeader = topHeader;

  }

  _createLeftHeader(){

  }




}
