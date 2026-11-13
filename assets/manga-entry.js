(function(){
  var root=document.querySelector('[data-manga-app]');if(!root)return;
  var path=location.pathname,course=path.indexOf('/foundation/')>=0?'foundation_manga':path.indexOf('/n5/')>=0?'n5_manga':path.indexOf('/n4/')>=0?'n4_manga':path.indexOf('/n2/')>=0?'n2_manga':path.indexOf('/n1/')>=0?'n1_manga':'n3_manga';
  var totals={foundation_manga:6,n5_manga:4,n4_manga:4,n3_manga:6,n2_manga:8,n1_manga:6},total=totals[course]||2,key='japaneseLearning.manga.'+course+'.nextQuestion.v1',done=Math.max(0,Math.min(total,Number(localStorage.getItem(key))||0)),percent=Math.round(done*100/total);
  var panel=document.createElement('section');panel.className='manga-entry';panel.innerHTML='<div><span>YOUR PROGRESS</span><strong>'+percent+'% complete</strong></div><div class="manga-entry-actions"><button type="button" data-manga-resume>Continue</button><button type="button" data-manga-position>Start from '+percent+'%</button><button type="button" data-manga-reset>Start over</button></div>';
  root.insertBefore(panel,root.querySelector('.reader-panel'));
  function reader(){var node=root.querySelector('[data-reader]');node.hidden=false;root.querySelector('[data-quiz]').hidden=true;root.querySelector('[data-complete]').hidden=true;node.scrollIntoView({behavior:'smooth',block:'start'});}
  panel.querySelector('[data-manga-resume]').onclick=function(){if(done>0&&done<total){location.search=done%2?'?resume=1':'?view=manga';}else reader();};
  panel.querySelector('[data-manga-position]').onclick=function(){localStorage.setItem(key,String(done));location.search=done?'?resume=1':'?view=manga';};
  panel.querySelector('[data-manga-reset]').onclick=function(){localStorage.setItem(key,'0');location.search='?view=manga';};
  if(new URLSearchParams(location.search).get('view')==='manga'){panel.hidden=true;reader();}
})();
