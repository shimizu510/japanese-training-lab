(function(){
  const site='https://shimizu510.github.io/japanese-training-lab/';
  const share=document.querySelector('[data-native-share]');
  const status=document.querySelector('[data-share-status]');
  if(share)share.addEventListener('click',async function(){
    const data={title:'Japanese Training Lab',text:'Learn Japanese for free from hiragana to JLPT N1—no signup required.',url:site};
    try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(data.text+' '+site);share.textContent='Link copied ✓';status.textContent='Send it to a friend, class or Japanese learning community.';}}
    catch(error){if(error&&error.name!=='AbortError'){share.textContent='Copy this address';status.textContent=site;}}
  });
  document.querySelectorAll('[data-copy]').forEach(function(button){button.addEventListener('click',async function(){const text=button.closest('article').querySelector('[data-copy-text]').textContent.trim();try{await navigator.clipboard.writeText(text);button.textContent='Copied ✓';}catch(_){button.textContent='Select the text above to copy';}});});
}());
