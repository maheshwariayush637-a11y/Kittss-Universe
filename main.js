/* ============ Kitss Universe — main.js ============ */

/* ---------- Planet data (text preserved exactly as written) ---------- */
const PLANETS = [
  {
    id:'tour', theme:'p-tour', name:'Planet Of Tour',
    lines:[
      "Soooooooooo This planet belongs to the Trip planet...",
      "So jesa ki apne ko idea hai trip toh hogi jab hogi but but ek trip toh mujhe tera sath jaana hai.. kyuki usme aayega mazaa crazyyy...",
      "Dekh 2 jaano ki trip mai hota kya hai ki borr ho ne kai chances jyada hai but but uske liye mera pass bhot ideas hai... For example apne gye kahin uhm uhmmm koi bhi place ka name leh.. uske baad udhr jaake apne krenge side quests like jo games mai hota hai na side quests part ki jis sai aur ability ya skills milta hai... Apne wo side quests krenge ek taraki sai dare maan leh but mko toh sochke hi bhot maza aaraaaaa haiii.......",
      "Uske baad ek din night out bahar bhi hojayega",
      "Scooty dono ko aati hai chalana  wo alag baat hai ladkiyo ko scotty 🐣🐣",
      "Anyways idhr toh acha acha bolna hai mai bhul gya tha ...",
      "Haan ji toh apne aas pass bhi ghum lenge dono ka rehne ki tension nhi wo apne adjust kr lenge",
      "Awessommmeeeeee...",
      "So abhi tk is planet mai yahi hai..",
      "Baki tujhe pta hai mera meghuuuu",
      "Aur insab sai pehle tera wo dream wali place ufff itna sab krna hai...",
      "Letssss moveeee to nextttt plannettt"
    ]
  },
  {
    id:'wishlist', theme:'p-wishlist', name:'Planet of Wishlist',
    lines:[
      "So hua kya ki mai plannet bana rha tha lekin mera pass content hi nhi 🥹🥹",
      "Toh maine dhoke sai wishlist wala content daal diya huihuihui...",
      "Tanki climb krni hai apne ko phir sunset sunrise dono hi pending hai",
      "Teri photo edittt krnii hai",
      "And teri eyes pai wo fish wali painting i mean virtual mai .. real mai toh tu maar degi..",
      "Skattinggg sikhni hai",
      "Skateboarding krni hai",
      "Potteryyyyy",
      "Ufff itna sab",
      "Mera favourite wala.. crying sessionnnnnmnn",
      "uffff aur yeh dance real kyu hai huhhh chimpdi",
      "Letsss move to nextttttt plannetttttt"
    ]
  },
  {
    id:'memories', theme:'p-memories', name:'Planet of Memories',
    lines:[
      "So jesa ki idea hai memories kai naam pai M bhi pura nhi hua hai...",
      "Ghumne kai naam pai koi place hai nahi idhr but but dheere dheere mausam acha hoga tb thoda durr jaana ka bhi try krenge ..",
      "For example kesa chunni laal kai bacha hua sharabat... Kahin tu yeh gussa mai read toh nhi kr rhi 🥹🥹",
      "Phir phir sagar bhi pending hai uske lotus bloomm. And tanki and sunset toh possible hai i mean sunset winters mai jaldi hojayega tb possible hai...",
      "Aur aur jyada durr mai darbari hogya but udhr chal 2 jaane jaake kya krenge....",
      "Ya phirrrrrrrr kisi din profit hua toh dmart mai shopping wala game khelenge 🐣🐣",
      "Mtlb jisme esa hota hai ki apna ko select krna hai kitna grams ya phir andr kitne pieces for ex.. 20-30 gram.. toh jyada close hua wo jitaa and harne wala pay krega...",
      "Yr yeh toh idhr boring lag rha hai maine youtube shorts pai dekha tb toh interesting tha 🥲😞",
      "Anyways aur aur aur ek din park mai bethke painting kr sakte hai kesa ki doodling hoti hai waise kuch... Usme bhi maza hai (i Hope so)",
      "So letsss move to another planet"
    ]
  },
  {
    id:'games', theme:'p-games', name:'Planet of Games',
    lines:[
      "This planet is made because of lack of content 🐣",
      "You have to make scrumble game in which Unscramble each one to reveal the word. Tap or click a card to reveal the answer!"
    ],
    scrambleWords:["Chimpdi","Pagal","Gadhi","Bhindii","kittu","Kutti","Kamini","Chudhel"]
  },
  {
    id:'jokes', theme:'p-jokes', name:'Planet of Jokes',
    lines:[],
    jokes:[
      "Pata hai Bina haldi ka milk sehat ke liye kharab kyu hota hai? Kyu ki woh un-haldi hota hai",
      "Ram and lela are 2 friends\nAgr ram nai chai mangayi toh lella kya manageygi ?\nRam chai leela chai leela chai ram",
      "Dadi nai mujhe allu bol diya lekin mai gussa nhi hua\nKyuki potato toh unhi ka hua na",
      "Potassium and carbon neither react in sunlight or in darkness and iskiya K C teri khudgarzi na dhoop chune na chaon",
      "If i have gun in 1 hand and kindey in another then how much gun i have\n2 because mera ek hath mai gun and dusra hath me ek organ",
      "I want to wake up in early but dawn ko pakdna mushkil hi nhi namumkin hai",
      "10 mahilao ko santoor sai nehlaya and 10 mahilao ko dove sai and malum hai sab Mai kya common tha\nBathroom sai nikal .."
    ]
  }
];

