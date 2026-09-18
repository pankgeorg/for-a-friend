import {stories} from './stories.js';
import {advance, makeReport} from './core.js';
let lang = 'el', page = 'home', current = 0, step = 0, reportContext = null;
let draft = {narrative:'', place:'', incidentDate:'', relationship:''};
let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
const main = document.querySelector('main');
const t = (el,en) => lang === 'el' ? el : en;
const pair = value => value[lang === 'el' ? 0 : 1];
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const button = (label, action, cls='') => `<button class="${cls}" type="button" data-action="${action}">${label}</button>`;
const landscape = () => '<div class="landscape" aria-hidden="true"><div class="glow"></div><div class="ridge far"></div><div class="ridge near"></div><div class="orb a"></div><div class="orb b"></div><div class="orb c"></div></div>';
function capture() {
  const form = document.querySelector('form');
  if (form) draft = Object.fromEntries(new FormData(form));
}
function render(focus=true) {
  document.documentElement.lang = lang;
  document.body.classList.toggle('paused', paused);
  document.body.classList.toggle('ambient', page==='home' || page==='end');
  document.querySelector('#language').textContent = t('English','Ελληνικά');
  document.querySelector('#language').lang = t('en','el');
  document.querySelector('#motion').textContent = paused ? t('Κίνηση: ανενεργή','Motion: off') : t('Παύση κίνησης','Pause motion');
  document.querySelector('#motion').setAttribute('aria-pressed',String(paused));
  document.querySelector('#exit').textContent=t('Έξοδος ↗','Exit ↗');
  document.querySelector('#exit').title=t('Ανοίγει το Google. Δεν διαγράφει το ιστορικό του browser ή αρχεία που κατέβασες.','Opens Google. Does not erase browsing history or downloaded files.');
  document.querySelector('#footer').textContent=t('Χωρίς ήχο. Στον δικό σου ρυθμό. • Πρωτότυπο υπό ανάπτυξη','No sound. At your own pace. • Prototype in development');
  if (page==='home') main.innerHTML=`${landscape()}<section class="hero"><p class="eyebrow">${t('ΜΙΚΡΕΣ ΙΣΤΟΡΙΕΣ · ΟΣΑ ΔΕΝ ΦΑΙΝΟΝΤΑΙ','SMALL STORIES · WHAT GOES UNSEEN')}</p><h1>${t('Η βία μπορεί<br>να συμβεί σε<br><em>ένα φιλικό σου<br class="mobile"> πρόσωπο...</em>','violence may<br>happen to<br><em>a friend...</em>')}</h1><p class="intro">${t('Μερικές φορές, κάτι δεν μοιάζει σωστό.<br>Ας το δούμε μαζί. Μία στιγμή τη φορά.','Sometimes, something doesn’t feel right.<br>Let’s look together. One moment at a time.')}</p><div class="actions">${button(t('Ας ξεκινήσουμε','Let’s begin')+' <span aria-hidden="true">↗</span>','stories','primary')}${button(t('Θέλω να γράψω','I want to write'),'report','text-button')}</div><p class="micro">${t('Ιστορίες για απειλές, έλεγχο και βία. Μπορείς να παραλείψεις οποιαδήποτε.','Stories involve threats, control and violence. You can skip any of them.')}</p></section><div class="side-note" aria-hidden="true">${t('Μερικές ιστορίες<br>χρειάζονται χώρο.','Some stories<br>need space.')}</div>`;
  if (page==='stories') main.innerHTML=`<section class="content"><p class="eyebrow">${t('ΕΠΤΑ ΑΦΕΤΗΡΙΕΣ','SEVEN STARTING POINTS')}</p><h1 class="section-title">${t('Από πού θέλεις<br>να ξεκινήσεις;','Where would you<br>like to begin?')}</h1><p class="intro">${t('Δεν υπάρχει σωστή σειρά. Διάλεξε μια στιγμή.','There is no right order. Choose a moment.')}</p><div class="story-grid">${stories.map((story,i)=>`<button class="story-card" data-story="${i}"><span class="number">0${i+1}</span><span>${escape(pair(story.title))}</span><span aria-hidden="true">↗</span></button>`).join('')}</div>${button(t('Πίσω στην αρχή','Back to the beginning'),'home','text-button')}</section>`;
  if (page==='story') {
    const story=stories[current]; const last=step===story.scenes.length-1;
    main.innerHTML=`<section class="reading"><div class="reading-top">${button('← '+t('Όλες οι ιστορίες','All stories'),'stories','text-button')}<span>${step+1} / ${story.scenes.length}</span></div><div class="progress" aria-hidden="true">${story.scenes.map((_,i)=>`<i class="${i<=step?'done':''}"></i>`).join('')}</div><p class="eyebrow">${escape(pair(story.title))}</p><h1 class="scene">${escape(pair(story.scenes[step]))}</h1>${last?`<aside class="reflection"><p class="eyebrow">${t('ΜΙΑ ΣΚΕΨΗ ΓΙΑ ΝΑ ΚΡΑΤΗΣΕΙΣ','A THOUGHT TO TAKE WITH YOU')}</p><p>${escape(pair(story.reflection))}</p></aside>`:''}<div class="actions">${step?button('← '+t('Προηγούμενο','Previous'),'previous','text-button'):''}${button(last?t('Μείνε λίγο με αυτή τη σκέψη','Stay with this thought'):t('Και μετά;','And then?'),last?'end':'next','primary')}</div></section>`;
  }
  if (page==='end') main.innerHTML=`${landscape()}<section class="hero ending"><p class="eyebrow">${t('ΧΩΡΟΣ ΓΙΑ ΤΗ ΔΙΚΗ ΣΟΥ ΦΩΝΗ','ROOM FOR YOUR VOICE')}</p><h1>${t('Μια ιστορία.<br><em>Ίσως σου θυμίζει κάτι.</em>','A story.<br><em>Maybe it feels familiar.</em>')}</h1><p class="intro">${t('Μπορεί να αφορά ένα φιλικό σου πρόσωπο. Μπορεί εσένα. Μπορείς να γράψεις με τα δικά σου λόγια ή απλώς να μείνεις με τη σκέψη.','It might be about a friend. It might be about you. You can write in your own words, or simply sit with the thought.')}</p><div class="actions">${button(t('Θέλω να γράψω','I want to write'),'report','primary')}${button(t('Μια άλλη ιστορία','Another story'),'stories','text-button')}</div></section>`;
  if (page==='report') main.innerHTML=`<section class="content report"><p class="eyebrow">${t('ΜΕ ΤΑ ΔΙΚΑ ΣΟΥ ΛΟΓΙΑ','IN YOUR OWN WORDS')}</p><h1 class="section-title">${t('Τι θα ήθελες<br>να καταγράψεις;','What would you<br>like to record?')}</h1><p class="intro">${t('Δεν χρειάζεται να βρεις τη σωστή λέξη. Ξεκίνα από αυτό που θυμάσαι.','You don’t need to find the right word. Start with what you remember.')}</p><div class="notice">${t('Αυτός ο χώρος δεν στέλνει αναφορές και δεν παρακολουθείται. Το κείμενο παραμένει προσωρινά σε αυτή την καρτέλα, μέχρι να το καθαρίσεις ή να την κλείσεις/ανανεώσεις. Η λήψη δημιουργεί αρχείο στη συσκευή σου που μπορείς να επιλέξεις να μοιραστείς.','This space does not send reports and is not monitored. Your text stays temporarily in this tab until you clear it or close/reload the tab. Downloading creates a file on your device that you may choose to share.')}</div><form autocomplete="off"><label for="narrative">${t('Η ιστορία σου','Your account')}</label><textarea id="narrative" name="narrative" maxlength="20000" rows="8" required aria-describedby="narrative-hint">${escape(draft.narrative)}</textarea><p class="micro" id="narrative-hint">${t('Έως 20.000 χαρακτήρες. Γράψε όσα θέλεις· τα υπόλοιπα πεδία είναι προαιρετικά.','Up to 20,000 characters. Write as much as you wish; the remaining fields are optional.')}</p><details><summary>${t('Προσθήκη πλαισίου — προαιρετικά','Add context — optional')}</summary><div class="fields"><div><label for="place">${t('Περιοχή ή πόλη','Area or city')}</label><input id="place" name="place" maxlength="200" value="${escape(draft.place)}"><p class="micro">${t('Χωρίς αυτόματο εντοπισμό τοποθεσίας.','No automatic location tracking.')}</p></div><div><label for="incidentDate">${t('Ημερομηνία, αν τη θυμάσαι','Date, if you remember')}</label><input type="date" id="incidentDate" name="incidentDate" value="${escape(draft.incidentDate)}"></div><div><label for="relationship">${t('Σχέση μεταξύ των προσώπων','Relationship between the people')}</label><input id="relationship" name="relationship" maxlength="200" value="${escape(draft.relationship)}"></div></div></details><p class="micro">${t('Η καταγραφή δεν αποτελεί επαληθευμένο αποδεικτικό στοιχείο. Η ώρα προέρχεται από τη συσκευή σου.','This account is not verified evidence. The recording time comes from your device.')}</p><div class="actions"><button class="primary" type="submit">${t('Λήψη της καταγραφής','Download account')} ↓</button>${button(t('Καθαρισμός κειμένου','Clear account'),'clear','text-button')}</div><p id="status" role="status"></p></form>${button('← '+t('Επιστροφή στις ιστορίες','Back to stories'),'stories','text-button')}</section>`;
  if(focus) main.focus({preventScroll:true});
  if(focus) window.scrollTo({top:0,behavior:'instant'});
}
main.addEventListener('click',event=>{
  const target=event.target.closest('button'); if(!target || (target.dataset.action===undefined && target.dataset.story===undefined)) return;
  capture();
  if(target.dataset.story!==undefined) {current=Number(target.dataset.story);step=0;page='story';}
  else if(target.dataset.action==='next') step=advance(stories[current],step);
  else if(target.dataset.action==='previous') step=Math.max(0,step-1);
  else if(target.dataset.action==='clear') {
    if(!draft.narrative || confirm(t('Να διαγραφεί το κείμενο από αυτή την καρτέλα;','Clear your account from this tab?'))) draft={narrative:'',place:'',incidentDate:'',relationship:''};
    else return;
  } else if(target.dataset.action) { if(target.dataset.action==='report' && !draft.narrative) reportContext=page==='end'?stories[current].id:null; page=target.dataset.action; }
  render();
});
main.addEventListener('submit',event=>{
  event.preventDefault();capture();
  try {
    const report=makeReport(draft,lang,reportContext);
    const file=new Blob([JSON.stringify(report,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(file);const link=document.createElement('a');
    link.href=url;link.download='my-account.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    document.querySelector('#status').textContent=t('Ζητήθηκε η λήψη. Δεν στάλθηκε αναφορά.','Download requested. No report was sent.');
  } catch {document.querySelector('#status').textContent=t('Γράψε πρώτα κάτι στην ιστορία σου.','Please write something in your account first.');document.querySelector('textarea').focus();}
});
document.querySelector('#language').onclick=()=>{capture();lang=lang==='el'?'en':'el';render(false);};
document.querySelector('#motion').onclick=()=>{capture();paused=!paused;render(false);};
document.querySelector('#exit').onclick=()=>{draft={narrative:'',place:'',incidentDate:'',relationship:''};location.replace('https://www.google.com');};
window.addEventListener('pagehide',()=>{draft={narrative:'',place:'',incidentDate:'',relationship:''};const form=document.querySelector('form');if(form){form.reset();form.querySelectorAll('textarea,input').forEach(field=>{field.value='';field.defaultValue='';});}});
render(false);
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{document.querySelector('#footer').textContent+=t(' • Η λειτουργία εκτός σύνδεσης δεν είναι διαθέσιμη.',' • Offline mode is unavailable.');});

