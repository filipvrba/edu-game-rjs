# Project development
A project that resembled a web application had to be set up.
I was considering a straightforward program that consists solely of a web page and allows users to complete tasks.
He wants to set the bar a little higher because there are already hundreds of such sites, and I agree with him.
Because of this, I decided to make a game in which the player uses a ruby script to go past barriers.

### Content
- [1 Creating a project](#1-creating-a-project)
- [2 Architecture](#2-architecture)
  - [2.1 Functions](#21-functions)
  - [2.2 Signals](#22-signals)
- [3 Processes](#3-processes)
- [4 Sprites](#4-sprites)
  - [4.1 Tile](#41-tile)
  - [4.2 Static sprites](#42-static-sprites)
- [5 Character](#5-character)
  - [5.1 Separate object](#51-separate-object)
- [6 Animation](#6-animation)
  - [6.1 AnimationPlayer](#61-animationplayer)
  - [6.2 AnimationSprite](#62-animationsprite)
- [7 UI](#7-ui)
  - [7.1 HTML Styles](#71-html-styles)
- [8 Scenario](#8-scenario)
  - [8.1 The script description](#81-the-script-description)
- [9 Translation](#9-translation)
- [10 Mruby](#10-mruby)
  - [10.1 API](#101-api)
    - [10.1.1 URL](#1011-url)
    - [10.1.2 Processing](#1012-processing)
- [11 Signpost](#11-signpost)
  - [11.1 Repositories](#111-repositories)
    - [11.1.1 Projects](#1111-projects)
    - [11.1.2 Tool](#1112-tool)

## 1 Creating a project
The foundation of the project was through **[RubyJS-Vite](https://github.com/filipvrba/ruby-js)**. This tool
allows you to write *Ruby* syntax with *JS API* and transform it to *JS*.
Everything is quick to deploy and there is no need to manually compile anything or restart the server.

When establishing the [Edu Game](https://github.com/filipvrba/edu-game-rjs) project, I needed to find a simple one
rendering engine. I didn't like any of them, so I wrote my own.
That's why I created a second project called [Engine2D](https://github.com/filipvrba/engine2d-rjs).

So I wrote two projects in parallel.
I spent the most of the first week creating an engine, which required me to create an architecture that made me think of both *Godot* and *Unity*. 

## 2 Architecture
It is designed such that each element fits into a specific context.
The scene for other items is therefore called "*root*".
Added objects automatically receive handler assignments that are called automatically during the game loop. 

### 2.1 Functions
An object's handler is a function that receives calls from other objects. 

*The main functions are:*
- **ready** *(When the specified object is introduced into the scene, this function is activated.)*
- **update** *(It gets delta time for animations and is a rendering process function.)*
- **physics_update** *(It is a physical process function that is called before the fundamental update function and is given a fixed delta time.)*
- **draw** *(Where it gets the value for the canvas depends on the rendering process.
With this, graphics can be rendered.)*

### 2.2 Signals
In this design, *signals* are employed to link the entire ecology of scripting code.

> ### The world's theory 
> They can be pictured as a transmitter delivering a *signal* to a particular device.
> The trouble with the gadget is that it needs to be wired to the transmitter.
> No action will be taken by the device if it is not.

In actuality, it functions such that the object can broadcast a *signal* and that the function handler is launched if any other object is connected to the object.

*I'll use the following code as an illustration right here:*
```ruby
class BasicObject < Dispatcher
  def add_signals()
    # ...
    get_scene(true).connect(Dispatcher::UPDATE, object.update_handler)
    # ...
  end
end

class TDRenderer
  def render scene
    # ...
    scene.emit_signal(Dispatcher::UPDATE, @clock.delta_time() )
    # ...
  end
end
```

## 3 Processes
Although the engine is mostly dependent on the rendering process,
we also identify a *physical process* where we obtain a *fixed delta time*.
it is helpful for calculating collisions. Unfortunately, I left out
collision detection from the *engine*, thus there are no physics in the game.
This *physical method* was mostly employed by me to recognize character movement.
It immediately understands the direction of movement if it moves in character. 

```ruby
def update dt
  @previoud_position = self.position.clone
end

def physics_update dt
  @physics_direction = self.position.clone.sub(@previoud_position).normalized
end
```

> ### Info
> To be precise, the *update function* is initiated later than the *physical update*.
> Therefore, using this method, we can determine the character's normalized direction. 

## 4 Sprites
I can render the *texture* since the rendering mechanism is programmed to do so.
It should be stressed here that this project renders *pixel textures*.
Smaller overall texture allows for more pixel-based images. 

![tileset_2](/public/png/tileset_2.png)

### 4.1 Tile
Recalculating the *texture* is done automatically.
This is because tile *sprite position* data was created in a structure.
The ability to create custom levels depends on each sprite having its own ID.
In addition, some sprites must be able to be animated using other *sprites*.

![sprite_test_01](/public/gif/sprite_test_01.gif)

### 4.2 Static sprites
They are perfect for level development for *static sprites*.
After creating a level in the [Tiled editor](https://www.mapeditor.org/) and exporting it to *json* format,
the project's sprite placements can be identified.
This will automatically create it level. 

![tiled_create_level_01](/public/gif/tiled_create_level_01.gif)

## 5 Character
The character, which I needed to draw and animate, appeared after the level.
I didn't require a keyboard for character control because
I intended to make the game interactive with just mouse clicks.
The player can respond in accordance with the scenario by clicking the mouse.
Therefore, defining player *position* using *AnimationPlayer*
and moving sprites with *AnimationSprite* was sufficient. 

### 5.1 Separate object
A separate item is what the character tries to be.
I figured if we moved the character, the *AnimationSprite* would run automatically. 

![move_test_01](/public/gif/move_test_01.gif)

## 6 Animation
Two items that form the foundation of the rendering *engine* are categorised as *animation*.

*They are these objects:*
1. [AnimationPlayer](#61-animationplayer)
2. [AnimationSprite](#62-animationsprite)

### 6.1 AnimationPlayer
By building an *animation structure*, *AnimationPlayer* functions.
Enter the object key, the desired value for the object key, and the time.
This *structure animation* is added to the list for *AnimationPlayer*,
and it is then started by using the animation's name. 

```ruby
animation = SAnimation.new
t_player_x = animation.add_track('player.position.x')
t_player_x.add_insert_key(0, root_point.x + (grotto.size.w * tile.scale))

t_player_y = animation.add_track('player.position.y')
t_player_y.add_insert_key(0, root_point.y + (grotto.size.h * tile.scale) * 3)

self.add_animation('Idle', animation)
self.play('Idle')
```

We'll have an *animation* that starts the character's '*idle*' and moves it to a certain point.
Simply add another *insert_key* with the duration of the *animation* and the *position* it should move to if we want to generate a *position* movement. 

### 6.2 AnimationSprite
The list of required *Tiles (sprites)* is predetermined and added to *AnimationSprite*.
The *animation* associated with its name can only begin after addition. 

```ruby
@t_player_idle = TPlayerIdle.new
self.parent.add @t_player_idle, "t_player_idle"

@animation_sprite = AnimationSprite.new self.parent.sprite
self.parent.add @animation_sprite, "animation_sprite"
@animation_sprite.add_tile @t_player_idle

@animation_sprite.play_tile @t_player_idle.id
```

> ### Info
> A renderer object for *AnimationSprite* is required, and it must derive from *Sprite*.

## 7 UI
This leads us to the stage when the *UI* must be developed.
The character in the scenario will converse with us,
so a panel with the character text must be created.

### 7.1 HTML Styles
I'll only use *HTML* and *CSS* to build the user interface,
and I'll use a higher *z-index* than what is utilized for the rendering *canvas*.
This will ensure that the user interface is constantly visible.
The task entry will then be presented in *UI Task*.
An object containing functions for activating and rendering text
is constructed in order for everything to function. 

![ui_preview_01](/public/png/ui_preview_01.png)

## 8 Scenario
It is necessary to write a script in order to progress this instructive game.
I used a *Ruby* script to write the script, then I called
the functions to activate the supplied objects. 

*Listed below is a sample script:*
```ruby
# ...
add_scene(IDLE_C, nil, lambda do
  ui.active_click = false
  anims.play(MOVE_TO_L) do
    next_scene(MOVE_TO_L, -1)
    ui.active_click = true
  end
end)
# ...
add_scene MOVE_TO_L, language.get_translate_scene(MOVE_TO_L, 0)
# ...
add_scene(MOVE_TO_L, nil, lambda do
  ui.ui_board.visible(true)
  ui.ui_board.board_task.start(STaskA.new(language)) do  # Task 1
    ui.ui_board.visible(false)
    next_scene(MOVE_D_L, -1)
  end
end)
# ...
```

The script clearly shows that scenes are added to the object.
The object calls the required attributes and captures the scene's structure.
If a message is allocated, it will be rendered, and if
a *handler* is allocated, the supplied function will be started. 

### 8.1 The script description 
The *handler* is triggered at the conclusion of the "*Idle*" scenario,
which stops mouse clicks and initiates a character *animation*.
When the *animation* is complete, it switches to the following
scenario, "*Move to ladder*", and activates the mouse once more.
As a result, the scenario for "*Move to ladder*" begins,
and the character receives a message. 

Once the character is agreed upon, he renders a *Task*
containing the requested *task*. The visibility *Task* will be
canceled and a new scenario will be selected if *TaskA* has been completed. 

![scene_preview_01](/public/gif/scene_preview_01.gif)

## 9 Translation
*Czech* is my native tongue, so I want to stick with it for the duration of the project.
I developed a function that can toggle text localization as a result.

![languague_preview_01](/public/png/languague_preview_01.png)

The *Czech* text has to be translated into *English* and saved as a *json* file.
The translated texts were then converted into site code by
an object that was developed and can read them.
The browser is used to define the site code.
Thus, if the browser's language preference is set to *Czech*,
the *Czech* text will be shown. 

> ### Info
> There is no more translated content, thus I decided to leave the
> *English* translation in place for all nations. 

## 10 Mruby
It was important to resolve the evaluation process of the
script that the player had entered into *Task* in order
for the project to function as a whole.
The project is based on **[RubyJS-Vite](https://github.com/filipvrba/ruby-js)** specifically,
therefore all scripting code is converted into *JS* scripts.
My *Ruby* script cannot be evaluated natively by the local *Vite* server.
I was compelled to use *Mruby* to assess *Ruby* scripts using
the *REST API* on my behalf. 

### 10.1 API
*Ruby* script is executed as a result of the *URL* link being
entered because communication occurs over *HTTP*.
The implementation was done in a way that allowed the
player's script to be put into the predefined *Ruby* script.
*(For this, the **code_evaluation** approach was employed.)*

```ruby
def code_evaluation code
  input = STaskA.generate_input Helper.random_int(5, 10)

  """
    #{code}
    def vector_correction_result(str_nums)
      return str_nums.split(" ").minmax.join(" ")
    end

    code = vector_correction('#{input}')
    code_result = vector_correction_result('#{input}')
    \"\#{code}<<|>>\#{code_result}\"
  """.trim()
end
```

### 10.1.1 URL
The creation of a *URL* link was the next step.
Url takes the *API* address, issues a *token*, and provides
the *Ruby* script with an encoded *string*. 

*We get something like this:*
```txt
https://mrbapi.fly.dev/?token=kfj1T7dh3ena17yG0xGoeH7Y1983wybJpcBNP6j1&mrb=def%20vector_correction(str_nums)%0A%20%20%0Aend%0Adef%20vector_correction_result(str_nums)%0A%20%20return%20str_nums.split(%22%20%22).minmax.join(%22%20%22)%0Aend%0A%0Acode%20%3D%20vector_correction(%27-10%20-6%20-10%20-2%208%20-1%27)%0Acode_result%20%3D%20vector_correction_result(%27-10%20-6%20-10%20-2%208%20-1%27)%0A%22%23%7Bcode%7D%3C%3C%7C%3E%3E%23%7Bcode_result%7D%22
```

If we submit this *URL* link into the search engine, we will obtain a response in *json* format.

*The Ruby script's output is the following string:*
```ruby
"<<|>>-1 8"
```

### 10.1.2 Processing

Using the special symbol "**<<|>>**," this result *string* is further
processed in the project and divided into an *array*.
As a result, the player receives a *resolt* and can
evaluate the result using a *expected result*.
The player has successfully performed the supplied *Task*
if the outcome of the *Ruby* script is same. 

![mrb_result_01](/public/png/mrb_result_01.png)

## 11 Signpost
I'll direct you to the following article if you're curious about the creation of an *API* for *Mruby*.

- ![API development]()

I'll send you back to the overview with this link if you want to.

- ![A brief overview of Edu Game]()

### 11.1 Repositories
All project and tool repositories may be found here. 

### 11.1.1 Projects
Here are the repositories, all of which are available under the *MIT* license, if you're interested in seeing the projects' source codes.

- [edu-game-rjs](https://github.com/filipvrba/edu-game-rjs)
- [engine2d-rjs](https://github.com/filipvrba/engine2d-rjs)

### 11.1.2 Tool
***RubyJS-Vite*** is the primary tool for developing projects.
It has a lot of capabilities, and I nearly always
use it while developing web applications. 

- **[RubyJS-Vite](https://github.com/filipvrba/ruby-js)**
