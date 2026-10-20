/* ===== CHỈNH NỘI DUNG Ở ĐÂY ===== */
const CONFIG = {
  to: 'Quỳnh',
  title: 'Chúc mừng 20/10 🌷',
  lines: [
    'Chúc Quỳnh 20/10 vui vẻ nhaaa 🌷💗 Chúc Quỳnh lúc nào cũng xinh đẹp, đáng yêu, luôn vui vẻ và gặp thật nhiều điều tốt đẹp trong cuộc sống.',
    'Mong rằng hôm nay Quỳnh sẽ nhận được thật nhiều hoa, nhiều quà và thật nhiều lời chúc ngọt ngào nhé.',
    'Mà nghĩ đi nghĩ lại thì hoa có thể tặng, quà có thể mua, lời chúc thì ai cũng nói được, nhưng một người bạn vừa sẵn sàng nghe Quỳnh than thở, vừa sẵn sàng chọc Quỳnh tức điên lên như tui thì chắc hơi khó kiếm đấy :))) 🤣.',
    'Đùa thôi, mong Quỳnh luôn giữ được nụ cười trên môi, gặp được những người thật lòng thương quý Quỳnh và được yêu thương theo cách mà Quỳnh xứng đáng.',
    'À mà này, người ta thường chúc con gái 20/10 luôn xinh đẹp, còn tui thì thấy Quỳnh chẳng cần chúc cũng đủ xinh rồi, nên tui chỉ chúc Quỳnh sớm tìm được người khiến Quỳnh rung động thật lòng…',
    'Còn nếu tìm mãi chưa thấy thì cứ từ từ, biết đâu người đó đang ở ngay bên cạnh mà Quỳnh chưa nhận ra thì sao nhỉ? 🤭🤍 Chúc Quỳnh có một ngày 20/10 thật hạnh phúc nhaaa! 💐'
  ],
  sign: '— Người bạn thân 😏',
  music: 'music.mp3'
};

const $ = s => document.querySelector(s);
const garden = $('#garden');
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];
document.querySelectorAll('.to').forEach(e => e.textContent = CONFIG.to);

/* ===== VẼ HOA (SVG) ===== */
const HUES = [[345,70,82],[345,75,78],[352,80,84],[18,85,80],[28,80,80],[95,38,76],[100,35,72],[205,72,79],[48,70,84]]; // [sắc độ, bão hòa, sáng]

function rose([h, s, l]) {
  let p = '';
  for (let i = 0; i < 7; i++) {
    const r = 46 - i * 6, k = i % 2 ? 1 : -1;
    p += `<ellipse cx="${50 + k * 2}" cy="${50 - k * 1.5}" rx="${r}" ry="${r * .92}" transform="rotate(${i * 41} 50 50)"
      fill="hsl(${h} ${s}% ${l + (i % 2 ? 6 : -4) - i}%)" stroke="hsl(${h} ${s}% ${l - 24}% / .4)" stroke-width=".8"/>`;
  }
  return p + `<path d="M50 50m-4 0a4 4 0 1 1 4 4a8 8 0 1 1-8-8a12 12 0 1 1 12 12" fill="none" stroke="hsl(${h} ${s}% ${l - 30}%)" stroke-width="1.2"/>`;
}
const tulip = h => `<path d="M50 22C26 32 28 74 50 94C72 74 74 32 50 22z" fill="hsl(${h} 75% 76%)"/>
  <path d="M50 22C42 40 44 66 50 94C56 66 58 40 50 22z" fill="hsl(${h} 70% 66%)"/>`;
const stem = b => `<path d="M50 94C${50 + b} 160 ${50 - b} 230 50 300" fill="none" stroke="#5c8c55" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M${50 + b * .1} 165q24-30 42-8q-20 26-42 8z" fill="#6b9d60"/><path d="M${50 - b * .1} 200q-24-30-42-8q20 26 42 8z" fill="#5f9156"/>`;

// [số hoa, cỡ nhỏ nhất, cỡ lớn nhất, độ cao đầu hoa thấp nhất %, cao nhất %] — từ hàng xa đến hàng gần
const ROWS = [[26, 6, 8, 40, 62], [20, 8, 10.5, 31, 52], [14, 10.5, 13, 22, 42], [9, 13, 17, 12, 32]];
ROWS.forEach(([n, a, b, y1, y2], r) => {
  for (let i = 0; i < n; i++) {
    const f = document.createElement('div'), isTulip = r && Math.random() < .14;
    f.className = 'flower';
    f.style.cssText = `--s:${rnd(a, b)};--x:${(i + .5) / n * 100 + rnd(-3, 3)};--y:${rnd(y1, y2)};--z:${r + 1};` +
      `--d:${rnd(0, 1.4) + r * .25}s;--t:${rnd(2.4, 4.2)}s;--dl:${-rnd(0, 4)}s;--a:${rnd(1.4, 3)}deg`;
    f.innerHTML = `<div class="sway"><svg viewBox="0 0 100 300">${stem(rnd(-8, 8))}<g class="hd">${isTulip ? tulip(pick([205, 345])) : rose(pick(HUES))}</g></svg></div>`;
    garden.append(f);
  }
});

