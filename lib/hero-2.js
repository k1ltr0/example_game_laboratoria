const speaker = (state) => {

  const getVoices = (cb) => {
    let voices = window.speechSynthesis.getVoices();
    if (!voices || !voices.length) {
      return setTimeout(getVoices.bind(null, cb));
    }
    cb(voices);
  };

  return {
    getVoices,
    name: (str) => (str) ? state.name = str : state.name,
    voice: (str) => (str) ? state.voice = str : state.voice,
    say: () => {
      const msg = new SpeechSynthesisUtterance();
      getVoices(voices => {
        msg.text = 'Hola! Soy ' + state.name;
        msg.voice = voices.find(item => item.name === state.voice);
        speechSynthesis.speak(msg);
      });
    }
  };
};


const mover = (state) => {
  const collide = (dirx, diry) => {
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    const left = state.x - state.width / 2;
    const right = state.x + state.width / 2 - 1;
    const top = state.y - state.height / 2;
    const bottom = state.y + state.height / 2 - 1;

    // check for collisions on sprite sides
    const tileDefinition = state.map.collide(left, top) ||
      state.map.collide(right, top) ||
      state.map.collide(right, bottom) ||
      state.map.collide(left, bottom);

    if (!tileDefinition) {
      return;
    }

    if (typeof tileDefinition.action === 'function') {
      tileDefinition.action(state.map);
    }

    if (!tileDefinition.solid) {
      return;
    }

    if (diry > 0) {
      state.y = -state.height / 2 + state.map.getY(state.map.getRow(bottom));
    }
    else if (diry < 0) {
      state.y = state.height / 2 + state.map.getY(state.map.getRow(top) + 1);
    }
    else if (dirx > 0) {
      state.x = -state.width / 2 + state.map.getX(state.map.getCol(right));
    }
    else if (dirx < 0) {
      state.x = state.width / 2 + state.map.getX(state.map.getCol(left) + 1);
    }
  };

  return {
    move: (delta, dirx, diry) => {
      // move hero
      state.x += dirx * state.speed * delta;
      state.y += diry * state.speed * delta;

      // check if we walked into a non-walkable tile
      collide(dirx, diry);

      // clamp values
      const maxX = state.map.cols * state.map.tsize;
      const maxY = state.map.rows * state.map.tsize;
      state.x = Math.max(0, Math.min(state.x, maxX));
      state.y = Math.max(0, Math.min(state.y, maxY));
    }
  };
};


const hero = (map, x, y) => {
  const state = {
    map,
    x,
    y,
    width: map.tsize,
    height: map.tsize,
    name: 'un personaje',
    voice: 'Diego',
    speed: 256
  };

  return Object.assign({}, speaker(state), mover(state), {
    width: () => state.width,
    height: () => state.height,
    x: () => state.x,
    y: () => state.y,
    image: Loader.getImage('hero'),
  });
};


hero.image = 'assets/bot.png';
