
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function windowToCanvas_mouse(canvas, x, y) {
var bbox = canvas.getBoundingClientRect();
return {x: (x - bbox.left) * (canvas.width / bbox.width), y: (y - bbox.top) * (canvas.height / bbox.height)};}

var reqAnimFrame1 = window.requestAnimationFrame;
var reqAnimFrame2 = window.requestAnimationFrame;
var reqAnimFrame3 = window.requestAnimationFrame;
var CURRENTDISCNUM = 1;
var STARTPEG;
var TARGETPEG;
var STARTSELECTED;
var TARGETX;
var MOVES = 0;


var DISC1 = {x: canvas.width / 4 - 50, y: canvas.height - 10, width: 100, height: 10, rank: 6,
      peg1X: canvas.width / 4 - 50, peg2X: canvas.width / 2 - 50, peg3X: 3 * canvas.width / 4 - 60, draw: function() {context.fillStyle = 'brown'; context.beginPath(); context.rect(this.x, this.y, this.width, this.height); context.fill();}};

var DISC1 = {x: canvas.width / 4 - 50, y: canvas.height - 10, width: 100, height: 10, rank: 5,
                   peg1X: canvas.width / 4 - 50, peg2X: canvas.width / 2 - 50, peg3X: 3 * canvas.width / 4 - 50, draw: function() {context.fillStyle = '#ffa259'; context.beginPath(); context.rect(this.x, this.y, this.width, this.height); context.fill();}};
var DISC2 = {x: canvas.width / 4 - 40, y: canvas.height - 20, width: 80, height: 10, rank: 4,
                   peg1X: canvas.width / 4 - 40, peg2X: canvas.width / 2 - 40, peg3X: 3 * canvas.width / 4 - 40,draw: function() {context.fillStyle = '#fe6845'; context.beginPath(); context.rect(this.x, this.y, this.width, this.height); context.fill();}};
var DISC3 = {x: canvas.width / 4 - 30, y: canvas.height - 30, width: 60, height: 10, rank: 3,
                   peg1X: canvas.width / 4 - 30, peg2X: canvas.width / 2 - 30, peg3X: 3 * canvas.width / 4 - 30,draw: function() {context.fillStyle = '#fa4252'; context.beginPath(); context.rect(this.x, this.y, this.width, this.height); context.fill();}};
var DISC4 = {x: canvas.width / 4 - 20, y: canvas.height - 40, width: 40, height: 10, rank: 2,
                    peg1X: canvas.width / 4 - 20, peg2X: canvas.width / 2 - 20, peg3X: 3 * canvas.width / 4 - 20,draw: function() {context.fillStyle = '#91bd3a'; context.beginPath(); context.rect(this.x, this.y, this.width, this.height); context.fill();}};
var DISC5 = {x: canvas.width / 4 - 10, y: canvas.height - 50, width: 20, height: 10, rank: 1,
                    peg1X: canvas.width / 4 - 10, peg2X: canvas.width / 2 - 10, peg3X: 3 * canvas.width / 4 - 10,draw: function() {context.fillStyle = '#0c9463'; context.beginPath(); context.rect(this.x, this.y, this.width, this.height); context.fill();}};
var DISCLIST = [DISC1, DISC2, DISC3, DISC4, DISC5];
var PEG1 = [];
var PEG2 = [];
var PEG3 = [];

function baseDraw() {
   STARTSELECTED = false;
   STARTPEG = undefined;
   TARGETPEG = undefined;
   TARGETX = undefined;
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.fillStyle = 'brown';
   context.beginPath();
   context.rect(canvas.width / 4 - 5, 250, 10, 150);
   context.fill();
   context.beginPath();
   context.rect(canvas.width / 2 - 5, 250, 10, 150);
   context.fill();
   context.beginPath();
   context.rect(3 * canvas.width / 4 - 7, 250, 10, 150);
   context.fill();
   PEG1 = [];
   PEG2 = [];
   PEG3 = [];
   DISC1.x =  canvas.width / 4 - 50;
   DISC1.y = canvas.height - 10;
   DISC2.x =  canvas.width / 4 - 40;
   DISC2.y = canvas.height - 20;
   DISC3.x =  canvas.width / 4 - 30;
   DISC3.y = canvas.height - 30;
   DISC4.x =  canvas.width / 4 - 20;
   DISC4.y = canvas.height - 40;
   DISC5.x =  canvas.width / 4 - 10;
   DISC5.y = canvas.height - 50;
   for (var i = 0; i <= CURRENTDISCNUM - 1; i++) {
      PEG1.push(DISCLIST[i]);
      DISCLIST[i].draw();
   }
   MOVES = 0;
   $('#moves').text('');
   canvas.addEventListener('mousemove', highlightPeg, true);
}

function reDraw() {
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.fillStyle = 'brown';
   context.beginPath();
   context.rect(canvas.width / 4 - 5, 250, 10, 150);
   context.fill();
   context.beginPath();
   context.rect(canvas.width / 2 - 5, 250, 10, 150);
   context.fill();
   context.beginPath();
   context.rect(3 * canvas.width / 4 - 7, 250, 10, 150);
   context.fill();
   for (var i = 0; i <= CURRENTDISCNUM - 1; i++) {
      DISCLIST[i].draw();
   }
}

//User sets the number of discs and resets after selection.
function setDiskNum(discNum) {
   CURRENTDISCNUM = discNum;
   baseDraw();
}

