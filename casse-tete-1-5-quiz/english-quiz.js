/* English-only Casse-tête Chapter 1–5 detail mastery */
const ENGLISH_BANK = [
  ...(window.EN_DETAIL_Q12 || []),
  ...(window.EN_DETAIL_Q345 || [])
].map((q,i)=>({...q,id:i+1}));
const enSaveKey='casseEnglishMasteryV1';
let enStore={missed:{},seen:0,correct:0,mastery:{}};
try {const p=JSON.parse(localStorage.getItem(enSaveKey)||'{}');enStore={...enStore,...p,missed:p.missed||{},mastery:p.mastery||{}}}catch(e){}
let enState={chapter:'all',level:'all',type:'all',size:10,mode:'all',list:[],index:0,selected:null,score:0,sessionWrong:[],completed:false,showAnswers:false};
const enSave=()=>{try{localStorage.setItem(enSaveKey,JSON.stringify(enStore))}catch(e){}};
function enPool(){
 return ENGLISH_BANK.filter(x=>
 (enState.chapter==='all'||String(x.c)===enState.chapter)&&
 (enState.level==='all'||x.d===enState.level)&&
 (enState.type==='all'||x.t===enState.type)&&
 (enState.mode!=='mistakes'||enStore.missed[x.id])
 );
}
function enStart(){
 const pool=enPool();
 if(!pool.length){alert(enState.mode==='mistakes'?'No missed questions match these filters. Change the filters or start a new set.':'No questions match these filters.');return}
 const asked=Number(enState.size)||10;
 enState.list=rand(pool).slice(0,asked===1000?pool.length:Math.min(asked,pool.length));
 enState.index=0;enState.selected=null;enState.score=0;enState.sessionWrong=[];
 enState.completed=false;enState.showAnswers=false;
 render();
}
function enChoose(v){
 if(enState.selected!==null)return;
 const q=enState.list[enState.index];
 enState.selected=v;
 enStore.seen+=1;
 if(v===q.a){
   enState.score++;
   enStore.correct++;
   if(enStore.missed[q.id]){
     enStore.mastery[q.id]=Math.min(2,(enStore.mastery[q.id]||0)+1);
     if(enStore.mastery[q.id]>=2){delete enStore.missed[q.id];delete enStore.mastery[q.id]}
   }
 }else{
   enStore.missed[q.id]=1;enStore.mastery[q.id]=0;
   enState.sessionWrong.push(q.id);
 }
 enSave();render();
}
function enNext(){
 enState.index++;
 enState.selected=null;
 if(enState.index>=enState.list.length)enState.completed=true;
 render();
}
function enRevisit(){
 enState.chapter='all';enState.level='all';enState.type='all';enState.mode='mistakes';
 enState.size=1000;enStart();
}
function enRevealList(){
 enState.showAnswers=!enState.showAnswers;render();
}
function enReset(){
 if(confirm('Clear your English quiz progress and saved mistakes?')){enStore={missed:{},seen:0,correct:0,mastery:{}};enSave();enState.list=[];enState.selected=null;render()}
}
function enSetting(name,value){
 if(name==='size')enState[name]=Number(value);else enState[name]=value;
 enState.list=[];enState.selected=null;enState.completed=false;render();
}
function enEnc(x){return esc(String(x))}
function enSelector(name,label,opts,value){
 return '<label class="en-field">'+label+' <select onchange="enSetting(\''+name+'\',this.value)">'+
 opts.map(opt=>'<option value="'+enEnc(opt[0])+'" '+(String(value)===String(opt[0])?'selected':'')+'>'+enEnc(opt[1])+'</option>').join('')+
 '</select></label>';
}
function englishQuiz(){
 const missed=Object.keys(enStore.missed).filter(id=>enStore.missed[id]).length;
 const byChapter=[1,2,3,4,5].map(c=>ENGLISH_BANK.filter(q=>q.c===c).length);
 let s='<div class="eyebrow">100 FACT-CHECKED DETAIL QUESTIONS · ENGLISH ONLY</div>'+
 '<h2 style="margin:8px 0 10px">English Deep-Dive Challenge</h2>'+
 '<p>Learn the <b>tiny details</b> from all five chapters. No French comprehension required here: every question, option and explanation is in English. The traps are precise, not trick wording.</p>'+
 '<div class="en-summary-row"><div><strong>100</strong><span>Total questions</span></div>'+
 '<div><strong>5 × 20</strong><span>Questions per chapter</span></div>'+
 '<div><strong>'+missed+'</strong><span>Saved mistakes</span></div>'+
 '<div><strong>'+enStore.seen+'</strong><span>Answers submitted</span></div></div>'+
 '<div class="en-toolbar">'+
 enSelector('chapter','Chapter',[['all','All five'],...[1,2,3,4,5].map(x=>[x,'Chapter '+x])],enState.chapter)+
 enSelector('level','Difficulty',[['all','Easy + hard'],['easy','Easy'],['hard','Hard details']],enState.level)+
 enSelector('type','Question type',[['all','Mixed'],['mc','Multiple choice'],['tf','True / False']],enState.type)+
 enSelector('size','Set size',[['10','10 questions'],['20','20 questions'],['40','40 questions'],['1000','All available']],enState.size)+
 '</div>'+
 '<div class="row en-actions"><button class="btn" onclick="enState.mode=\'all\';enStart()">▶ Start selected test</button>'+
 '<button class="btn secondary" onclick="enRevisit()" '+(!missed?'disabled':'')+'>↺ Retry missed ('+missed+')</button>'+
 '<button class="btn ghost" onclick="enReset()">Reset saved progress</button></div>';
 if(enState.list.length===0){
   s+='<div class="en-intro"><h3>Try a detail-heavy English test</h3><p>These are based on the five provided chapters, including classroom behavior, exact events, dialogue, appearances, motivations, numbers, and rumours versus reality.</p>'+
   '<div class="en-tips"><span>✓ No timer</span><span>✓ No French required</span><span>✓ Answers hidden until you choose</span><span>✓ Wrong answers saved</span></div>'+
   '<button class="btn" onclick="enState.chapter=\'all\';enState.level=\'hard\';enState.size=20;enState.mode=\'all\';enStart()">Start 20 hard questions →</button></div>'+
   '<div class="en-map">'+byChapter.map((n,i)=>'<div class="en-chapter-tile"><b>CH. '+(i+1)+'</b><span>'+n+' questions</span></div>').join('')+'</div>';
   return s;
 }
 if(enState.completed){
   const score=enState.score, total=enState.list.length,pct=Math.round(score/total*100);
   s+='<div class="en-finish"><div class="eyebrow">QUIZ COMPLETED</div><h2>'+score+' / '+total+'</h2><p>'+pct+'% correct</p>'+
   '<p>'+(pct>=95?'Excellent detail mastery. Try another chapter or difficulty.':pct>=80?'Strong! Repeat the mistakes to secure the fine details.':'Review the explanations, then redrill missed facts for retention.')+'</p>'+
   '<div class="row" style="justify-content:center"><button class="btn" onclick="enStart()">Try a fresh set</button>'+
   '<button class="btn secondary" onclick="enRevisit()" '+(!missed?'disabled':'')+'>Retry saved mistakes</button>'+
   '<button class="btn ghost" onclick="enRevealList()">'+(enState.showAnswers?'Hide':'Show')+' questions & answers</button></div></div>';
   if(enState.showAnswers){
     s+='<div class="en-review">'+enState.list.map((q,i)=>'<details><summary>Question '+(i+1)+' · Chapter '+q.c+' · '+enEnc(q.q)+'</summary>'+
     '<p><b>Correct:</b> '+enEnc(q.t==='tf'?(q.a?'True':'False'):q.o[q.a])+'</p><p>'+enEnc(q.why)+'</p></details>').join('')+'</div>';
   }
   return s;
 }
 const q=enState.list[enState.index],i=enState.index;
 s+='<div class="en-question"><div class="en-question-top"><span>Question '+(i+1)+' of '+enState.list.length+'</span>'+
 '<span>Chapter '+q.c+' · '+(q.d==='hard'?'Hard detail':'Easy recall')+' · '+(q.t==='tf'?'True / False':'Multiple choice')+'</span>'+
 '<span>Score '+enState.score+'</span></div>'+
 '<div class="progress" aria-label="Quiz progress"><div style="width:'+(i/enState.list.length*100)+'%"></div></div>'+
 '<h3>'+enEnc(q.q)+'</h3><div class="en-options">'+
 (q.t==='tf'?[['True',true],['False',false]]:q.o.map((x,j)=>[String.fromCharCode(65+j)+'. '+x,j]))
 .map(([label,value])=>'<button class="option '+(enState.selected!==null?(value===q.a?'correct':value===enState.selected?'wrong':''):'')+
 '" onclick="enChoose('+(typeof value==='boolean'?value:Number(value))+')" '+(enState.selected!==null?'disabled':'')+'>'+
 enEnc(label)+'</button>').join('')+'</div>'+
 (enState.selected===null?'<p class="mini muted">Think about the actual chapter detail before answering. There are no penalties for wrong answers.</p>':
 '<div class="en-feedback"><strong class="'+(enState.selected===q.a?'positive':'negative')+'">'+
 (enState.selected===q.a?'✓ Correct!':'✕ Not quite — saved for review')+'</strong>'+
 '<div><b>Correct answer:</b> '+enEnc(q.t==='tf'?(q.a?'True':'False'):q.o[q.a])+'</div>'+
 '<p>'+enEnc(q.why)+'</p></div>'+
 '<button class="btn en-next" onclick="enNext()">'+(i===enState.list.length-1?'Finish and score →':'Next question →')+'</button>')+
 '</div>';
 return s;
}
NAV.splice(NAV.findIndex(x=>x[0]==='writing'),0,['english','⌕','English Deep Dive']);
const enOldHome=home;
home=function(){
 let h=enOldHome();
 const marker='<div class="card compact-summary">';
 if(h.includes(marker))h=h.replace(marker,
   '<div class="en-home-banner"><div><div class="eyebrow">NEW · ALL FIVE CHAPTERS</div><h3>100 English-only detail questions</h3>'+
   '<p>Easy + difficult multiple choice and true/false. Catch the tiny facts you might miss in the story.</p></div>'+
   '<button class="btn" onclick="navigate(\'english\')">Train English details →</button></div>'+marker);
 return h;
};
const enOldRender=render;
render=function(){
 const target=state.page==='english';
 if(!target){enOldRender();return;}
 // Use the established page shell without changing global navigation or focus behavior.
 const previous=state.page;
 state.page='home';
 enOldRender();
 state.page=previous;
 navigation();
 const main=document.getElementById('view');
 const bar=main.querySelector('.focus-toolbar');
 const footer='<div class="footer">All 100 English questions are based on the supplied Casse-tête chapters 1–5. Study explanations are original, not official teacher answers.</div>';
 const body=englishQuiz()+footer;
 // Preserve the focus toolbar so focus mode and page switching still work.
 if(bar){const toolbar=bar.outerHTML;main.innerHTML=toolbar+body;}
 else main.innerHTML=body;
};
render();
