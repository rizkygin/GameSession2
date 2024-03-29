class Sprite {
  constructor({ position, imageSrc, frameRate = 1, frameBuffer = 4 }) {
    this.position = position;
    this.image = new Image();
    this.loaded = false;
    this.image.onload = (e) => {
      this.loaded = true;
      // console.log(frameRate);
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };
    this.frameRate = frameRate;
    this.image.src = imageSrc;
    this.currentFrame = 0;
    this.elapsedTime = 0;
    this.frameBuffer = frameBuffer;

    this.map4Timer = true;
  }
  draw() {
    if (!this.loaded) return;
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  drawAnimate(loop) {
    if (!this.loaded) return;
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      cropbox.width,
      cropbox.height
    );
    this.updateFrame(loop);
  }

  updateFrame(loop) {
    this.elapsedTime++;
    if (this.elapsedTime % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else {
        if (loop) {
          this.currentFrame = 0;
        }
      }
    }
  }

  animateBackward(loop) {
    // console.log('ha')
    if (!this.loaded) return;
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      cropbox.width,
      cropbox.height
    );
    this.updateFramBackward(loop);
  }

  updateFramBackward(loop) {
    this.elapsedTime++;
    if (this.elapsedTime % this.frameBuffer === 0) {
      if (this.currentFrame >= 0) {
        // console.log(this.currentFrame);
        this.currentFrame--;
      } else {
        if (loop) {
          this.currentFrame = this.frameRate;
        }
      }
    }
  }
  remove_animation() {
    // this.image = new Image();
    this.position.x = -1000;
  }
  removeAllElement() {
    fire.remove_animation();
    water.remove_animation();
    ice.remove_animation();
  }
  collisionStair() {
    // c.fillStyle = "rgba(0,225,0,0.2)";
    // c.fillRect(0,260,130,187)

    // c.fillStyle = "rgba(225,0,0,0.2)";
    // c.fillRect(130,320,128,130)

    // c.fillStyle = "rgba(0,0,225,0.2)";
    // c.fillRect(258,390,60,60)

    // c.fillStyle = "rgba(0,0,100,0.5)";
    // c.fillRect(0,40,130,220);
    state.climbStair = false;
    if (
      player.sides.bottom >= 260 &&
      player.position.x + player.width / 2 <= 130 &&
      player.sides.bottom <= 300
    ) {
      player.position.y = 260 - player.height;
      state.climbStair = true;
      if (!keys.jump.pressed) {
        player.velocity.y = 0;
      }
    }
    if (
      player.sides.bottom >= 330 &&
      player.position.x + player.width / 2 <= 130 + 128 &&
      player.sides.bottom <= 340
    ) {
      player.position.y = 330 - player.height;
      state.climbStair = true;
      if (!keys.jump.pressed) {
        player.velocity.y = 0;
      }
      if (player.position.x <= 0 + player.width) {
        player.position.x += 5;
      }
    }
    if (
      player.sides.bottom >= 390 &&
      player.position.x + player.width / 2 <= 130 + 128 + 80 &&
      player.sides.bottom <= 440
    ) {
      player.position.y = 390 - player.height;
      state.climbStair = true;
      if (!keys.jump.pressed) {
        player.velocity.y = 0;
      }
      if (player.position.x <= 130 + player.width) {
        player.position.x += 5;
      }
    }
  }
  healthMap2() {
    // c.fillStyle = "rgba(0,225,0,0.2)";
    // c.fillRect(160, 15, 50, 50);

    hpMap2.drawAnimate(true);

    if (
      (player.position.x >= 160 || player.position.x + player.width >= 160) &&
      (player.position.x <= 210 || player.position.x + player.width <= 210) &&
      (player.position.y <= 65 || player.sides.bottom <= 65) &&
      (player.position.y >= 15 || player.sides.bottom >= 15)
    ) {
      state.hp = 120;
      hpMap2.remove_animation();
    }
  }

  defaultElement() {
    // console.log("hai ini dedault");
    if (state.element == null) {
      // console.log('hai ini dedault')
      state.element = "fire";
      this.removeAllElement();
    }
  }
  iceMap3() {
    ice.drawAnimate(true);
    // c.fillStyle ="red";
    // c.fillRect(60,50,30,30);
    if (
      (player.position.x >= 60 || player.position.x + player.width >= 60) &&
      (player.position.x <= 90 || player.position.x + player.width <= 90) &&
      (player.position.y <= 50 || player.sides.bottom <= 50) &&
      (player.position.y >= 80 || player.sides.bottom >= 80)
    ) {
      state.element = "ice";
      this.removeAllElement();
      console.log(state.element);
    }
  }
  fireMap3() {
    fire.drawAnimate(true);
    // c.fillStyle ="red";
    // c.fillRect(210,50,30,30);
    if (
      (player.position.x >= 210 || player.position.x + player.width >= 210) &&
      (player.position.x <= 240 || player.position.x + player.width <= 240) &&
      (player.position.y <= 50 || player.sides.bottom <= 50) &&
      (player.position.y >= 80 || player.sides.bottom >= 80)
    ) {
      state.element = "fire";
      this.removeAllElement();
      console.log(state.element);
    }
  }
  waterMap3() {
    water.drawAnimate(true);
    // c.fillStyle ="red";
    // c.fillRect(360,50,30,30);
    if (
      (player.position.x >= 360 || player.position.x + player.width >= 360) &&
      (player.position.x <= 390 || player.position.x + player.width <= 390) &&
      (player.position.y <= 50 || player.sides.bottom <= 50) &&
      (player.position.y >= 80 || player.sides.bottom >= 80)
    ) {
      state.element = "water";
      this.removeAllElement();
      console.log("element warrior: " + state.element);
    }
  }
  attackListener() {
    if (this.map4Timer) {
      boss.countDownStart();
    }
    if (!state.gameOver) {
      if (state.map === 4 && state.element == null) {
        this.defaultElement();
        switch (state.bossElement) {
          case "fire":
            if (state.element == "water") {
              warior.damage = 15;
            }
            if (state.element == "ice") {
              warior.damage = 5;
            }
            break;
          case "water":
            if (state.element == "fire") {
              warior.damage = 5;
            }
            if (state.element == "ice") {
              warior.damage = 15;
            }
            break;
          case "ice":
            if (state.element == "fire") {
              warior.damage = 15;
            }
            if (state.element == "water") {
              warior.damage = 5;
            }
            break;
        }
        switch (state.element) {
          case "fire":
            if (boss.element == "water") {
              boss.damage = 15;
            } else if (boss.element == "ice") {
              boss.damage = 5;
            }
            break;
          case "water":
            if (boss.element == "fire") {
              boss.damage = 5;
            } else if (boss.element == "ice") {
              boss.damage = 15;
            }
            break;
          case "ice":
            if (boss.element == "fire") {
              boss.damage = 15;
            } else if (boss.element == "water") {
              boss.damage = 5;
            }
            break;
        }
      }
      if (state.warriorAttack) {
        boss.shaking();
      }
      if (state.bossAttack) {
        warior.shaking();
      }
    }
    if (state.hp <= 0) {
      state.gameOver = true;
    }
  }
  winStatement(win,message,x) {
    if (state.gameOver) {
      if (win === true) {
        c.fillStyle = "green";
        c.font = "20px Arial";
        c.fillText("KAMU MENANG", 440, 300);
      } else {
        c.fillStyle = "red";
        c.font = "20px Arial";
        c.fillText("KAMU KALAH", 446, 300);
      }
      //old version ditampilkan ke layar
      // c.fillStyle = "red";
      // c.font = "20px Arial";
      // c.fillText("Nomor Jawaban Benar", 412, 330);
      // c.fillStyle = "green";
      // c.font = "20px Arial";
      // c.fillText("[",436 , 360 );
      
      // state.jawabanBenar.forEach((e,i) => {
      //   const x = i*20;
      //   c.fillText(e,(446 + x) , 360 );
      // });
      // c.fillText("]",(446 + state.jawabanBenar.length * 20) , 360 );

      //new Version 
      c.font = "20px Arial";
      c.fillText(message, x, 330);
    }

    const nickname = document.getElementById("nickname");
    nickname.style.display = "block";
  }
}
const map1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/map/map1.png",
});
const map2 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/map/map2.png",
});
const map3 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/map/map3.png",
});
const map4 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/map/map4.png",
});

const hpMap2 = new Sprite({
  position: {
    x: 160,
    y: 15,
  },
  imageSrc: "./images/env/health.png",
  frameRate: 5,
  frameBuffer: 10,
});

const ice = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/env/ice.png",
  frameRate: 5,
  frameBuffer: 10,
});
const fire = new Sprite({
  position: {
    x: 150,
    y: 0,
  },
  imageSrc: "./images/env/fire.png",
  frameRate: 5,
  frameBuffer: 10,
});
const water = new Sprite({
  position: {
    x: 300,
    y: 0,
  },
  imageSrc: "./images/env/water.png",
  frameRate: 5,
  frameBuffer: 10,
});
const gameOverMap = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/map/gameover.png",
  frameRate: 11,
  frameBuffer: 4,
});
const bubbleChat = new Sprite({
  position:{
    x:100,
    y:150
  },
  imageSrc :"./images/questionspic/bubble_chat_boss1.png",
  frameRate: 5,
  frameBuffer: 5,
});