const STORAGE_KEY = 'kitss-universe-v1';
const state = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return { visited:{}, collected:{}, currentIndex:0 };
}
function saveState(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
}

/* ================= Boot sequence ================= */
(function boot(){
  const fill = document.getElementById('boot-fill');
  const pct = document.getElementById('boot-percent');
  const screen = document.getElementById('boot-screen');
  let p = 0;
  const iv = setInterval(()=>{
    p += Math.random()*14 + 4;
    if(p >= 100){
      p = 100;
      clearInterval(iv);
      fill.style.width = '100%';
      pct.textContent = '100%';
      setTimeout(()=>{
        screen.classList.add('hide');
        setTimeout(()=>screen.remove(), 1200);
        launchIntro();
      }, 350);
      return;
    }
    fill.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
  }, 160);
})();

function launchIntro(){
  document.getElementById('music-toggle').classList.add('ready');
  buildScenes();
  showPlanet(state.currentIndex, {firstLoad:true});
}

/* ================= Starfield + parallax + shooting stars + constellations ================= */
const starCanvas = document.getElementById('star-canvas');
const sctx = starCanvas.getContext('2d');
let stars = [];
let shootingStars = [];
let constellations = [];
let driftX = 0, driftY = 0, driftAngle = 0;

function resizeCanvases(){
  [starCanvas, document.getElementById('fx-canvas'), document.getElementById('warp-canvas'), document.getElementById('k-canvas')].forEach(c=>{
    c.width = window.innerWidth * devicePixelRatio;
    c.height = window.innerHeight * devicePixelRatio;
  });
}
window.addEventListener('resize', resizeCanvases);
resizeCanvases();

function initStars(){
  const count = Math.min(320, Math.floor(window.innerWidth*window.innerHeight/4500));
  stars = Array.from({length:count}, ()=>({
    x: Math.random()*window.innerWidth,
    y: Math.random()*window.innerHeight,
    r: Math.random()*1.4 + 0.3,
    layer: Math.random()<0.5?1:(Math.random()<0.5?2:3),
    tw: Math.random()*Math.PI*2,
    baseAlpha: Math.random()*0.5+0.4
  }));
}
initStars();
window.addEventListener('resize', initStars);