function drawIndicator(x, peg) {
   context.save();
   context.fillStyle = 'purple';
   context.beginPath();
   context.moveTo(x - 20, 0);
   context.lineTo(x + 20, 0);
   context.lineTo(x, 20);
   context.fill();
   context.restore();
   if (!STARTSELECTED) {
      STARTPEG = peg;
      canvas.addEventListener('mousedown', selectStartPeg, true);
   }
   else {
      canvas.removeEventListener('mousedown', selectStartPeg, true);
      canvas.addEventListener('mousedown', selectTargetPeg, true);
   }
}

function drawPegSelection(x) {
   context.save();
   context.fillStyle = 'green';
   context.beginPath();
   context.moveTo(x - 20, 100);
   context.lineTo(x + 20, 100);
   context.lineTo(x, 120);
   context.fill();
   context.restore();
}

function selectStartPeg(evt) {
   evt.preventDefault();
   if (!STARTSELECTED && STARTPEG === PEG1 && PEG1.length !== 0) {
      drawPegSelection(canvas.width / 4);
      STARTSELECTED = true;
   }
   else if (!STARTSELECTED && STARTPEG === PEG2 && PEG2.length !== 0) {
      drawPegSelection(canvas.width / 2);
      STARTSELECTED = true;
   }
   else if (!STARTSELECTED && STARTPEG === PEG3 && PEG3.length !== 0) {
      drawPegSelection(3 * canvas.width / 4);
      STARTSELECTED = true;
   }
   canvas.removeEventListener('mousedown', selectStartPeg, true);
}

function selectTargetPeg(evt) {
   if (!STARTSELECTED) return;
   var loc = windowToCanvas_mouse(canvas, evt.clientX, evt.clientY);
   if (loc.x <= canvas.width / 4 + 30 && loc.x >= canvas.width / 4 - 30 && loc.y > 250 && loc.y < 380) {
         TARGETPEG = PEG1;
         context.clearRect(0, 95, canvas.width, 30);
         STARTSELECTED = false;
   }
   else if (loc.x <= canvas.width / 2 + 30 && loc.x >= canvas.width / 2 - 30 && loc.y > 250 && loc.y < 380) {
         TARGETPEG = PEG2;
         context.clearRect(0, 95, canvas.width, 30);
         STARTSELECTED = false;
   }
   else if (loc.x <= 3 * canvas.width / 4 + 30 && loc.x >= 3 * canvas.width / 4 - 30 && loc.y > 250 && loc.y < 380) {
         TARGETPEG = PEG3;
         context.clearRect(0, 95, canvas.width, 30);
         STARTSELECTED = false;
   }
   canvas.removeEventListener('mousedown', selectTargetPeg, true);
   if (TARGETPEG.length === 0 || STARTPEG[STARTPEG.length - 1].rank < TARGETPEG[TARGETPEG.length - 1].rank) {
      if (TARGETPEG === PEG1) TARGETX = STARTPEG[STARTPEG.length - 1].peg1X;
      else if (TARGETPEG === PEG2) TARGETX = STARTPEG[STARTPEG.length - 1].peg2X;
      else if (TARGETPEG === PEG3) TARGETX = STARTPEG[STARTPEG.length - 1].peg3X;
      canvas.removeEventListener('mousemove', highlightPeg, true);
      animateMove();
   }
}

function animateMove() {
   if (STARTPEG[STARTPEG.length - 1].y > 200) {
      drawVertMove();
      reqAnimFrame1(animateMove);}
   else if (STARTPEG[STARTPEG.length - 1].x > TARGETX + 2 || STARTPEG[STARTPEG.length - 1].x < TARGETX - 2) {
      var sign = -1 * (STARTPEG[STARTPEG.length - 1].x - TARGETX) / Math.abs(STARTPEG[STARTPEG.length - 1].x - TARGETX);
      drawHorMove(sign);
      reqAnimFrame2(animateMove);}
   else {
      TARGETPEG.push(STARTPEG.pop());
      animateDown();}
}

function animateDown() {
   if (TARGETPEG[TARGETPEG.length - 1].y < canvas.height - ((TARGETPEG.length) * 10) - 1) {
      drawDownMove();
      reqAnimFrame3(animateDown);}
   else {
      STARTSELECTED = false;
      canvas.addEventListener('mousemove', highlightPeg, true);
      MOVES += 1;
      $('#moves').text(String(MOVES));}
}

function drawDownMove() {
   TARGETPEG[TARGETPEG.length - 1].y += 4;
   reDraw();
}

function drawHorMove(g) {
   STARTPEG[STARTPEG.length - 1].x += g * 4;
   reDraw();
}

function drawVertMove() {
   STARTPEG[STARTPEG.length - 1].y -= 4;
   reDraw();
}

function highlightPeg(evt) {
   var loc = windowToCanvas_mouse(canvas, evt.clientX, evt.clientY);
   context.clearRect(0, 0, canvas.width, 50);
   if (loc.x <= canvas.width / 4 + 30 && loc.x >= canvas.width / 4 - 30 && loc.y > 250 && loc.y < 380) 
      drawIndicator(canvas.width / 4, PEG1);
   else if (loc.x <= canvas.width / 2 + 30 && loc.x >= canvas.width / 2 - 30 && loc.y > 250 && loc.y < 380) 
      drawIndicator(canvas.width / 2, PEG2);
   else if (loc.x <= 3 * canvas.width / 4 + 30 && loc.x >= 3 * canvas.width / 4 - 30 && loc.y > 250 && loc.y < 380)
      drawIndicator(3 * canvas.width / 4, PEG3);
   else canvas.removeEventListener('mousedown', selectStartPeg, true);
}

baseDraw();