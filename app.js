import {stories} from './stories.js';
import {advance, makeReport} from './core.js';
let lang = 'el', page = 'home', current = 0, step = 0, reportContext = null, reaction = null;
let draft = {narrative:'', place:'', incidentDate:'', relationship:'', callbackPhone:''};
let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
const main = document.querySelector('main');
const brandPhrases = {el:['για μια φίλη','για έναν φίλο','για ένα παιδί','για κάποιον δικό σου','για σένα'],en:['for a friend','for a child','for someone close','for you']};
let brandIndex = 0;
function renderBrand() {
  const brand = document.querySelector('.brand');
  brand.textContent = brandPhrases[lang][brandIndex % brandPhrases[lang].length] + '...';
}
setInterval(() => { if (!paused && !document.hidden) { brandIndex++; renderBrand(); } }, 5500);
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
  renderBrand();
  document.body.classList.toggle('paused', paused);
  document.body.classList.toggle('ambient', page==='home' || page==='end');
  document.querySelector('#language').textContent = t('English','Ελληνικά');
  document.querySelector('#language').lang = t('en','el');
  document.querySelector('#motion').textContent = paused ? t('Κίνηση: ανενεργή','Motion: off') : t('Παύση κίνησης','Pause motion');
  document.querySelector('#motion').setAttribute('aria-pressed',String(paused));
  document.querySelector('#exit').textContent=t('Έξοδος ↗','Exit ↗');
  document.querySelector('#exit').title=t('Ανοίγει το Google. Δεν διαγράφει το ιστορικό του browser ή αρχεία που κατέβασες.','Opens Google. Does not erase browsing history or downloaded files.');
  document.querySelector('#footer').textContent=t('Πρωτότυπο υπό ανάπτυξη','Prototype in development');
  if (page==='home') main.innerHTML=`${landscape()}<section class="hero"><p class="eyebrow">${t('ΜΙΚΡΕΣ ΙΣΤΟΡΙΕΣ · ΟΣΑ ΔΕΝ ΦΑΙΝΟΝΤΑΙ','SMALL STORIES · WHAT GOES UNSEEN')}</p><h1>${t('Η βία μπορεί<br>να συμβεί σε<br><em>κάποιον<br class="mobile"> που ξέρεις...</em>','violence may<br>happen to<br><em>a friend...</em>')}</h1><p class="intro">${t('Κάποιες συμπεριφορές δεν είναι εύκολο να τις αναγνωρίσεις.<br>Δες τις μέσα από επτά σύντομες ιστορίες.','Some behaviour can be hard to recognise.<br>Explore seven short stories.')}</p><div class="actions">${button(t('Δες τις ιστορίες','Explore the stories')+' <span aria-hidden="true">↗</span>','stories','primary')}${button(t('Συνέβη σε κάποιον που ξέρεις;','Has this happened to someone you know?'),'report','text-button')}</div><p class="micro">${t('Ιστορίες για απειλές, έλεγχο και βία. Μπορείς να παραλείψεις οποιαδήποτε.','Stories involve threats, control and violence. You can skip any of them.')}</p></section><div class="side-note" aria-hidden="true">${t('Δεν είναι πάντα<br>όπως φαίνεται.','There may be more<br>to the story.')}</div>`;
  if (page==='stories') main.innerHTML=`<section class="content"><p class="eyebrow">${t('ΕΠΤΑ ΙΣΤΟΡΙΕΣ','SEVEN STORIES')}</p><h1 class="section-title">${t('Από πού θέλεις<br>να ξεκινήσεις;','Where would you<br>like to begin?')}</h1><p class="intro">${t('Διάλεξε όποια ιστορία θέλεις.','Start with any story.')}</p><div class="story-grid">${stories.map((story,i)=>`<button class="story-card" data-story="${i}"><span class="number">0${i+1}</span><span>${escape(pair(story.title))}</span><span aria-hidden="true">↗</span></button>`).join('')}</div>${button(t('Πίσω στην αρχή','Back to the beginning'),'home','text-button')}</section>`;
  if (page==='story') {
    const story=stories[current]; const last=step===story.scenes.length-1;
    main.innerHTML=`<section class="reading"><div class="reading-top">${button('← '+t('Όλες οι ιστορίες','All stories'),'stories','text-button')}<span>${step+1} / ${story.scenes.length}</span></div><div class="progress" aria-hidden="true">${story.scenes.map((_,i)=>`<i class="${i<=step?'done':''}"></i>`).join('')}</div><p class="eyebrow">${escape(pair(story.title))}</p><h1 class="scene">${escape(pair(story.scenes[step]))}</h1><div class="actions">${step?button('← '+t('Προηγούμενο','Previous'),'previous','text-button'):''}${button(last?t('Εσύ τι λες;','What do you think?'):t('Και μετά;','And then?'),last?'end':'next','primary')}</div></section>`;
  }
  if (page==='end') main.innerHTML=`${landscape()}<section class="hero ending"><p class="eyebrow">${escape(pair(stories[current].title))}</p><h1>${t('Εσύ τι λες;','What do you think?')}</h1><p class="intro">${t('Σκέψου την ιστορία που μόλις διάβασες. Είναι OK αυτό που συμβαίνει;','Think about the story you just read. Is what happens OK?')}</p><div class="reaction-fabs" role="group" aria-label="${t('Πώς σου φαίνεται αυτό που συμβαίνει;','How do you feel about what happens?')}"><button type="button" lang="en" class="fab fab-ok" data-action="react-ok" aria-pressed="${reaction==='ok'}">it's ok</button><button type="button" lang="en" class="fab fab-not-ok" data-action="react-not-ok" aria-pressed="${reaction==='not-ok'}">it's not ok</button></div><div class="reaction-feedback" role="status">${reaction ? `<p class="eyebrow">${t('ΑΣ ΤΟ ΔΟΥΜΕ ΛΙΓΟ','LET’S LOOK CLOSER')}</p><p>${escape(pair(stories[current].reflection))}</p>` : ''}</div><section class="help-panel" aria-labelledby="help-title"><h2 id="help-title">${t('Χρειάζεται άμεση βοήθεια;','Need immediate help?')}</h2><a class="police-call" href="tel:100">100 <span>${t('Άμεση Δράση · Ελλάδα','Police emergency · Greece')}</span></a><p>${t('Αν δεν μπορείς να μιλήσεις, στείλε SMS στο 100 με το όνομά σου, την ακριβή διεύθυνση και τι συμβαίνει.','If you cannot speak, text 100 with your name, exact address and what is happening.')}</p><div class="help-links"><a href="sms:100">${t('SMS στο 100','Text 100')}</a><a href="https://www.astynomia.gr/odigos-tou-politi/chrisimes-symvoules/endooikogeneiaki-via/" target="_blank" rel="noopener noreferrer">${t('Πληροφορίες από την ΕΛ.ΑΣ. ↗','Hellenic Police guidance ↗')}</a></div></section><div class="record-link">${button(t('Θέλω απλά να το καταγράψω','I just want to record it'),'report','text-button')}</div>${button(t('Άλλη ιστορία','Another story'),'stories','text-button')}</section>`;
  if (page==='report') main.innerHTML=`<section class="content report"><p class="eyebrow">${t('ΜΕ ΤΑ ΔΙΚΑ ΣΟΥ ΛΟΓΙΑ','IN YOUR OWN WORDS')}</p><h1 class="section-title">${t('Τι θα ήθελες<br>να καταγράψεις;','What would you<br>like to record?')}</h1><p class="intro">${t('Τι έγινε; Πού και πότε; Γράψε όσα γνωρίζεις, όπως τα θυμάσαι.','What happened? Where and when? Write what you know, as you remember it.')}</p><div class="notice">${t('Αυτός ο χώρος δεν στέλνει αναφορές και δεν παρακολουθείται. Το κείμενο παραμένει προσωρινά σε αυτή την καρτέλα, μέχρι να το καθαρίσεις ή να την κλείσεις/ανανεώσεις. Η λήψη δημιουργεί αρχείο στη συσκευή σου που μπορείς να επιλέξεις να μοιραστείς.','This space does not send reports and is not monitored. Your text stays temporarily in this tab until you clear it or close/reload the tab. Downloading creates a file on your device that you may choose to share.')}</div><form autocomplete="off"><label for="narrative">${t('Τι συνέβη','What happened')}</label><textarea id="narrative" name="narrative" maxlength="20000" rows="8" required aria-describedby="narrative-hint">${escape(draft.narrative)}</textarea><p class="micro" id="narrative-hint">${t('Έως 20.000 χαρακτήρες. Γράψε όσα θέλεις· τα υπόλοιπα πεδία είναι προαιρετικά.','Up to 20,000 characters. Write as much as you wish; the remaining fields are optional.')}</p><details><summary>${t('Περισσότερα στοιχεία — προαιρετικά','More details — optional')}</summary><div class="fields"><div><label for="place">${t('Περιοχή ή πόλη','Area or city')}</label><input id="place" name="place" maxlength="200" value="${escape(draft.place)}"><p class="micro">${t('Χωρίς αυτόματο εντοπισμό τοποθεσίας.','No automatic location tracking.')}</p></div><div><label for="incidentDate">${t('Ημερομηνία, αν τη θυμάσαι','Date, if you remember')}</label><input type="date" id="incidentDate" name="incidentDate" value="${escape(draft.incidentDate)}"></div><div><label for="relationship">${t('Σχέση μεταξύ των προσώπων','Relationship between the people')}</label><input id="relationship" name="relationship" maxlength="200" value="${escape(draft.relationship)}"></div></div></details><label for="callbackPhone">${t('Τηλέφωνο για επανάκληση — προαιρετικά','Phone number for a callback — optional')}</label><input type="tel" inputmode="tel" id="callbackPhone" name="callbackPhone" maxlength="40" autocomplete="off" aria-describedby="callback-hint" value="${escape(draft.callbackPhone || '')}"><p class="micro" id="callback-hint">${t('Βάλε έναν αριθμό όπου είναι ασφαλές να σε καλέσουν. Προς το παρόν αποθηκεύεται μόνο στο αρχείο που κατεβάζεις· δεν ζητείται επανάκληση.','Use a number where it is safe to call you. For now it is included only in your downloaded file; no callback is requested.')}</p><p class="micro">${t('Η καταγραφή δεν αποτελεί επαληθευμένο αποδεικτικό στοιχείο. Η ώρα προέρχεται από τη συσκευή σου.','This account is not verified evidence. The recording time comes from your device.')}</p><div class="actions"><button class="primary" type="submit">${t('Λήψη της καταγραφής','Download account')} ↓</button>${button(t('Καθαρισμός κειμένου','Clear account'),'clear','text-button')}</div><p id="status" role="status"></p></form>${button('← '+t('Επιστροφή στις ιστορίες','Back to stories'),'stories','text-button')}</section>`;
  if(focus) main.focus({preventScroll:true});
  if(focus) window.scrollTo({top:0,behavior:'instant'});
}
main.addEventListener('click',event=>{
  const target=event.target.closest('button'); if(!target || (target.dataset.action===undefined && target.dataset.story===undefined)) return;
  capture();
  if(target.dataset.story!==undefined) {current=Number(target.dataset.story);step=0;reaction=null;page='story';}
  else if(target.dataset.action==='react-ok' || target.dataset.action==='react-not-ok') { reaction=target.dataset.action==='react-ok'?'ok':'not-ok'; render(false); main.querySelector('[data-action="'+target.dataset.action+'"]').focus({preventScroll:true}); return; }
  else if(target.dataset.action==='next') step=advance(stories[current],step);
  else if(target.dataset.action==='previous') step=Math.max(0,step-1);
  else if(target.dataset.action==='clear') {
    if(!draft.narrative || confirm(t('Να διαγραφεί το κείμενο από αυτή την καρτέλα;','Clear your account from this tab?'))) draft={narrative:'',place:'',incidentDate:'',relationship:'', callbackPhone:''};
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
document.querySelector('#exit').onclick=()=>{draft={narrative:'',place:'',incidentDate:'',relationship:'', callbackPhone:''};location.replace('https://www.google.com');};
window.addEventListener('pagehide',()=>{draft={narrative:'',place:'',incidentDate:'',relationship:'', callbackPhone:''};const form=document.querySelector('form');if(form){form.reset();form.querySelectorAll('textarea,input').forEach(field=>{field.value='';field.defaultValue='';});}});
render(false);
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{document.querySelector('#footer').textContent+=t(' • Η λειτουργία εκτός σύνδεσης δεν είναι διαθέσιμη.',' • Offline mode is unavailable.');});