function scheduleShootingStar(){
  const delay = 8000 + Math.random()*7000;
  setTimeout(()=>{
    const fromLeft = Math.random()<0.5;
    shootingStars.push({
      x: fromLeft ? -20 : window.innerWidth+20,
      y: Math.random()*window.innerHeight*0.5,
      vx: (fromLeft?1:-1) * (8+Math.random()*5),
      vy: 3+Math.random()*2,
      life: 0, maxLife: 60
    });
    scheduleShootingStar();
  }, delay);
}
scheduleShootingStar();

function scheduleConstellation(){
  const delay = 6000 + Math.random()*6000;
  setTimeout(()=>{
    if(stars.length > 8){
      const pick = [];
      const startIdx = Math.floor(Math.random()*stars.length);
      let idx = startIdx;
      const linkCount = 3 + Math.floor(Math.random()*3);
      for(let i=0;i<linkCount;i++){
        pick.push(idx);
        idx = (idx + 5 + Math.floor(Math.random()*40)) % stars.length;
      }
      constellations.push({ points: pick, life:0, maxLife: 260, phase:'in' });
    }
    scheduleConstellation();
  }, delay);
}
scheduleConstellation();

let t = 0;
function drawStars(){
  t += 1;
  driftAngle += 0.0006;
  driftX = Math.sin(driftAngle)*18;
  driftY = Math.cos(driftAngle*0.7)*12;

  sctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  sctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  sctx.fillStyle = '#03040c';
  sctx.fillRect(0,0,window.innerWidth,window.innerHeight);

  // stars w/ parallax drift per layer
  stars.forEach(s=>{
    const px = s.x + driftX*s.layer*0.15;
    const py = s.y + driftY*s.layer*0.15;
    const alpha = s.baseAlpha * (0.6 + 0.4*Math.sin(t*0.02 + s.tw));
    sctx.beginPath();
    sctx.arc(((px % window.innerWidth)+window.innerWidth)%window.innerWidth, ((py % window.innerHeight)+window.innerHeight)%window.innerHeight, s.r*s.layer*0.6+0.3, 0, Math.PI*2);
    sctx.fillStyle = `rgba(255,255,255,${alpha})`;
    sctx.fill();
  });

  // constellations
  constellations = constellations.filter(c=>c.life < c.maxLife);
  constellations.forEach(c=>{
    c.life++;
    const progress = c.life/c.maxLife;
    let op = 0;
    if(progress < 0.25) op = progress/0.25;
    else if(progress > 0.75) op = (1-progress)/0.25;
    else op = 1;
    sctx.strokeStyle = `rgba(154,124,224,${op*0.55})`;
    sctx.lineWidth = 1;
    sctx.beginPath();
    c.points.forEach((idx,i)=>{
      const s = stars[idx % stars.length];
      if(!s) return;
      const px = s.x + driftX*s.layer*0.15;
      const py = s.y + driftY*s.layer*0.15;
      if(i===0) sctx.moveTo(px,py); else sctx.lineTo(px,py);
      sctx.save();
      sctx.fillStyle = `rgba(200,190,255,${op*0.9})`;
      sctx.shadowBlur = 6; sctx.shadowColor='rgba(154,124,224,0.8)';
      sctx.beginPath(); sctx.arc(px,py,1.8,0,Math.PI*2); sctx.fill();
      sctx.restore();
    });
    sctx.stroke();
  });

  // shooting stars
  shootingStars = shootingStars.filter(s=>s.life < s.maxLife);
  shootingStars.forEach(s=>{
    s.x += s.vx; s.y += s.vy; s.life++;
    const alpha = 1 - s.life/s.maxLife;
    sctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    sctx.lineWidth = 2;
    sctx.beginPath();
    sctx.moveTo(s.x, s.y);
    sctx.lineTo(s.x - s.vx*4, s.y - s.vy*4);
    sctx.stroke();
  });

  requestAnimationFrame(drawStars);
}
drawStars();

