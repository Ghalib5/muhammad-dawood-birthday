let remainingCandles = 5;
let currentMemory = 0;

const memories = [
  {
    image:"images/dawood1.jpg",
    title:"Our Precious Little Miracle 💙",
    wish:"Two years ago, Allah blessed our family with a precious little angel. Your tiny hands, innocent smile and beautiful presence have filled our lives with a happiness beyond words. Happy 2nd Birthday, Muhammad Dawood! 🎂✨"
  },
  {
    image:"images/dawood2.jpg",
    title:"A Smile That Lights Every Heart 😊",
    wish:"May your smile always remain as bright as it is today. May every step of your life be protected, every dream be beautiful, and every day bring you new reasons to laugh. You are deeply loved, little champion. 💙🎈"
  },
  {
    image:"images/dawood3.jpg",
    title:"Our Little Adventurer 🚲",
    wish:"Keep exploring, keep laughing and keep making beautiful memories! May your future be filled with wonderful adventures, success and endless joy. The world is waiting for your beautiful journey, Muhammad Dawood. 🌟💙"
  }
];

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startBirthday(){
  showScreen('cakeScreen');
  startAmbientFireworks();
}

function blowCandle(candle){
  if(candle.classList.contains('off')) return;
  candle.classList.add('off');
  remainingCandles--;
  document.getElementById('candleCount').textContent =
    remainingCandles === 1 ? "Only 1 candle is still glowing! ✨" :
    remainingCandles === 0 ? "🎉 All candles are out! Your wish is on its way! 🎉" :
    remainingCandles + " candles are still glowing ✨";

  if(remainingCandles === 0){
    setTimeout(()=>{
      showScreen('birthdayScreen');
      celebrateBig();
    },1100);
  }
}

function showGallery(){
  currentMemory=0;
  renderMemory();
  showScreen('galleryScreen');
  celebrateBig();
}

function renderMemory(){
  const m=memories[currentMemory];
  const img=document.getElementById('memoryImage');
  img.style.opacity=0;
  setTimeout(()=>{
    img.src=m.image;
    document.getElementById('memoryTitle').textContent=m.title;
    document.getElementById('memoryWish').textContent=m.wish;
    document.getElementById('memoryNumber').textContent=`MEMORY ${currentMemory+1} OF ${memories.length}`;
    img.style.opacity=1;
  },180);
}

function nextMemory(){
  if(currentMemory < memories.length-1){
    currentMemory++;
    renderMemory();
    celebrateBig();
  }else{
    showScreen('finalScreen');
    celebrateBig();
  }
}
function previousMemory(){
  if(currentMemory>0){
    currentMemory--;
    renderMemory();
    celebrateBig();
  }
}

function celebrateBig(){
  createFirework();
  confettiRain(80);
  setTimeout(createFirework,500);
  setTimeout(createFirework,1000);
}

function startAmbientFireworks(){
  createFirework();
}

function createFirework(){
  const container=document.getElementById('fireworks');
  const x=15+Math.random()*70;
  const y=15+Math.random()*60;
  const colors=['#ffd166','#ff6b9d','#7ee7ff','#a78bfa','#7dffb2','#ffffff'];
  for(let i=0;i<42;i++){
    const p=document.createElement('i');
    p.className='particle';
    const angle=(Math.PI*2*i/42)+(Math.random()*.2);
    const distance=50+Math.random()*130;
    p.style.left=x+'vw';
    p.style.top=y+'vh';
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.setProperty('--tx',Math.cos(angle)*distance+'px');
    p.style.setProperty('--ty',Math.sin(angle)*distance+'px');
    p.style.animationDelay=(Math.random()*.12)+'s';
    container.appendChild(p);
    setTimeout(()=>p.remove(),1900);
  }
}

function confettiRain(amount=50){
  const container=document.getElementById('confetti');
  const colors=['#ffd166','#ff6b9d','#7ee7ff','#a78bfa','#7dffb2','#ffffff'];
  for(let i=0;i<amount;i++){
    const c=document.createElement('i');
    c.className='confetti-piece';
    c.style.left=Math.random()*100+'vw';
    c.style.background=colors[Math.floor(Math.random()*colors.length)];
    c.style.setProperty('--drift',(Math.random()*160-80)+'px');
    c.style.animationDuration=(2.5+Math.random()*2)+'s';
    c.style.animationDelay=(Math.random()*1.2)+'s';
    container.appendChild(c);
    setTimeout(()=>c.remove(),5200);
  }
}

function restart(){
  remainingCandles=5;
  document.querySelectorAll('.candle').forEach(c=>c.classList.remove('off'));
  document.getElementById('candleCount').textContent='5 candles are still glowing ✨';
  showScreen('welcome');
}

setInterval(()=>{
  if(document.getElementById('welcome').classList.contains('active')) createFirework();
},4500);
