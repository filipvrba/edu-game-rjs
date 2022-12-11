// https://www.gafferongames.com/post/fix_your_timestep/
class Clock {
  constructor() {
    this._time = Date.now();
    this._fps_time = 1_000;
    this._fix_dt = Number((1 / 60).toFixed(6))
  };

  delta_time(callback) {
    let current_time = Date.now();
    let dt = (current_time - this._time) / this._fps_time;

    if (dt > this._fix_dt) {
      let dt_count = Math.round(dt / this._fix_dt);

      for (let _ = 0; _ < dt_count; _++) {
        callback(this._fix_dt)
      }
    } else {
      callback(this._fix_dt)
    };

    this._time = current_time;
    return dt
  }
};

class Dispatcher {
  get signals() {
    return this._signals
  };

  set signals(signals) {
    this._signals = signals
  };

  constructor() {
    this._signals = null
  };

  connect(type_s, handler) {
    if (this._signals == undefined) this._signals = {};
    if (this._signals[type_s] == undefined) this._signals[type_s] = [];

    if (this._signals[type_s].indexOf(handler) == -1) {
      this._signals[type_s].push(handler)
    }
  };

  disconnect(type_s, handler) {
    let index;
    if (this._signals == undefined) return;
    let signal_arr = this._signals[type_s];
    if (signal_arr != undefined) index = signal_arr.indexOf(handler);
    if (index != -1) signal_arr.splice(index, 1)
  };

  has_signal(type_s, handler) {
    if (this._signals == undefined) return false;
    return this._signals[type_s] != undefined && this._signals[type_s].indexOf(handler) != -1
  };

  emit_signal(type_s, ...args) {
    if (this._signals == undefined) return;
    let signal_arr = this._signals[type_s];

    if (signal_arr != undefined) {
      if (type_s == "added" && typeof this.ready == "undefined") return;
      signal_arr.slice(0).forEach(sig => sig(...args))
    }
  }
};

Dispatcher.ADDED = "added";
Dispatcher.READY = "ready";
Dispatcher.UPDATE = "update";
Dispatcher.DRAW = "draw";
Dispatcher.PHYSICS_UPDATE = "physics_update";

class Vector2 {
  get x() {
    return this._x
  };

  set x(x) {
    this._x = x
  };

  get y() {
    return this._y
  };

  set y(y) {
    this._y = y
  };

  constructor(x=0, y=0) {
    this._x = x;
    this._y = y
  };

  get w() {
    return this._x
  };

  get h() {
    return this._y
  };

  get length() {
    return Math.sqrt(this._x * this._x + this._y * this._y)
  };

  lerp(vector, alpha) {
    this._x += (vector.x - this._x) * alpha;
    this._y += (vector.y - this._y) * alpha;
    return this
  };

  get normalized() {
    let v = this.clone;
    v._normalize;
    return v
  };

  multiply(vector) {
    this._x *= vector.x;
    this._y *= vector.y;
    return this
  };

  multiply_scalar(scalar) {
    this._x *= scalar;
    this._y *= scalar;
    return this
  };

  get clone() {
    return new this.constructor(this._x, this._y)
  };

  add(vector) {
    this._x += vector.x;
    this._y += vector.y;
    return this
  };

  sub(vector) {
    this._x -= vector.x;
    this._y -= vector.y;
    return this
  };

  sub_scalar(scalar) {
    this._x -= scalar;
    this._y -= scalar;
    return this
  };

  equals(vector) {
    return vector.x == this._x && vector.y == this._y
  };

  distance_to(vector) {
    return Math.sqrt(this.distance_to_squared(vector))
  };

  distance_to_squared(vector) {
    let dx = this._x - vector.x;
    let dy = this._y - vector.y;
    return dx * dx + dy * dy
  };

  dot(vector) {
    return this._x * vector.x + this._y * vector.y
  };

  // private
  get _normalize() {
    let l = this._x * this._x + this._y * this._y;

    if (l != 0) {
      l = Math.sqrt(l);
      this._x /= l;
      this._y /= l
    };

    return this
  }
};