/* ================= Click burst FX ================= */
const fxCanvas = document.getElementById('fx-canvas');
const fctx = fxCanvas.getContext('2d');
let bursts = [];
document.addEventListener('pointerdown', (e)=>{
  if(e.target.closest('#rocket-nav') || e.target.closest('.music-btn') || e.target.closest('.memory-orb-btn')) return;
  const n = 12;
  for(let i=0;i<n;i++){
    const ang = (Math.PI*2*i)/n + Math.random()*0.3;
    const speed = 2+Math.random()*3;
    bursts.push({
      x:e.clientX, y:e.clientY,
      vx: Math.cos(ang)*speed, vy: Math.sin(ang)*speed,
      life:0, maxLife: 40+Math.random()*20,
      hue: [40,320,190][Math.floor(Math.random()*3)]
    });
  }
});
function drawFx(){
  fctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  fctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  bursts = bursts.filter(b=>b.life < b.maxLife);
  bursts.forEach(b=>{
    b.x += b.vx; b.y += b.vy; b.vx*=0.96; b.vy*=0.96; b.life++;
    const alpha = 1 - b.life/b.maxLife;
    fctx.beginPath();
    fctx.arc(b.x,b.y,2.2*alpha+0.6,0,Math.PI*2);
    fctx.fillStyle = `hsla(${b.hue},90%,75%,${alpha})`;
    fctx.shadowBlur = 8; fctx.shadowColor = `hsla(${b.hue},90%,70%,${alpha})`;
    fctx.fill();
  });
  requestAnimationFrame(drawFx);
}
drawFx();

/* ================= Music ================= */
const audioEl = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-toggle');
musicBtn.addEventListener('click', ()=>{
  if(audioEl.paused){
    audioEl.play().catch(()=>{});
    musicBtn.classList.add('playing');
  } else {
    audioEl.pause();
    musicBtn.classList.remove('playing');
  }
});

/* ================= Build planet scenes ================= */
function buildScenes(){
  const container = document.getElementById('planet-scenes');
  PLANETS.forEach((planet, i)=>{
    const scene = document.createElement('div');
    scene.className = `planet-scene ${planet.theme}`;
    scene.dataset.index = i;

    scene.innerHTML = `
      <h2 class="planet-name">${planet.name}</h2>
      <div class="planet-orb-wrap">
        <div class="planet-glow enter"></div>
        <div class="planet-orb enter"></div>
      </div>
      <div class="text-panel" data-role="text"></div>
      <div class="planet-extra" data-role="extra"></div>
      <button class="memory-orb-btn" data-role="memory" aria-label="Collect this memory"></button>
      <span class="memory-orb-hint">Memory Orb</span>
    `;
    container.appendChild(scene);
  });
}

function typeLines(panelEl, lines, onDone){
  panelEl.innerHTML = '';
  let li = 0;
  function nextLine(){
    if(li >= lines.length){ if(onDone) onDone(); return; }
    const p = document.createElement('p');
    p.className = 'tw-line shown';
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    p.appendChild(cursor);
    panelEl.appendChild(p);
    const text = lines[li];
    let ci = 0;
    const speed = 26;
    const iv = setInterval(()=>{
      if(ci >= text.length){
        clearInterval(iv);
        li++;
        setTimeout(nextLine, 380);
        return;
      }
      const ch = text[ci] === '\n' ? document.createElement('br') : document.createTextNode(text[ci]);
      p.insertBefore(ch, cursor);
      ci++;
    }, speed);
  }
  nextLine();
}

function renderExtra(planet, extraEl){
  extraEl.innerHTML = '';
  if(planet.scrambleWords){
    buildGamesPlanet(planet, extraEl);
  } else if(planet.jokes){
    buildJokesPlanet(planet, extraEl);
  }
}

