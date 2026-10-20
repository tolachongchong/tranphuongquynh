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
// Màu hoa [sắc độ, bão hòa, độ sáng]
const HUES = [[346,72,80],[340,68,78],[350,78,84],[20,86,80],[28,82,82],[98,38,76],[104,34,72],[208,72,80],[214,66,78],[40,70,88]];
 
// Các lớp cánh dùng chung (vẽ một lần, hoa nào cũng tái sử dụng): vòng cánh bo tròn, nhỏ dần vào tâm
const RING = [[46, 5], [39, 5], [32.5, 4], [26, 4], [20, 3], [14.5, 3]];   // [bán kính, số cánh]
const pt = (R, a) => (50 + R * Math.cos(a)).toFixed(1) + ' ' + (50 + R * Math.sin(a)).toFixed(1);
let defs = '';
for (let v = 0; v < 3; v++) RING.forEach(([R, n], i) => {
  const phi = i * .75 + v * 1.9;
  let d = '';
  for (let k = 0; k <= 64; k++) {
    const a = k / 64 * Math.PI * 2;
    d += (k ? 'L' : 'M') + pt(R * (.84 + .16 * Math.abs(Math.cos(n * (a - phi) / 2))), a);
  }
  defs += `<path id="p${v}${i}" d="${d}Z" stroke-linejoin="round"/>`;
});
let spiral = '';
for (let k = 0; k <= 70; k++) { const t = k / 70 * 5 * Math.PI; spiral += (k ? 'L' : 'M') + pt(1 + t * .62, t); }
document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${defs}
  <path id="sp" d="${spiral}"/>
  <g id="lf"><path d="M0 0C10-15 30-17 46-8C34 9 12 9 0 0Z"/><path d="M2 0C16-6 32-8 44-8" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1"/></g>
  <radialGradient id="sh" cx=".5" cy=".5" r=".55" fx=".36" fy=".3"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#3a0f26" stop-opacity=".25"/></radialGradient>
</defs></svg>`);
 
// Hoa hồng: 6 lớp cánh (ngoài sáng, trong đậm), mỗi lớp đổ bóng lên lớp dưới, thêm ánh sáng và xoắn ở tâm
function rose([h, s, l]) {
  const v = Math.floor(rnd(0, 3));
  let g = '';
  for (let i = 0; i < 6; i++) {
    g += `<use href="#p${v}${i}" transform="translate(.7 1.5)" fill="rgba(70,20,45,.28)"/>` +
      `<use href="#p${v}${i}" fill="hsl(${h} ${s + i * 2}% ${l + 7 - i * 3.6}%)" stroke="hsl(${h} ${s}% ${Math.min(96, l + 13 - i * 2)}%)" stroke-width="1"/>`;
  }
  return g + `<use href="#p${v}0" fill="url(#sh)"/><use href="#sp" transform="rotate(${rnd(0, 360)} 50 50)" fill="none" stroke="hsl(${h} ${s}% ${l - 26}%)" stroke-width="1.1" opacity=".75"/>`;
}
const tulip = h => `<path d="M50 22C28 34 26 72 50 96C74 72 72 34 50 22Z" fill="hsl(${h} 68% 68%)" stroke="hsl(${h} 70% 80%)" stroke-width="1"/>
  <path d="M50 18C37 38 38 72 50 96C62 72 63 38 50 18Z" fill="hsl(${h} 76% 82%)" stroke="hsl(${h} 80% 92%)" stroke-width="1"/>
  <path d="M50 96C42 80 36 62 38 44M50 96C58 80 64 62 62 44" fill="none" stroke="hsl(${h} 60% 62%)" stroke-width=".9" opacity=".7"/>`;
const stem = b => `<path d="M50 94C${50 + b} 160 ${50 - b} 230 50 300" fill="none" stroke="hsl(126 30% 34%)" stroke-width="3.6" stroke-linecap="round"/>
  <use href="#lf" transform="translate(${50 + b * .25} 176) rotate(-28) scale(1.3)" fill="hsl(128 34% 40%)"/>
  <use href="#lf" transform="translate(${50 - b * .25} 214) scale(-1 1) rotate(-24) scale(1.15)" fill="hsl(122 30% 36%)"/>`;
 
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
 