Vector2.UP = new Vector2(0, -1);
Vector2.DOWN = new Vector2(0, 1);
Vector2.LEFT = new Vector2(-1, 0);
Vector2.RIGHT = new Vector2(1, 0);
Vector2.ZERO = new Vector2(0, 0);

class Net {
  static get_json(url, callback) {
    fetch(url).then(response => response.json()).then(data => callback(data))
  }
};

class TDRenderer {
  constructor(canvas) {
    this._canvas = canvas;
    this._clock = new Clock
  };

  set_size(width, height) {
    this._canvas.width = width;
    this._canvas.height = height
  };

  get renderer() {
    return this._canvas.getContext(TDRenderer.DIMENSION)
  };

  render(scene) {
    this.renderer.clearRect(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    );

    scene.emit_signal(Dispatcher.UPDATE, this._clock.delta_time(f_dt => (
      scene.emit_signal(Dispatcher.PHYSICS_UPDATE, f_dt)
    )));

    scene.emit_signal(Dispatcher.DRAW, this.renderer)
  }
};

TDRenderer.DIMENSION = "2d";

class SAnimation {
  get tracks() {
    return this._tracks
  };

  constructor() {
    this._tracks = []
  };

  add_track(object_attr) {
    let track = new STrack(object_attr);
    this._tracks.push(track);
    return track
  };

  get is_done() {
    let result = true;

    for (let i = 0; i < this._tracks.length; i++) {
      let track = this._tracks[i];

      if (!track.is_done) {
        result = false;
        break
      }
    };

    return result
  };

  reset() {
    this._tracks.forEach(track => track.keys.forEach(key => key.is_done = false))
  }
};

class SKey {
  get is_done() {
    return this._is_done
  };

  set is_done(is_done) {
    this._is_done = is_done
  };

  get time() {
    return this._time
  };

  get value() {
    return this._value
  };

  constructor(time, value) {
    this._time = time;
    this._value = value;
    this._is_done = false
  }
};

class SSprite {
  get position() {
    return this._position
  };

  set position(position) {
    this._position = position
  };

  get size() {
    return this._size
  };

  set size(size) {
    this._size = size
  };

  constructor(source_position, source_size) {
    this._position = source_position;
    this._size = source_size
  }
};

class STrack {
  get track() {
    return this._track
  };

  set track(track) {
    this._track = track
  };

  get keys() {
    return this._keys
  };

  constructor(track=null) {
    this._track = track;
    this._keys = []
  };

  add_insert_key(time, key) {
    if (!this._track) console.warn("There is no declared 'track' value.");
    this._keys.push(new SKey(time, key))
  };

  get is_done() {
    let result = true;

    for (let i = 0; i < this.keys.length; i++) {
      let key = this._keys[i];

      if (!key.is_done) {
        result = false;
        break
      }
    };

    return result
  };

  get key_last() {
    let result = this._keys[0];

    for (let i = 0; i < this.keys.length; i++) {
      let key = this._keys[i];
      if (key.is_done) result = key
    };

    return result
  }
};

class BasicObject extends Dispatcher {
  get id() {
    return this._id
  };

  get parent() {
    return this._parent
  };

  get children() {
    return this._children
  };

  set id(id) {
    this._id = id
  };

  set parent(parent) {
    this._parent = parent
  };

  constructor() {
    super();
    this._id = undefined;
    this._parent = null;
    this._children = []
  };

  add(object, id=undefined) {
    if (object == this) {
      console.error(`${this.constructor.name}.add: object can't be added as a child of itself.`);
      return this
    };

    if (object) {
      if (object.parent != null) object.parent.remove(object);
      object.parent = this;
      if (id != undefined) object.id = id;
      this._children.push(object);

      if (typeof object.update_global_position !== 'undefined') {
        object.update_global_position()
      };

      this.add_signals(object)
    } else {
      console.error(`${this.constructor.name}.add: object not an instance of ${this.constructor.name}`)
    };

    return this
  };