/* ---- Games planet: scramble + catch-the-star ---- */
function scrambleWord(w){
  const letters = w.split('');
  for(let i=letters.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [letters[i],letters[j]]=[letters[j],letters[i]];
  }
  const s = letters.join('');
  return s === w ? scrambleWord(w) : s;
}
function buildGamesPlanet(planet, extraEl){
  const wrap = document.createElement('div');
  wrap.className = 'game-area';
  wrap.innerHTML = `
    <div class="game-toggle-row">
      <button data-g="scramble" class="active">Unscramble</button>
      <button data-g="catch">Catch the Star</button>
    </div>
    <div data-panel="scramble" class="scramble-grid"></div>
    <div data-panel="catch" style="display:none;">
      <canvas id="catch-canvas" width="520" height="260"></canvas>
      <p class="catch-score">Score: <span id="catch-score-val">0</span></p>
    </div>
  `;
  extraEl.appendChild(wrap);

  const grid = wrap.querySelector('[data-panel="scramble"]');
  planet.scrambleWords.forEach(word=>{
    const card = document.createElement('div');
    card.className = 'scramble-card';
    card.textContent = scrambleWord(word);
    card.addEventListener('click', ()=>{
      if(card.classList.contains('revealed')) return;
      card.classList.add('revealed');
      card.textContent = word;
    });
    grid.appendChild(card);
  });

  const toggles = wrap.querySelectorAll('.game-toggle-row button');
  toggles.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      toggles.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.g;
      wrap.querySelector('[data-panel="scramble"]').style.display = target==='scramble' ? 'flex':'none';
      wrap.querySelector('[data-panel="catch"]').style.display = target==='catch' ? 'block':'none';
      if(target==='catch') startCatchGame(wrap.querySelector('#catch-canvas'), wrap.querySelector('#catch-score-val'));
    });
  });
}

let catchGameHandle = null;
function startCatchGame(canvas, scoreEl){
  if(catchGameHandle) cancelAnimationFrame(catchGameHandle);
  const ctx = canvas.getContext('2d');
  let score = 0;
  scoreEl.textContent = '0';
  let fallers = Array.from({length:5},()=>spawnFaller(canvas));
  function spawnFaller(c){
    return { x: Math.random()*(c.width-20)+10, y: -20, r: 8+Math.random()*6, v: 1+Math.random()*1.5, caught:false };
  }
  function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,.02)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    fallers.forEach(f=>{
      f.y += f.v;
      if(f.y > canvas.height+20){ Object.assign(f, spawnFaller(canvas)); }
      ctx.beginPath();
      ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
      ctx.fillStyle = '#f2c879';
      ctx.shadowBlur = 12; ctx.shadowColor = '#f2c879';
      ctx.fill();
    });
    catchGameHandle = requestAnimationFrame(loop);
  }
  canvas.onclick = (e)=>{
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width/rect.width, scaleY = canvas.height/rect.height;
    const cx = (e.clientX-rect.left)*scaleX, cy=(e.clientY-rect.top)*scaleY;
    fallers.forEach(f=>{
      const d = Math.hypot(f.x-cx, f.y-cy);
      if(d < f.r+10){
        score++; scoreEl.textContent = score;
        Object.assign(f, spawnFaller(canvas));
      }
    });
  };
  loop();
}

/* ---- Jokes planet ---- */
function buildJokesPlanet(planet, extraEl){
  const wrap = document.createElement('div');
  wrap.className = 'game-area';
  let idx = 0;
  wrap.innerHTML = `
    <div class="text-panel" data-role="joke-text"></div>
    <div class="joke-nav">
      <button data-role="joke-prev">◀ Prev</button>
      <button data-role="joke-next">Next ▶</button>
    </div>
    <p class="joke-count"><span data-role="joke-i">1</span> / ${planet.jokes.length}</p>
  `;
  extraEl.appendChild(wrap);
  const jokeText = wrap.querySelector('[data-role="joke-text"]');
  const jokeI = wrap.querySelector('[data-role="joke-i"]');
  function showJoke(){
    jokeI.textContent = idx+1;
    typeLines(jokeText, planet.jokes[idx].split('\n'));
  }
  wrap.querySelector('[data-role="joke-next"]').addEventListener('click', ()=>{
    idx = (idx+1)%planet.jokes.length; showJoke();
  });
  wrap.querySelector('[data-role="joke-prev"]').addEventListener('click', ()=>{
    idx = (idx-1+planet.jokes.length)%planet.jokes.length; showJoke();
  });
  showJoke();
}