/* ===== HOA RUNG: rê chuột / chạm vào hoa => rung mạnh hơn lúc đung đưa ===== */
function shake(f, k = 1, force = false) {
  const now = performance.now();
  if (!force && now - (f._t || 0) < 600) return;
  f._t = now;
  const frames = [0, -13, 10, -7, 4, -2, 0].map(d => ({ transform: `rotate(${d * k}deg)` }));
  f.firstChild.animate(frames, { duration: 1000, easing: 'ease-out', composite: 'add' });
}
const flowerAt = e => document.elementFromPoint(e.clientX, e.clientY)?.closest('.flower');
garden.addEventListener('pointermove', e => { const f = flowerAt(e); if (f) shake(f); });
garden.addEventListener('pointerdown', e => { const f = flowerAt(e); if (f) shake(f, 1.8, true); });

/* ===== NHẠC ===== */
let audio, ctx, timer, on = false, useSynth = false;

function synthStart() {            // nhạc hộp tự tạo bằng WebAudio (không cần file)
  if (ctx) return ctx.resume();
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain(); master.gain.value = .55; master.connect(ctx.destination);
  const echo = ctx.createDelay(), fb = ctx.createGain();
  echo.delayTime.value = .36; fb.gain.value = .38;
  echo.connect(fb); fb.connect(echo); echo.connect(master);
  const CH = [[62,66,69],[57,61,64],[59,62,66],[54,57,61],[55,59,62],[62,66,69],[55,59,62],[57,61,64]];
  const ARP = [0, 1, 2, 1, 2, 1, 2, 1];
  const ping = (m, t, d, v) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = 440 * 2 ** ((m - 69) / 12);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .015); g.gain.exponentialRampToValueAtTime(.0008, t + d);
    o.connect(g); g.connect(master); g.connect(echo); o.start(t); o.stop(t + d + .05);
  };
  let step = 0, t = ctx.currentTime + .2;
  timer = setInterval(() => {
    while (t < ctx.currentTime + 1) {
      const c = CH[(step >> 3) % 8], k = step % 8;
      if (k === 0) ping(c[0] - 12, t, 3, .22);
      ping(c[ARP[k]], t, 1.4, .13);
      if (k % 2 === 0) ping(c[(k >> 1) % 3] + 12, t, 1.6, .09);
      t += .4; step++;
    }
  }, 250);
}
function loadAudio() {
  audio = new Audio(CONFIG.music);
  audio.loop = true; audio.volume = .7;
  audio.addEventListener('error', () => { useSynth = true; if (on) synthStart(); });
}
async function musicOn() {
  on = true; $('#mute').classList.remove('off');
  if (useSynth) return synthStart();
  try { await audio.play(); }
  catch (e) { if (e.name === 'NotAllowedError') { on = false; $('#mute').classList.add('off'); } else { useSynth = true; synthStart(); } }
}
function musicOff() { on = false; $('#mute').classList.add('off'); audio?.pause(); ctx?.suspend(); }
$('#mute').onclick = () => on ? musicOff() : musicOn();

/* ===== VÀO VƯỜN ===== */
function enter() {
  $('#gate').classList.add('gone');
  garden.classList.add('bloomed');
  musicOn();
}
$('#enter').onclick = enter;
loadAudio();
audio.play().then(() => { on = true; enter(); }).catch(() => {});   // nếu trình duyệt cho phép tự phát thì vào luôn

/* ===== THIỆP CHÚC ===== */
const card = $('#card');
function openCard() {
  $('#ct').textContent = CONFIG.title;
  const msg = $('#msg'); msg.innerHTML = '';
  [...CONFIG.lines, CONFIG.sign].forEach((text, i, all) => {
    const p = document.createElement('p');
    p.textContent = text; p.style.setProperty('--i', i);
    if (i === all.length - 1) p.className = 'sign';
    msg.append(p);
  });
  card.hidden = false;
  $('#open').classList.add('seen');
  $('#close').focus();
}
const closeCard = () => { card.hidden = true; };
$('#open').onclick = $('#again').onclick = openCard;
$('#close').onclick = closeCard;
card.onclick = e => { if (e.target === card) closeCard(); };
addEventListener('keydown', e => { if (e.key === 'Escape') closeCard(); });

$('#bloom').onclick = () => {
  garden.classList.remove('bloomed'); void garden.offsetWidth; garden.classList.add('bloomed');
};