  add_signals(object) {
    // Added
    if (typeof object.ready !== 'undefined') object.ready();

    // Physics Update
    if (typeof object.physics_update !== 'undefined') {
      object.physics_update_handler = dt => object.physics_update(dt);

      this.get_scene(true).connect(
        Dispatcher.PHYSICS_UPDATE,
        object.physics_update_handler
      )
    };

    // Update
    if (typeof object.update !== 'undefined') {
      object.update_handler = dt => object.update(dt);

      this.get_scene(true).connect(
        Dispatcher.UPDATE,
        object.update_handler
      )
    };

    // Draw
    if (typeof object.draw !== 'undefined') {
      object.draw_handler = ren => object.draw(ren);
      this.get_scene(true).connect(Dispatcher.DRAW, object.draw_handler)
    }
  };

  remove(object) {
    let index = this._children.indexOf(object);

    if (index != -1) {
      object.id = undefined;
      object.parent = null;
      this._children.splice(index, 1)
    };

    return this
  };

  free() {
    if (this._children.length > 0) {
      let _children = this._children.slice();
      _children.forEach(child => child.free())
    } else if (this._parent) {
      this.free_signals();
      this._parent.remove(this)
    };

    if (this._parent) this._parent.free()
  };

  free_signals() {
    // this.signals = nil
    if (typeof this.physics_update !== 'undefined') {
      this.get_scene(true).disconnect(
        Dispatcher.PHYSICS_UPDATE,
        this.physics_update_handler
      )
    };

    if (typeof this.update !== 'undefined') {
      this.get_scene(true).disconnect(
        Dispatcher.UPDATE,
        this.update_handler
      )
    };

    if (typeof this.draw !== 'undefined') {
      this.get_scene(true).disconnect(Dispatcher.DRAW, this.draw_handler)
    }
  };

  get_scene(is_root=false) {
    let _scene = this;
    let _parent = _scene.parent;

    while (true) {
      if (is_root) {
        if (_parent == null) break
      } else {
        let super_class_name = Object.getPrototypeOf(Object.getPrototypeOf(_parent)).constructor.name;
        let is_scene_name = _parent.constructor.name == Scene.NAME_SCENE || super_class_name == Scene.NAME_SCENE;
        let is_level_name = _parent.constructor.name == "Level" || super_class_name == "Level";

        if (is_scene_name || is_level_name) {
          _scene = _parent;
          break
        }
      };

      _scene = _parent;
      _parent = _scene.parent
    };

    return _scene
  };

  find_child(id) {
    let result = null;

    for (let i in this._children) {
      let child = this._children[i];

      if (child.id == id) {
        result = child;
        break
      }
    };

    return result
  }
};

class Object2D extends BasicObject {
  get position() {
    return this._position
  };

  set position(position) {
    this._position = position
  };

  get scale() {
    return this._scale
  };

  set scale(scale) {
    this._scale = scale
  };

  set global_position(global_position) {
    this._global_position = global_position
  };

  constructor() {
    super();
    this._position = new Vector2;
    this._global_position = new Vector2;
    this._scale = 1
  };

  get global_position() {
    this.update_global_position();
    return this._global_position
  };

  // end
  update_global_position() {
    if (this.parent == null) return;

    // unsafe
    let add_vector = this.parent._global_position.clone.add(this._position);

    if (!this._global_position.equals(add_vector)) {
      this._global_position = add_vector
    }
  };

  update_world() {
    if (this.children.length > 0) {
      this.children.forEach((child) => {
        if (typeof child.update_global_position !== 'undefined') {
          child.update_global_position();
          child.update_world()
        }
      })
    } else if (typeof this.update_global_position !== 'undefined') {
      this.update_global_position()
    }
  }
};

class Scene extends Object2D {
  constructor() {
    super();
    this.id = "scene_r"
  };

  ready() {
    if (this.parent) {
      this.update_global_position()
    } else {
      this.global_position = this.position
    }
  }
};

Scene.NAME_SCENE = "Scene";

// Original: https://github.com/filipvrba/graph/blob/master/src/core/objects/animations/animationPlayer.js
class AnimationPlayer extends BasicObject {
  get scale() {
    return this._scale
  };

  set scale(scale) {
    this._scale = scale
  };

  get animation() {
    return this._animations[this._current_animation]
  };

  constructor() {
    super();
    this._animations = {};
    this._playback_active = false;
    this._current_animation = null;
    this._time = 0;
    this._scale = 1;
    this._play_callback = null
  };