/* ================= Show planet / transitions ================= */
function showPlanet(index, opts={}){
  const scenes = document.querySelectorAll('.planet-scene');
  scenes.forEach(s=>s.classList.remove('active'));
  const scene = scenes[index];
  if(!scene) return;
  scene.classList.add('active');

  const planet = PLANETS[index];
  const orb = scene.querySelector('.planet-orb');
  const glow = scene.querySelector('.planet-glow');
  const firstVisit = !state.visited[planet.id];

  if(firstVisit){
    orb.classList.remove('settled');
    orb.classList.add('enter');
    glow.classList.add('enter');
  } else {
    orb.classList.remove('enter');
    orb.classList.add('settled');
    glow.classList.remove('enter');
  }

  const textPanel = scene.querySelector('[data-role="text"]');
  const extraEl = scene.querySelector('[data-role="extra"]');
  typeLines(textPanel, planet.lines);
  renderExtra(planet, extraEl);

  // Memory orb state
  const memBtn = scene.querySelector('[data-role="memory"]');
  memBtn.classList.toggle('collected', !!state.collected[planet.id]);
  memBtn.onclick = ()=>{
    state.collected[planet.id] = true;
    memBtn.classList.add('collected');
    saveState();
    renderTray();
  };

  if(firstVisit){
    state.visited[planet.id] = true;
    saveState();
    setTimeout(()=>showUnlock(), 900);
  }

  state.currentIndex = index;
  saveState();
  renderTray();

  const rocketNav = document.getElementById('rocket-nav');
  rocketNav.querySelector('.rocket-caption').textContent =
    index === PLANETS.length-1 ? 'Complete Journey' : 'Next Planet';
}

function showUnlock(){
  const overlay = document.getElementById('unlock-overlay');
  overlay.classList.add('show');
  setTimeout(()=>overlay.classList.remove('show'), 2200);
}

function renderTray(){
  const tray = document.getElementById('tray-orbs');
  tray.innerHTML = '';
  PLANETS.forEach(p=>{
    const orb = document.createElement('span');
    orb.className = 'tray-orb' + (state.collected[p.id] ? ' collected':'');
    orb.title = p.name;
    tray.appendChild(orb);
  });
}

/* ================= Warp transition ================= */
const warpOverlay = document.getElementById('warp-overlay');
const warpCanvas = document.getElementById('warp-canvas');
const wctx = warpCanvas.getContext('2d');

