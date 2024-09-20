import Scenes from "../objects/scenes";

export default class LevelAnimations extends AnimationPlayer {
  get player() {
    return this.parent.find_child("player")
  };

  constructor() {
    super()
  };

  ready() {
    let level_size = new Vector2(this.parent.level_size.x, this.parent.level_size.y);
    let tile = this.parent.level_tiles.find_child("sprite_l0_i0");
    let grotto = this.parent.level_tiles.find_child("t_grotto");
    let tile_zero = tile.global_position;
    let root_point = tile_zero.clone.sub(this.parent.global_position);
    let animation = new SAnimation;
    let t_player_x = animation.add_track("player.position.x");

    t_player_x.add_insert_key(
      0,
      root_point.x + (grotto.size.w * tile.scale)
    );

    let t_player_y = animation.add_track("player.position.y");

    t_player_y.add_insert_key(
      0,
      root_point.y + (grotto.size.h * tile.scale) * 3
    );

    this.add_animation(Scenes.IDLE_C, animation);
    animation = new SAnimation;
    t_player_x = animation.add_track("player.position.x");

    t_player_x.add_insert_key(
      0,
      root_point.x + (grotto.size.w * tile.scale)
    );

    // t_player_x.add_insert_key(1, root_point.x + (grotto.size.w * tile.scale))
    t_player_x.add_insert_key(
      1,
      root_point.x + (grotto.size.w * tile.scale) * 2.5
    );

    t_player_y = animation.add_track("player.position.y");

    t_player_y.add_insert_key(
      0,
      root_point.y + (grotto.size.h * tile.scale) * 3
    );

    this.add_animation(Scenes.MOVE_TO_L, animation);
    animation = new SAnimation;
    t_player_x = animation.add_track("player.position.x");

    t_player_x.add_insert_key(
      0,
      root_point.x + (grotto.size.w * tile.scale) * 2.5
    );

    t_player_y = animation.add_track("player.position.y");

    t_player_y.add_insert_key(
      0,
      root_point.y + (grotto.size.h * tile.scale) * 3
    );

    t_player_y.add_insert_key(
      4,
      root_point.y + (grotto.size.h * tile.scale) * 11
    );

    this.add_animation(Scenes.MOVE_D_L, animation);
    animation = new SAnimation;
    t_player_x = animation.add_track("player.position.x");

    t_player_x.add_insert_key(
      0,
      root_point.x + (grotto.size.w * tile.scale) * 2.5
    );

    t_player_x.add_insert_key(
      1,
      root_point.x + (grotto.size.w * tile.scale) * 2.5
    );

    t_player_x.add_insert_key(
      4,
      root_point.x + (grotto.size.w * tile.scale) * 9.5
    );

    t_player_y = animation.add_track("player.position.y");

    t_player_y.add_insert_key(
      0,
      root_point.y + (grotto.size.h * tile.scale) * 11
    );

    this.add_animation(Scenes.MOVE_TO_B, animation);
    animation = new SAnimation;
    t_player_x = animation.add_track("player.position.x");

    t_player_x.add_insert_key(
      0,
      root_point.x + (grotto.size.w * tile.scale) * 9.5
    );

    t_player_x.add_insert_key(
      1,
      root_point.x + (grotto.size.w * tile.scale) * 9.5
    );

    t_player_x.add_insert_key(
      8,
      root_point.x + (grotto.size.w * tile.scale) * 27
    );

    t_player_y = animation.add_track("player.position.y");

    t_player_y.add_insert_key(
      0,
      root_point.y + (grotto.size.h * tile.scale) * 11
    );

    this.add_animation(Scenes.MOVE_TO_D, animation);
    return this.play(Scenes.IDLE_C)
  }
}