  update(dt) {
    if (!this._playback_active) return;
    this._time += dt;

    if (this.animation.is_done) {
      this.animation.reset();

      this.emit_signal(
        AnimationPlayer.ANIM_FINISH,
        this._current_animation
      );

      if (this._play_callback) this._play_callback.call();
      this.stop()
    } else {
      this.animation.tracks.forEach((track) => {
        if (!track.is_done) {
          for (let i = 0; i < track.keys.length; i++) {
            let key = track.keys[i];

            if (!key.is_done) {
              this.update_key(dt, track, key);
              break
            }
          }
        }
      })
    }
  };

  update_key(dt, track, key) {
    let value = (key.value - track.key_last.value) / (key.time - track.key_last.time) * dt;
    value = value ? value : 0;
    this.apply_str(track, `+= ${value}`);

    if (this._time >= key.time) {
      key.is_done = true;
      this.apply_str(track, `= ${key.value}`);
      return
    }
  };

  apply_str(track, str_code="") {
    return eval(`this.${track.track} ${str_code.toString()}`)
  };

  add_animation(name, animation) {
    this._animations[name] = animation
  };

  play(name, callback) {
    this.stop();
    this._current_animation = name;
    this._playback_active = true;
    this._play_callback = callback
  };

  stop() {
    this._play_callback = null;
    this._current_animation = null;
    this._playback_active = false;
    this._time = 0
  }
};

AnimationPlayer.ANIM_FINISH = "apf";

class AnimationSprite extends BasicObject {
  get frame_speed() {
    return this._frame_speed
  };

  set frame_speed(frame_speed) {
    this._frame_speed = frame_speed
  };

  get current_tile() {
    return this._current_tile
  };

  constructor(sprite, frame_speed=0.25) {
    super(sprite, frame_speed=0.25);
    this._handlers = {};
    this._handlers_length = () => Object.keys(this._handlers).length;
    this._tiles = new BasicObject;
    this._sprite = sprite;
    this._current_tile = null;
    this._bitwase = 0;
    this._time = 0;
    this._frame_speed = frame_speed
  };

  ready() {
    this.add(this._tiles, "tiles")
  };

  get is_update_unlock() {
    let result = true;

    this._tiles.children.forEach((t) => {
      if (Math.pow(this._handlers_length.call() + 1, 2) & this._handlers[t.id].bit == 0) {
        result = false
      }
    });

    return result
  };

  update(dt) {
    if (!this.is_update_unlock) return;
    if (this._current_tile == null) return;
    this._time += dt;

    if (this._time >= this._frame_speed) {
      this._time = 0;
      this._current_tile.id_tile = (this._current_tile.id_tile + 1) % Object.keys(this._current_tile.sprites).length;
      this._sprite.s_sprite = this._current_tile.sprites[this._current_tile.id_tile]
    }
  };

  add_tile(tile) {
    this._handlers[tile.id] = {
      bit: Math.pow(this._handlers_length.call() + 1, 2),
      fn: () => this._bitwase |= this._handlers[tile.id].bit
    };

    tile.connect(Tile.SPRITE_READY, this._handlers[tile.id].fn);
    this._tiles.add(tile, tile.id)
  };

  play_tile(id_tile) {
    this._current_tile = this._tiles.find_child(id_tile);

    if (this._current_tile == null) {
      console.error(`Since this tile '${id_tile}', isn't on the list, it won't launch. Add it, please.`);
      return
    };

    this._current_tile.id_tile = 0;
    this._sprite.img = this._current_tile.img
  };

  free() {
    this._tiles.children.forEach(t => (
      t.disconnect(Tile.SPRITE_READY, this._handlers[t.id].fn)
    ));

    this._handlers = null;
    super.free()
  }
};

class Grid extends BasicObject {
  get scale() {
    return this._scale
  };

  set scale(scale) {
    this._scale = scale
  };

  get visible() {
    return this._visible
  };

  set visible(visible) {
    this._visible = visible
  };

  constructor(size_v) {
    super(size_v);
    this._size_v = size_v;
    this._scale = 1;
    this._visible = true
  };