function runWarp(onMid, onDone){
  warpOverlay.classList.add('active');
  const label = document.createElement('div');
  label.className = 'warp-label show';
  label.textContent = 'Hyperspace';
  document.body.appendChild(label);

  let frame = 0;
  const totalFrames = 70;
  const streaks = Array.from({length:140}, ()=>({
    angle: Math.random()*Math.PI*2,
    dist: Math.random()*40,
    speed: 6+Math.random()*10,
    len: 20+Math.random()*40
  }));

  let midCalled = false;
  function loop(){
    frame++;
    wctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    wctx.fillStyle = 'rgba(3,4,12,0.35)';
    wctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    streaks.forEach(s=>{
      s.dist += s.speed;
      const x1 = cx + Math.cos(s.angle)*s.dist;
      const y1 = cy + Math.sin(s.angle)*s.dist;
      const x2 = cx + Math.cos(s.angle)*(s.dist+s.len);
      const y2 = cy + Math.sin(s.angle)*(s.dist+s.len);
      wctx.strokeStyle = 'rgba(200,225,255,0.85)';
      wctx.lineWidth = 1.6;
      wctx.beginPath();
      wctx.moveTo(x1,y1); wctx.lineTo(x2,y2); wctx.stroke();
      if(s.dist > Math.max(window.innerWidth,window.innerHeight)) s.dist = 0;
    });

    if(frame === Math.floor(totalFrames*0.55) && !midCalled){
      midCalled = true;
      onMid && onMid();
    }
    if(frame >= totalFrames){
      warpOverlay.classList.remove('active');
      wctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      label.remove();
      onDone && onDone();
      return;
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* ================= Rocket navigation ================= */
const rocketNav = document.getElementById('rocket-nav');
rocketNav.addEventListener('click', ()=>{
  if(rocketNav.disabled) return;
  rocketNav.disabled = true;
  rocketNav.classList.add('flying');

  const currentScene = document.querySelector('.planet-scene.active');
  const orb = currentScene && currentScene.querySelector('.planet-orb');
  if(orb){
    orb.style.transition = 'transform 1s cubic-bezier(.4,0,1,1)';
    orb.style.transform = 'scale(9)';
    if(currentScene) currentScene.style.zIndex = 3;
  }

  setTimeout(()=>{
    runWarp(
      ()=>{
        const nextIndex = (state.currentIndex + 1);
        if(nextIndex >= PLANETS.length){
          showEnding();
        } else {
          showPlanet(nextIndex);
        }
      },
      ()=>{
        rocketNav.classList.remove('flying');
        rocketNav.disabled = false;
        if(orb){ orb.style.transform=''; orb.style.transition=''; }
      }
    );
  }, 700);
});

/* ================= Ending scene ================= */
function showEnding(){
  document.getElementById('stage').style.display = 'none';
  document.getElementById('collection-tray').style.display = 'none';
  const ending = document.getElementById('ending-scene');
  ending.classList.add('show');
  drawKShape();
}

function drawKShape(){
  const canvas = document.getElementById('k-canvas');
  const ctx = canvas.getContext('2d');
  const w = window.innerWidth, h = window.innerHeight;
  const cx = w/2, cy = h/2;
  const scale = Math.min(w,h)*0.16;
  // 5 points forming a "K" silhouette
  const points = [
    {x:-1.4, y:-1.6}, // top of vertical stroke
    {x:-1.4, y:1.6},  // bottom of vertical stroke
    {x:-1.4, y:0},    // middle joint
    {x:1.2, y:-1.7},  // upper diagonal
    {x:1.3, y:1.7}    // lower diagonal
  ];
  let frame = 0;
  function loop(){
    frame++;
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = 'rgba(154,124,224,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    [[0,2],[1,2],[2,3],[2,4]].forEach(([a,b])=>{
      ctx.moveTo(cx+points[a].x*scale, cy+points[a].y*scale);
      ctx.lineTo(cx+points[b].x*scale, cy+points[b].y*scale);
    });
    ctx.stroke();
    points.forEach((p,i)=>{
      const px = cx+p.x*scale, py = cy+p.y*scale;
      const pulse = 3+Math.sin(frame*0.03+i)*1.5;
      ctx.beginPath();
      ctx.arc(px,py,6+pulse,0,Math.PI*2);
      ctx.fillStyle = 'rgba(242,200,121,0.9)';
      ctx.shadowBlur = 20; ctx.shadowColor = '#f2c879';
      ctx.fill();
    });
    requestAnimationFrame(loop);
  }
  loop();
}

document.getElementById('restart-btn').addEventListener('click', ()=>{
  state.currentIndex = 0;
  saveState();
  document.getElementById('ending-scene').classList.remove('show');
  document.getElementById('stage').style.display = '';
  document.getElementById('collection-tray').style.display = '';
  showPlanet(0);
});
