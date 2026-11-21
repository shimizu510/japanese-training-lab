(function(){
  'use strict';
  var root=document.querySelector('[data-latest-manga]');if(!root)return;
  fetch('assets/manga-catalog.json',{cache:'no-cache'}).then(function(response){if(!response.ok)throw new Error('catalog');return response.json();}).then(function(items){
    var latest=items.filter(function(item){return item&&item.publishedAt&&item.images;}).sort(function(a,b){return Date.parse(b.publishedAt)-Date.parse(a.publishedAt);})[0];if(!latest)return;
    var image=root.querySelector('[data-latest-manga-image]');
    function setLanguage(language){image.src=latest.images[language];image.alt=(language==='ja'?'日本語版：':'English edition: ')+latest.title;root.querySelectorAll('[data-latest-manga-language]').forEach(function(button){var active=button.dataset.latestMangaLanguage===language;button.classList.toggle('active',active);button.setAttribute('aria-pressed',active?'true':'false');});}
    root.querySelector('[data-latest-manga-title]').textContent=latest.title;root.querySelector('[data-latest-manga-summary]').textContent=latest.summary;root.querySelector('[data-latest-manga-ja-level]').textContent='· JLPT '+latest.level;root.querySelectorAll('[data-latest-manga-link]').forEach(function(link){link.href=latest.lessonUrl;});root.querySelectorAll('[data-latest-manga-language]').forEach(function(button){button.addEventListener('click',function(){setLanguage(button.dataset.latestMangaLanguage);});});setLanguage('en');
  }).catch(function(){});
})();
