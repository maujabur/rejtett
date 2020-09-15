let l = 25;
let dx = 0.5;
let dy = 0.8660;

// random walker
let walker;

let t = 0;
let dt = 0.000005;

let t1x,t1y;
let t2x,t2y;
let t3x,t3y;

//     ______
//    /\     \
//   /  \  c2 \
//  /    \_____\
//  \ c3 /     /
//   \  /  c1 /
//    \/_____/
//

let c1tl, c1tr, c1bl, c1br, c1c;
let c2tl, c2tr, c2bl, c2br, c2c;
let c3tl, c3tr, c3bl, c3br, c3c;

function setup() {
  createCanvas(400, 400);

  c1tl = color("#21384c");
  c1tr = color("#554f99");
  c1bl = color("#274482");
  c1br = color("#24274b");
  c1c = color("#b0b2c1");

  c2tl = color("#2c4588");
  c2tr = color("#424686");
  c2bl = color("#24848f");
  c2br = color("#186c9a");
  c2c = color("#a0ba9c");

  c3tl = color("#2c8cae");
  c3tr = color("#476968");
  c3bl = color("#1b2d49");
  c3br = color("#1b1c2f");
  c3c = color("#8dadbf");
  
  t1x = random(10000);
  t1y = random(10000);
  
  t2x = random(10000);
  t2y = random(10000);
  
  t3x = random(10000);
  t3y = random(10000);
}

function draw() {

  let line = 0;

  for (y = 0; y <= height + l * dy; y += l * dy) {
    let y_norm = map(y, 0, height, 0, 1);

    let x_init = (line % 2) * l * dx * 3;
    for (x = x_init; x <= width + l * 3; x += l * 6 * dx) {
      let x_norm = map(x, 0, width, 0, 1);

 
      let p = createVector(x, y);
      
      let d_norm1 = get_d_norm(p, t, t1x, t1y);
      let d_norm2 = get_d_norm(p, t, t2x, t2y);
      let d_norm3 = get_d_norm(p, t, t3x, t3y);
 
      t += dt;
 
      let c1 = get_color(
        c1tl, c1tr,
        c1bl, c1br,
        c1c,
        x_norm, y_norm, d_norm1
      );

      let c2 = get_color(
        c2tl, c2tr,
        c2bl, c2br,
        c2c,
        x_norm, y_norm, d_norm2
      );

      let c3 = get_color(
        c3tl, c3tr,
        c3bl, c3br,
        c3c,
        x_norm, y_norm, d_norm3
      );

      cube(x, y, c1, c2, c3);
    }
    line++;
  }

  //saveCanvas('myCanvas', 'jpg'); noLoop();
}

function get_color(ctl, ctr, cbl, cbr, cc, x_norm, y_norm, d_norm) {
  let ct = lerpColor(ctl, ctr, x_norm);
  let cb = lerpColor(cbl, cbr, x_norm);
  let c_ = lerpColor(ct, cb, y_norm);
  return lerpColor(c_, cc, d_norm);
}

function get_d_norm(p, t, tx, ty) {
  walker = createVector(
    noise(t, tx) * width, noise(t, ty) * height
  );

  strokeWeight(3);
  //point(walker.x, walker.y);

  let d = walker.sub(p).magSq();

  let d_norm = map(d, 0, 18000, 1.0, 0.0);
  d_norm = constrain(d_norm, 0.0, 1.0);

  return d_norm
}

function cube(x, y, c1, c2, c3) {
  push();
  translate(x, y);
 noStroke() ;
  fill(c1);
//  stroke(c1);
  quad(
    0, 0,
    l, 0,
    l * dx, l * dy,
    l * -dx, l * dy
  );

  fill(c2);
  //stroke(c2);
  quad(
    0, 0,
    l, 0,
    l * dx, -l * dy,
    l * -dx, -l * dy
  );

  fill(c3);
  //stroke(c3);
  quad(
    0, 0,
    l * -dx, -l * dy,
    -l, 0,
    l * -dx, l * dy
  );

  pop();
}