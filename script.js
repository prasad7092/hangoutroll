const cafes = [
  { name: "Era Cafe & Restro", address: "Malhar Towers, Tarabai Park, Kolhapur", phone: "9637700877" },
  { name: "Akkis Bistro", address: "D‑Mart Road, Tarabai Park, Kolhapur", phone: "9619147576" },
  { name: "AV's Cafe", address: "Main Road, Tarabai Park, Kolhapur", phone: "9527726123" },
  { name: "Adis Cafe", address: "Near D-Mart, Tarabai Park, Kolhapur", phone: "9923766552" },
  { name: "Krishna Cafe", address: "Tarabai Park Main Rd, Kolhapur", phone: "9028567712" },
  { name: "Magic Tea & Coffee", address: "Opp SBI Bank, Tarabai Park, Kolhapur", phone: "7030971500" },
  { name: "Cafe Relish", address: "Near Ganesh Temple, Tarabai Park, Kolhapur", phone: "9764412388" },
  { name: "Caffa Coffood House", address: "Thorat Marg, Tarabai Park, Kolhapur", phone: "8408086868" },
  { name: "Rustic Roast", address: "Jupiter Complex, Kolhapur", phone: "9898765432" },
  { name: "Cafe Nish", address: "Sardar Colony, Tarabai Park, Kolhapur", phone: "9132927927" },
  { name: "Cafe Time", address: "Ruikar Colony, Kolhapur", phone: "7588773321" },
  { name: "Pappe Da Tashan", address: "Thorat Marg, Tarabai Park, Kolhapur", phone: "02312660887" },
  { name: "Rolls Mania", address: "Krystal Plaza, Kolhapur", phone: "8446020652" },
  { name: "The Yellow Chilli", address: "Skylark Plaza, Tarabai Park, Kolhapur", phone: "02312534444" },
  { name: "Hong Kong Restaurant", address: "Skylark Plaza, Kolhapur", phone: "02312650444" },
  { name: "Hotel Tandoor", address: "Crystal Plaza, Kolhapur", phone: "02312650444" },
  { name: "New Durga Cafe", address: "Tarabai Park, Kolhapur", phone: "9657743983" },
  { name: "Krushna Fast Food", address: "Tarabai Park, Kolhapur", phone: "9856987761" },
  { name: "Chinese Factory", address: "Crusher Chowk, Kolhapur", phone: "9323487765" },
  { name: "Cafe Mexico", address: "Tarabai Park Main Road, Kolhapur", phone: "9372156788" },
  { name: "Cream Stone", address: "Near Tandoor Hotel, Kolhapur", phone: "9087152365" },
  { name: "Cafe Vivo", address: "Tarabai Park, Kolhapur", phone: "9112845567" },
  { name: "Food Saga", address: "Tarabai Park, Kolhapur", phone: "9765412345" },
  { name: "Diet Club Cafe", address: "Tarabai Park, Kolhapur", phone: "7030211122" },
  { name: "Moonlight Cafe", address: "Tarabai Park, Kolhapur", phone: "9527744477" }
];

function pullLever() {
  const reel = document.getElementById("reel");
  const result = document.getElementById("result");
  reel.textContent = "Spinning...";
  result.textContent = "";
  const leverBtn = document.querySelector(".lever-button");
  leverBtn.classList.add("lever-anim");

  let count = 0;
  const spinInterval = setInterval(() => {
    const randomCafe = cafes[Math.floor(Math.random() * cafes.length)];
    reel.textContent = randomCafe.name;
    count++;

    if (count >= 20) {
      clearInterval(spinInterval);
      const finalCafe = cafes[Math.floor(Math.random() * cafes.length)];
      reel.textContent = finalCafe.name;
      result.textContent = `Your hangout spot: ${finalCafe.name}`;
      showPopup(finalCafe);
      leverBtn.classList.remove("lever-anim");
    }
  }, 100);
}

function showPopup(cafe) {
  document.getElementById("cafe-name").textContent = cafe.name;
  document.getElementById("cafe-address").textContent = `📍 ${cafe.address}`;
  document.getElementById("cafe-phone").textContent = `📞 ${cafe.phone}`;
  document.getElementById("popup").classList.remove("hidden");
  startCelebration();
}

function replayGame() {
  document.getElementById("popup").classList.add("hidden");
  document.getElementById("reel").textContent = "---";
  document.getElementById("result").textContent = "";
}

function startCelebration() {
  const c = document.getElementById("confetti-canvas"), ctx = c.getContext("2d"),
    arr = [], cnt = 150;
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  c.classList.remove("hidden");
  for (let i = 0; i < cnt; i++) {
    arr.push({ x: Math.random() * c.width, y: Math.random() * -c.height, r: Math.random() * 6 + 4, d: Math.random() * cnt, color: `hsl(${Math.random() * 360},100%,50%)`, tilt: Math.random() * 10 - 10, tiltAngle: 0 });
  }
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    arr.forEach(o => {
      ctx.beginPath(); ctx.lineWidth = o.r / 2; ctx.strokeStyle = o.color;
      ctx.moveTo(o.x + o.tilt + o.r / 2, o.y);
      ctx.lineTo(o.x + o.tilt, o.y + o.tilt + o.r / 2);
      ctx.stroke();
    });
    update();
  }
  function update() {
    arr.forEach((o, i) => {
      o.tiltAngle += 0.1; o.y += (Math.cos(o.d) + 1 + o.r / 2) / 2;
      o.x += Math.sin(o.d); o.tilt = Math.sin(o.tiltAngle) * 10;
      if (o.y > c.height) arr[i] = { ...o, x: Math.random() * c.width, y: -20, tilt: Math.random() * 10 - 10 };
    });
  }
  const anim = setInterval(draw, 20);
  setTimeout(() => { clearInterval(anim); c.classList.add("hidden"); }, 5000);
}
