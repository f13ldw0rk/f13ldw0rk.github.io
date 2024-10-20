//Click on the canvas to save an image; press a key to clear the canvas.

// Forked from https://editor.p5js.org/bestesaylar/sketches/ogFdasRIc by bestesaylar
// Based on https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm by Kyle McDonald

let capture = null;
let tracker = null;
let positions = null;

function setup() {
  capture = createCapture(VIDEO);
  let w = 500;
  createCanvas(7/5 * w, w);
  capture.size(width,height);
  capture.hide();

  colorMode(HSB);
  rectMode(CENTER);
  background(0);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  background(255);
  // Flip the canvas so that we get a mirror image
  translate(width, 0);
  scale(-1.0, 1.0);
  positions = tracker.getCurrentPosition();

  if (positions.length > 0) {
    image(capture, 0, 0, width, height);

    // Eye points from clmtrackr:
    // https://www.auduno.com/clmtrackr/docs/reference.html
    
    var righteye = getPoint(27);
    var lefteye = getPoint(32);
    var dist = p5.Vector.dist(righteye,lefteye);
    var height = 0.5*(p5.Vector.dist(getPoint(24),getPoint(26)) + p5.Vector.dist(getPoint(29),getPoint(31)));
    var center = righteye.add(lefteye).mult(0.5);
    
    fill(0);
    push();
    translate(center.x,center.y);
    rotate(righteye.sub(lefteye).heading());
    rect(0,0,dist*2.5,height*4);
    pop();
    
    filter(GRAY);
    
  }
}

function getPoint(index) {
  return createVector(positions[index][0], positions[index][1]);
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("capture-" + timestamp, "png");
}

function timestampString() {
  return year() + nf(month(), 2) + nf(day(), 2) + "-" + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
}