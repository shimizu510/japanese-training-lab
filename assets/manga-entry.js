(function(){
  var root=document.querySelector('[data-manga-app]');if(!root)return;
  var path=location.pathname,course=path.indexOf('/foundation/')>=0?'foundation_manga':path.indexOf('/n5/')>=0?'n5_manga':path.indexOf('/n4/')>=0?'n4_manga':'n3_manga';
  var key='japaneseLearning.manga.'+course+'.nextQuestion.v1',done=Math.max(0,Math.min(2,Number(localStorage.getItem(key))||0)),percent=Math.round(done*50);
  var panel=document.createElement('section');panel.className='manga-entry';panel.innerHTML='<div><span>YOUR PROGRESS</span><strong>'+percent+'% complete</strong></div><div class="manga-entry-actions"><button type="button" data-manga-resume>Resume</button><button type="button" data-manga-position>Start from '+percent+'%</button><button type="button" data-manga-reset>Start over</button></div>';
  root.insertBefore(panel,root.querySelector('.reader-panel'));
  function reader(){var node=root.querySelector('[data-reader]');node.hidden=false;root.querySelector('[data-quiz]').hidden=true;root.querySelector('[data-complete]').hidden=true;node.scrollIntoView({behavior:'smooth',block:'start'});}
  panel.querySelector('[data-manga-resume]').onclick=function(){if(done>0&&done<2){location.search='?resume=1';}else reader();};
  panel.querySelector('[data-manga-position]').onclick=function(){var value=prompt('Enter a starting position: 0 or 50.',String(percent));if(value===null)return;var number=Number(value);if(number!==0&&number!==50){alert('Please enter 0 or 50 for this two-question lesson.');return;}localStorage.setItem(key,String(number/50));location.search=number?'?resume=1':'?view=manga';};
  panel.querySelector('[data-manga-reset]').onclick=function(){localStorage.setItem(key,'0');location.search='?view=manga';};
})();