  draw(r) {
    if (!this._visible) return;
    let x = this._size_v.w * this._scale;
    let y = this._size_v.h * this._scale;
    r.lineWidth = 1;
    r.strokeStyle = "black";

    // x
    for (let i = 0; i < r.canvas.width / x; i++) {
      r.beginPath();
      r.moveTo(x * i, 0);
      r.lineTo(x * i, r.canvas.height);
      r.fill();
      r.stroke()
    };

    // y
    for (let i = 0; i < r.canvas.height / y; i++) {
      r.beginPath();
      r.moveTo(0, y * i);
      r.lineTo(r.canvas.width, y * i);
      r.fill();
      r.stroke()
    }
  }
};

class KinematicBody extends Object2D {
  get visible_point() {
    return this._visible_point
  };

  set visible_point(visible_point) {
    this._visible_point = visible_point
  };

  get physics_direction() {
    return this._physics_direction
  };

  get is_move() {
    return this._is_move
  };

  get is_move_vertical() {
    return this._is_move_vertical
  };

  constructor() {
    super();
    this._previoud_position = new Vector2;
    this._physics_direction = new Vector2;
    this._is_move = false;
    this._is_move_vertical = false;
    this._visible_point = false
  };

  update(dt) {
    this._previoud_position = this.position.clone
  };

  physics_update(dt) {
    this._physics_direction = this.position.clone.sub(this._previoud_position).normalized;

    if (this._physics_direction.equals(new Vector2)) {
      this._is_move = false
    } else {
      this._is_move = true
    };

    if (this._physics_direction.equals(Vector2.UP) || this._physics_direction.equals(Vector2.DOWN)) {
      this._is_move_vertical = true
    } else if (this._physics_direction.equals(Vector2.LEFT) || this._physics_direction.equals(Vector2.RIGHT)) {
      this._is_move_vertical = false
    };

    this.update_global_position()
  };

  draw(r) {
    if (!this.visible_point) return;
    let green = "#79b415";
    let red = "#cb3950";
    let width = 20;
    r.lineWidth = 2;

    // x
    r.strokeStyle = red;
    r.beginPath();
    r.moveTo(this.global_position.x - width, this.global_position.y);
    r.lineTo(this.global_position.x + width, this.global_position.y);
    r.fill();
    r.stroke();

    // y
    r.strokeStyle = green;
    r.beginPath();
    r.moveTo(this.global_position.x, this.global_position.y - width);
    r.lineTo(this.global_position.x, this.global_position.y + width);
    r.fill();
    r.stroke()
  }
};

class Level extends Scene {
  static dimension_loop(dimension, callback) {
    let i = 0;

    for (let y = 0; y < dimension.h; y++) {
      for (let x = 0; x < dimension.w; x++) {
        let vec = new Vector2(x, y);
        callback(vec, i);
        i++
      }
    }
  }
};

class Sprite extends Object2D {
  get scale() {
    return this._scale
  };

  set scale(scale) {
    this._scale = scale
  };

  get s_sprite() {
    return this._s_sprite
  };

  set s_sprite(s_sprite) {
    this._s_sprite = s_sprite
  };

  get img() {
    return this._img
  };

  set img(img) {
    this._img = img
  };

  get centered() {
    return this._centered
  };

  set centered(centered) {
    this._centered = centered
  };

  get offset() {
    return this._offset
  };

  set offset(offset) {
    this._offset = offset
  };

  get visible_edge() {
    return this._visible_edge
  };

  set visible_edge(visible_edge) {
    this._visible_edge = visible_edge
  };

  get global_offset() {
    return this._global_offset
  };

  constructor(s_sprite) {
    super(s_sprite);
    this._scale = 1;
    this._s_sprite = s_sprite;
    this._img = null;
    this._centered = false;
    this._offset = new Vector2;
    this._global_offset = new Vector2;
    this._visible_edge = false
  };

  ready() {
    if (this._s_sprite) this.set_position()
  };

  set_position() {
    this.position = this.centered_position
  };

  get centered_position() {
    return new Vector2(-(this._s_sprite.size.w * this._scale) / 2, -(this._s_sprite.size.h * this._scale) / 2)
  };

