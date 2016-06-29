(function(){
'use strict';

window.addEventListener('DOMContentLoaded', function(){
  main();
});

function main(){

  var fields = [
    "連番",
    "氏名",
    "氏名_カタカナ",
    "氏名_ローマ字",
    "性別",
    "電話番号",
    "FAX",
    "携帯電話",
    "メールアドレス",
    "郵便番号",
    "生年月日",
    "年齢",
    "出身地",
    "血液型",
    "住所",
    "住所_カタカナ",
    "住所_ローマ字",
  ];

  window.vue = new Vue({
    el: '#app',
    data: {
      fields: fields,
      people: [],
      contenteditable: true,
    },
  })

  superagent
    .get('data.json')
    .accept('json')
    .end(function(err, res){
      var people = JSON.parse(res.text);
      vue.people = people.slice(0,30);

    });

  document.querySelectorAll('table').forEach(function(table){
    new FixedTable(table);
  });


  var p1 = document.getElementById('p1');
  DOMUtil.insertAfter(p1, DOMUtil.boundClone(p1));

  var p2 = document.getElementById('p2');
  DOMUtil.insertAfter(p2, DOMUtil.boundClone(p2));

}

})()
