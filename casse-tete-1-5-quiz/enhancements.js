/* Casse-tête Quiz Lab — focused productivity + retention improvements */
(function () {
  'use strict';
  let focusOn = true;
  try { focusOn = localStorage.getItem('ct-focus-v2') !== 'off'; } catch (e) {}
  state.listenSpeed = Number(progress.listenSpeed || 0.85);
  state.autoPlayListen = progress.autoListen !== false;
  state.listenReviewMode = false;
  state.shortDraft = '';
  state._readIndexSeen = -1;
  progress.mistakes = progress.mistakes || {};
  progress.writeMastery = progress.writeMastery || {};
  progress.writeDrafts = progress.writeDrafts || {};

  STUDY.intros = [
    ['Dans Casse-tête, la relation entre Justine et Thomas change peu à peu.', 'In Casse-tête, the relationship between Justine and Thomas changes little by little.'],
    ['Dans les premiers chapitres de Casse-tête, Justine essaie de mieux comprendre Thomas.', 'In the first chapters of Casse-tête, Justine tries to understand Thomas better.']
  ];
  STUDY.endings = [
    ['Cette situation montre que la confiance est importante dans une amitié.', 'This situation shows that trust is important in a friendship.'],
    ['À mon avis, Justine doit respecter les sentiments de Thomas.', 'In my opinion, Justine should respect Thomas’s feelings.']
  ];

  function missedCount() { return Object.keys(progress.mistakes).filter(k => Number(progress.mistakes[k]) > 0).length; }
  function clampedSpeed() { return [0.72,0.85,1,1.12].includes(state.listenSpeed) ? state.listenSpeed : 0.85; }
  function playQuestion() {
    if (!state.autoPlayListen || !state.listenQ.length || state.listenIndex >= state.listenQ.length) return;
    speak(state.listenQ[state.listenIndex][1], clampedSpeed());
  }
  function chooseBalanced(pool, n) {
    const count = Math.min(n, pool.length);
    const a = sample(pool.filter(q => q[2] === true), Math.ceil(count / 2));
    const b = sample(pool.filter(q => q[2] === false), Math.floor(count / 2));
    let out = a.concat(b);
    const chosen = new Set(out);
    if (out.length < count) out = out.concat(sample(pool.filter(q => !chosen.has(q)), count - out.length));
    return rand(out);
  }

  window.CT = {
    toggleFocus: function() {
      focusOn = !focusOn;
      try { localStorage.setItem('ct-focus-v2', focusOn ? 'on' : 'off'); } catch(e) {}
      render();
    },
    start: function() {
      focusOn = true;
      try { localStorage.setItem('ct-focus-v2','on'); } catch(e) {}
      state.listenCh = 'all';
      navigate('listening');
      newListen(10);
    },
    setSpeed: function(v) {
      state.listenSpeed = Number(v);
      progress.listenSpeed = state.listenSpeed; save();
    },
    setAuto: function(v) {
      state.autoPlayListen = Boolean(v);
      progress.autoListen = Boolean(v); save();
    },
    retryMisses: function() {
      if (!missedCount()) return;
      state.listenCh = 'all';
      navigate('listening');
      newListen(10, true);
    },
    shortDraft: function(v) { state.shortDraft = v; },
    writeDraft: function(v) { progress.writeDrafts[state.writePrompt] = v; save(); },
    clearWriteDraft: function() { delete progress.writeDrafts[state.writePrompt]; save(); render(); },
    resetMistakes: function() {
      if (confirm('Clear your saved missed-listening questions?')) {
        progress.mistakes = {}; save(); render();
      }
    }
  };

  navigate = function(page) {
    if ('speechSynthesis' in window && window.speechSynthesis) window.speechSynthesis.cancel();
    state.page = page; render();
    if (window.scrollTo) window.scrollTo({top:0,behavior:'smooth'});
  };

  // One purpose per session: a direct start plus three learning targets.
  home = function() {
    const errs=missedCount();
    return '<div class="hero focus-hero"><div class="eyebrow">TUESDAY QUIZ • CHAPTERS 1–5</div>'+
    '<h1>Be ready.<br><span style="color:#78dfcc">Without the noise.</span></h1>'+
    '<p>A streamlined plan: understand the story, drill French audio without text clues, then write two five-sentence answers from memory. Start with the highest-value practice.</p>'+
    '<div class="row"><button class="btn" onclick="CT.start()">▶ Start 10-question Écoute sprint</button>'+
    '<button class="btn secondary" onclick="navigate(\'notes\')">Review chapter facts</button></div>'+
    '</div>'+
    '<div class="quicksteps">'+
    '<div class="lesson"><div class="eyebrow">01 · 7 MIN</div><h3>Understand the plot</h3><p>Skim five chapter summaries and the key names, locations and rumours.</p><button class="btn sm secondary" onclick="navigate(\'notes\')">Memory notes →</button></div>'+
    '<div class="lesson"><div class="eyebrow">02 · 10 MIN</div><h3>Listen without seeing</h3><p>Do ten spoken vrai/faux questions. Wrong answers enter your personal retry deck.</p><button class="btn sm secondary" onclick="CT.start()">Audio drills →</button></div>'+
    '<div class="lesson"><div class="eyebrow">03 · 10 MIN</div><h3>Write with recall</h3><p>Learn two common openings, three topic sentences, and one ending per question.</p><button class="btn sm secondary" onclick="navigate(\'writing\')">Writing trainer →</button></div></div>'+
    '<div class="card compact-summary"><div class="row" style="justify-content:space-between"><div><div class="eyebrow">YOUR ACTIVE RETRY DECK</div><h3 style="margin:4px 0">'+errs+' listening '+(errs===1?'mistake':'mistakes')+' to revisit</h3><p style="margin:4px 0">A missed fact leaves the deck after two later correct answers.</p></div>'+
    '<button class="btn secondary" onclick="CT.retryMisses()" '+(errs?'':'disabled')+'>Retry my mistakes →</button></div></div>'+
    '<details class="tool-drawer"><summary>See all study tools and the full story</summary>'+
    '<div class="cards" style="margin-top:15px">'+NAV.slice(1).map(function(x,i){return '<div class="card"><div class="eyebrow">TOOL '+(i+1)+'</div><h3>'+esc(x[2])+'</h3><button class="btn sm secondary" onclick="navigate(\''+x[0]+'\')">Open →</button></div>';}).join('')+'</div></details>'+
    '<div class="notice"><b>From your teacher’s outline:</b> Écoute is 10 vrai/faux marks. Lecture is 10 marks with comprehension questions / possible multiple choice. Écriture is an 8–10-sentence paragraph answering two chosen comprehension questions. The three practice prompts are predictions, not the teacher’s exact questions.</div>';
  };

  // Listening: preserve speed, correct balance, replay misses until mastered.
  newListen = function(n, reviewOnly) {
    n = n || 10; reviewOnly = Boolean(reviewOnly);
    let pool = STUDY.facts.filter(q => state.listenCh === 'all' || String(q[0]) === String(state.listenCh));
    if (reviewOnly) pool = pool.filter(q => progress.mistakes[String(STUDY.facts.indexOf(q))] > 0);
    if (!pool.length) {
      if(reviewOnly) alert('Your listening mistake deck is clear. Great work!');
      else alert('No statements found for this filter.');
      return;
    }
    state.listenReviewMode = reviewOnly;
    state.listenQ = chooseBalanced(pool,n);
    state.listenIndex = 0; state.listenScore = 0;
    state.listenAnswer = null; state.listenReveal = false;
    render(); playQuestion();
  };
  answerListen = function(v) {
    if (state.listenAnswer !== null) return;
    const q = state.listenQ[state.listenIndex];
    const key = String(STUDY.facts.indexOf(q));
    state.listenAnswer = v;
    if (v === q[2]) {
      state.listenScore++;
      progress.listenCorrect = (progress.listenCorrect || 0) + 1;
      if (progress.mistakes[key]) {
        progress.mistakes[key]--;
        if (progress.mistakes[key] <= 0) delete progress.mistakes[key];
      }
    } else {
      progress.mistakes[key] = 2;
    }
    progress.listen = (progress.listen || 0) + 1;
    save(); render();
  };
  nextListen = function() {
    state.listenIndex++;
    state.listenAnswer = null;
    render(); playQuestion();
  };
  const originalListening = listening;
  listening = function() {
    let h = originalListening();
    h = h.replace('<select id="speed">','<select id="speed" onchange="CT.setSpeed(this.value)">');
    h = h.replace('value=".85" selected','value=".85"');
    h = h.replace('value="'+clampedSpeed()+'"', 'value="'+clampedSpeed()+'" selected');
    h = h.replace('<button class="btn ghost" onclick="newListen(25)">Endurance: 25</button>',
      '<button class="btn ghost" onclick="newListen(25)">Endurance: 25</button>'+
      '<button class="btn secondary" '+(missedCount()?'':'disabled')+' onclick="CT.retryMisses()">↺ Retry mistakes ('+missedCount()+')</button>');
    h = h.replace('<button class="btn secondary" onclick="newListen(10)">New 10-question set</button>',
      '<label class="check"><input type="checkbox" '+(state.autoPlayListen?'checked':'')+' onchange="CT.setAuto(this.checked)"> Auto-play next</label>'+
      '<button class="btn secondary" onclick="newListen(10)">New 10-question set</button>');
    if(state.listenReviewMode) h = h.replace('<div class="quizbig',
      '<div class="notice">Mistake review: get each fact right in two later attempts to remove it from your retry deck.</div><div class="quizbig');
    if (state.listenQ.length && state.listenIndex >= state.listenQ.length) {
      h += '<div class="card" style="margin-top:15px"><div class="row" style="justify-content:space-between"><div><h3 style="margin:4px 0">Your next best move</h3><p style="margin:5px 0">'+missedCount()+' facts still need review. Target 9/10 before moving on.</p></div>'+
      (missedCount()?'<button class="btn" onclick="CT.retryMisses()">↺ Redrill errors</button>':'<button class="btn" onclick="navigate(\'writing\')">Start writing recall →</button>')+
      '</div></div>';
    }
    return h;
  };

  // Reading: retain what the student typed even after the answer is revealed.
  const originalNewRead = newRead;
  newRead = function(n) {
    state.shortDraft=''; state._readIndexSeen=-1;
    return originalNewRead(n);
  };
  const originalReading = reading;
  reading = function() {
    if (state.readMode === 'short' && state._readIndexSeen !== state.readIndex) {
      state.shortDraft=''; state._readIndexSeen=state.readIndex;
    }
    let h=originalReading();
    if (state.readMode === 'short') {
      h=h.replace(/(<textarea class="input" rows="3" placeholder="[^"]*")><\/textarea>/,
        function(_,start){return start+' oninput="CT.shortDraft(this.value)">'+esc(state.shortDraft)+'</textarea>';});
      if (state.readAnswer === 'show' || state.readAnswer === 'graded') {
        h=h.replace('<div class="answer"><b>Réponse modèle</b>',
          '<div class="answer"><b>Your own response</b><p>'+esc(state.shortDraft||'(You left this blank.)')+'</p></div>'+
          '<div class="answer"><b>Réponse modèle</b>');
      }
    }
    return h;
  };

  // Writing: hide setup controls during recall, retain drafts and score in order.
  const originalWriting = writing;
  writing = function() {
    let h=originalWriting();
    if(state.writeMode !== 'learn') {
      const start='<div class="sectionhead"><h3>Step 1. Pick a story question</h3></div>';
      const target='<div class="sectionhead"><h3>Step 3. Learn the 5-sentence answer</h3></div>';
      const i=h.indexOf(start), j=h.indexOf(target);
      if(i>=0 && j>i) {
        const setup=h.slice(i,j);
        h=h.slice(0,i)+h.slice(j)+
        '<details class="tool-drawer"><summary>Change question, universal opening or ending</summary>'+setup+'</details>';
      }
    }
    if(state.writeMode === 'full') {
      const value = progress.writeDrafts[state.writePrompt] || '';
      h = h.replace(/(<textarea id="fulltext"[^>]*placeholder="[^"]*")><\/textarea>/,
        function(_,start){return start+' oninput="CT.writeDraft(this.value)">'+esc(value)+'</textarea>';});
      h += '<button class="btn ghost sm" style="margin-top:12px" onclick="CT.clearWriteDraft()">Clear saved full-answer draft</button>';
    }
    if(state.writeMode==='guided') {
      const k=state.writePrompt+':'+state.writeLine;
      const mastered=Math.min(2,progress.writeMastery[k]||0);
      h=h.replace('<div class="eyebrow">MEMORY ROUND · SENTENCE',
        '<div class="eyebrow">Recall: '+mastered+'/2 successful tries · SENTENCE');
    }
    return h;
  };
  checkWriting = function() {
    const el=document.getElementById('writebox');
    const own=el ? el.value : '';
    const expected=writeLines()[state.writeLine][0];
    const a=normalize(own).split(' ').filter(Boolean);
    const b=normalize(expected).split(' ').filter(Boolean);
    const dp=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
    for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) {
      dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    }
    const score=Math.round(100*dp[a.length][b.length]/Math.max(a.length,b.length,1));
    const key=state.writePrompt+':'+state.writeLine;
    progress.writeMastery[key]=score>=88 ? Math.min(2,(progress.writeMastery[key]||0)+1):0;
    progress.write=(progress.write||0)+1; save();
    const level=progress.writeMastery[key];
    const html='<div class="answer"><b class="'+(score>=88?'positive':'negative')+'">'+
      (score>=88?'Solid recall':'Keep practising')+'</b> · Similarity '+score+'% · '+
      (level===2?'Mastered (2 successful recalls)':'Successful recalls: '+level+'/2')+
      '<p style="color:#fff"><b>Model:</b> '+esc(expected)+'</p>'+
      '<p class="mini">This checks word order and approximate matching, not full French grammar. Fix missing articles and accents before the real quiz.</p>'+
      '<button class="btn sm secondary" onclick="speak(writeLines()[state.writeLine][0],.8)">♫ Hear it</button></div>';
    const feedback=document.getElementById('writingfeedback');
    if(feedback) feedback.innerHTML=html;
  };

  const originalRender=render;
  render=function() {
    originalRender();
    document.body.classList.toggle('focus-on',focusOn);
    const current=NAV.find(x=>x[0]===state.page);
    const bar='<div class="focus-toolbar">'+
      '<div class="toolbar-brand"><b>CASSE-TÊTE</b><span>'+(current?esc(current[2]):'Study')+'</span></div>'+
      '<div class="row">'+
      '<select aria-label="Jump to another station" onchange="navigate(this.value)">'+
      NAV.map(x=>'<option value="'+x[0]+'" '+(x[0]===state.page?'selected':'')+'>'+esc(x[2])+'</option>').join('')+
      '</select>'+
      '<button class="btn sm ghost" aria-label="Toggle distraction-free mode" onclick="CT.toggleFocus()">'+
      (focusOn?'◧ Full menu':'◩ Focus mode')+'</button></div></div>';
    const main=document.getElementById('view');
    main.insertAdjacentHTML('afterbegin',bar);
  };
  render();
})();