  update(dt) {
    if (this._s_sprite) {
      let offset_global_pos = new Vector2(this._offset.x + this.global_position.x, this._offset.y + this.global_position.y);
      this._global_offset = this._centered ? this.centered_position.clone.add(offset_global_pos) : offset_global_pos
    }
  };

  draw(r) {
    if (this._img && this._s_sprite) {
      r.drawImage(
        this._img,
        this._s_sprite.position.x,
        this._s_sprite.position.y,
        this._s_sprite.size.w,
        this._s_sprite.size.h,
        this._global_offset.x,
        this._global_offset.y,
        this._s_sprite.size.w * this._scale,
        this._s_sprite.size.h * this._scale
      )
    };

    if (this._visible_edge) {
      if (this._s_sprite) {
        r.beginPath();
        r.strokeStyle = "blue";

        r.rect(
          this._global_offset.x,
          this._global_offset.y,
          this._s_sprite.size.w * this._scale,
          this._s_sprite.size.h * this._scale
        );

        r.stroke()
      }
    }
  }
};

class Tile extends BasicObject {
  get img() {
    return this._img
  };

  set img(img) {
    this._img = img
  };

  get size() {
    return this._size
  };

  set size(size) {
    this._size = size
  };

  get sprites() {
    return this._sprites
  };

  constructor(size, img=null) {
    super(size, img=null);
    this._img = img;
    this._size = size;
    this._sprites = null;
    this._is_error = false
  };

  update(dt) {
    // You need to wait until the functions are
    // synchronized because the image has a delay.
    if (this._img == null) {
      if (this._is_error == false) {
        this._is_error = true;
        console.error(`For this class '${this.constructor.name}', there is no image. (SSprite generation won't take place.)`)
      };

      return
    };

    if (this._img.width != 0 || this._img.height != 0) {
      if (this._sprites == null) {
        this._sprites = this.generate_s_sprites(this._size);
        this.emit_signal(Tile.SPRITE_READY, this._sprites)
      }
    }
  };

  get_s_sprite(id) {
    return this._sprites[id]
  };

  generate_s_sprites(size) {
    let w_img = this._img.width;
    let h_img = this._img.height;
    let dimension = new Vector2(w_img / size.w, h_img / size.h);
    let result_h = {};

    Level.dimension_loop(dimension, (vec, i) => {
      let position_vec = new Vector2(vec.x * this._size.x, vec.y * this._size.y);
      result_h[i] = new SSprite(position_vec, this._size)
    });

    return result_h
  }
};

Tile.SPRITE_READY = "gtspr";

class Canvas2DElement extends HTMLElement {
  get scene_r() {
    return this._scene_r
  };

  constructor() {
    super();

    this._resizeHandler = () => {
      return this.resize()
    };

    this._renderer = new TDRenderer(this.init_canvas("c2d"));
    this._scene_r = new Scene;
    this._scene_r.ready();
    this.resize()
  };

  init_canvas(id) {
    let template = document.createElement("template");
    template.innerHTML = `${`
      <style type='text/css'>
      canvas {
          position: fixed;
          top: 0;
          left: 0;
          outline: none;
          z-index: -1;
      }
      </style>

      <canvas id='${id}'></canvas>
    `}`;
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    return this.shadowRoot.getElementById(id)
  };

  tick() {
    this._renderer.render(this._scene_r);

    requestAnimationFrame(() => {
      return this.tick()
    })
  };

  resize() {
    let size = new Vector2(window.innerWidth, window.innerHeight);
    this._renderer.set_size(size.w, size.h);
    this._scene_r.emit_signal(Canvas2DElement.RESIZE, size);
    this._scene_r.update_world()
  };

  get win_center_position() {
    let widthHalf = this._renderer._canvas.width / 2;
    let heightHalf = this._renderer._canvas.height / 2;
    return new Vector2(widthHalf, heightHalf)
  };

  connectedCallback() {
    this.tick();
    window.addEventListener(Canvas2DElement.RESIZE, this._resizeHandler)
  };

  disconnectedCallback() {
    this._scene_r.free();

    window.removeEventListener(
      Canvas2DElement.RESIZE,
      this._resizeHandler
    )
  }
};

Canvas2DElement.RESIZE = "resize";
window.customElements.define("canvas-2d", Canvas2DElement)