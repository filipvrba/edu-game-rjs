# API development
This project's development was an intriguing process, and various prototypes were being made.
*MRuby* and the fact that it can be used virtually anywhere astound me.
I intended to create an *API* that would allow *JS* code to easily access the *Ruby API*.
It's designed to give me access to *Ruby* functions that facilitate work. 

> ### Info
> Because it is a *"lightweight"* version of the language, *JS* has many limitations.

I had to learn a new language called *"V" (Vlang)* and specific
*MRuby* architecture in order to create the prototype.
It eventually evolved into a web application that could
execute *Ruby* scripts and output the results to a specific *html element*.
I then had a solid base from which to build an *API*, and this project was born. 

> ### Prototype
> Here is a [link to a video](https://youtu.be/abDi-TXwZqE) in which I describe the aforementioned prototype.

### Content
- [1 Beginning](#1-beginning)
	- [1.1 Project](#11-project)
	- [1.2 Adjustment](#12-adjustment)
		- [1.2.1 Startup file](#121-startup-file)
		- [1.2.2 BPSF](#122-bpsf)
		- [1.2.3 Test](#123-test)
- [2 Development](#2-development)
	- [2.1 Web](#21-web)
		- [2.1.1 Basis](#211-basis)
		- [2.1.2 Extension](#212-extension)
		- [2.1.3 Test](#213-test)
	- [2.2 MRuby](#22-mruby)
		- [2.2.1 Creating a module](#221-creating-a-module)
		- [2.2.2 Import module](#222-import-module)
	- [2.3 API](#23-api)
		- [2.3.1 Extension](#231-extension)
		- [2.3.2 Test](#232-test)
- [3 Epilogue](#3-epilogue)
	- [3.1 Dockerfile](#31-dockerfile)
	- [3.2 A more sophisticated API](#32-a-more-sophisticated-api)
- [4 Signpost](#4-signpost)
	- [4.1 Repository](#41-repository)

## 1 Beginning
However, we begin at the beginning.
You must download and build *MRuby* source codes in order to construct *APIs* from it.

The required files can be found in the "*lib*" folder outside of the
guest build that is created as a result of this; we'll need these when setting up the project.
*MRuby* source codes for the simpler ones will undoubtedly be useful.
The majority of them can be found in the file "*.h*."

Additionally, you must make sure that *Vlang* is set up on the *PC*. 

### 1.1 Project
The project must be created after all the files have been prepared.
To initialize *Vlang*, a folder must be created and put into it. 

*With the following command, we do this:*

```bash
mkdir api && cd $_ && v init
```

The project will include folders with the *MRuby*-specific files in them.

- lib
- include

This will produce the best possible development environment for the project.

```bash
.
├── api.v  # The source file's project name 
├── include
│   ├── mrbconf.h
│   ├── mruby
│   │   ├── array.h
│   │   ├── boxing_nan.h
│   │   ├── boxing_no.h
│   │   ├── boxing_word.h
│   │   ├── class.h
│   │   ├── common.h
│   │   ├── compile.h
│   │   ├── data.h
│   │   ├── debug.h
│   │   ├── dump.h
│   │   ├── endian.h
│   │   ├── error.h
│   │   ├── ext
│   │   │   └── io.h
│   │   ├── gc.h
│   │   ├── hash.h
│   │   ├── irep.h
│   │   ├── istruct.h
│   │   ├── khash.h
│   │   ├── numeric.h
│   │   ├── object.h
│   │   ├── opcode.h
│   │   ├── ops.h
│   │   ├── presym
│   │   │   ├── disable.h
│   │   │   ├── enable.h
│   │   │   ├── id.h
│   │   │   ├── scanning.h
│   │   │   └── table.h
│   │   ├── presym.h
│   │   ├── proc.h
│   │   ├── range.h
│   │   ├── re.h
│   │   ├── string.h
│   │   ├── throw.h
│   │   ├── time.h
│   │   ├── value.h
│   │   ├── variable.h
│   │   └── version.h
│   └── mruby.h
├── lib
│   ├── libmruby.a
│   ├── libmruby_core.a
│   └── libmruby.flags.mak
└── v.mod
```

### 1.2 Adjustment
The project will then be post-edited.
A launcher file that can compile the source codes and,
in the event that they are amended, rebuild them automatically must be constructed.
Because we will access the source codes using the basic project source file,
it is crucial that the components are structured so that they
may be saved in the "*src*" folder. 

### 1.2.1 Startup file
In the project, a folder called "*bin*" and the file "server" are both created.
This file will have a command that activates "v" and watches project files.
The basic project source file that has been provided *(hence referred to as BPSF)*
will be started and compiled into the "*dist*" folder.
It is still essential to provide the executable file access privileges in a *Unix* system. 

*With this command, we will carry out all the aforementioned actions:*
```bash
mkdir bin dist &&
echo -e '#!/bin/bash\nv watch -o dist/api run app.v' > bin/server &&
chmod +x bin/server
```

### 1.2.2 BPSF
It is a project file that was initially as a project.
We slightly edit this file before placing it in the "*src*" subdirectory.
(To be a part of the appropriate module.)
A new project source file called "*app.v*" is then created in the project,
and it will access "*src*." 

*With this command, we will carry out all the aforementioned actions:*
```bash
rm api.v && mkdir src &&
echo -e "module main\n\nimport src\n\nfn main() {\n    src.main()\n}" > app.v &&
echo -e "module src\n\npub fn main() {\n    println('Hello World')\n}" > src/api.v
```

### 1.2.3 Test
Everything ought to be prepared, so I'll check the project's functionality.
We launch the project with the command, and it prints *"Hello World"* to the prompt.
The application is tracking files, thus it won't shut down.
This makes it possible to track changes in real time when building a website. 

*Command to run the project:*
```bash
bin/server
```

> ### Info
> The software must be terminated by pressing **CTRL+C**.

## 2 Development
The project will go through three phases of development.
These steps should not be neglected because they are crucial.
The web application's implementation process will be discussed.

*The three stages we'll talk about are as follows:*

1. **[Web](#21-web)**
2. **[MRuby](#22-mruby)**
3. **[API](#23-api)**

### 2.1 Web
The project will go through the following editing process.
We will begin server programming since we want the web application project to be successful.
We will import it and access the function because *Vlang*
comes with a built-in module called "*vweb*".
We fill in the arguments the function requires in order to produce an executable server.

### 2.1.1 Basis
Making a *"server.v"* file in the "*src*" folder is the first step.

*With the following command, we do this:*
```bash
touch src/server.v
```

*The following code will be added to this file during editing:*
```V
// server.v
module src

import vweb

const (
	port = 8080
)

struct App {
    vweb.Context
}

pub fn run() {
    vweb.run_at(new_app(), vweb.RunParams{
        port: port
    }) or { panic(err) }
}

fn new_app() &App {
    mut app := &App{}
    return app
}
```

The "*run()*" function must be used to call the written code in order to execute it.
The "*main()*" function will use the "*api.v*" file to invoke this function. 

*Source code modification:*
```V
// api.v
module src

pub fn main() {
    run()
}
```

### 2.1.2 Extension
A few further functions must be added to the web application.

- **before_request()** *(It is extensible and called each time we get a response from the header.)*
- **health()** *(A web application test function is what it is. When using Docker, useful.)*

Although we won't actually require these functions
for this project, they are nonetheless necessary.
For instance, a *header* element is added to the method
"*before request()*" to allow access from a different protocol.
Therefore, if we wish to use *JS* to access this web *API*,
it first determines whether "*Access-Control*" is enabled.
If so, the *API* result can be read. 

*The following functions are assigned to the "server.v" file:*
```V
// ...
pub fn (mut a App) before_request() {
    a.add_header("Access-Control-Allow-Origin", "*")  
}

pub fn (mut app App) health() vweb.Result {
	return app.json({"statusCode":"200", "status":"ok"})
}
```

### 2.1.3 Test
Using the executable file, we launch the local server and browse to it.
The result will be shown in json format if we add '*health*' after the link.
This determines whether the website is react. 

![api_web_test_health_01](/public/png/api_web_test_health_01.png)

### 2.2 MRuby
Now, *MRuby* in *Vlang* will function.
We must first build a "*module*" and then place the "*flag*" specification inside of it.
Then, "*include*" can be used to access the "*.h*" files.
All *MRuby* functions that will be utilized must be declared in the source code.
This guarantees that *Vlang* is aware of the expected types.
To ensure secure processing of values, we shall develop a few functions.
The primary function, "*mrb_code()*," reads a *Ruby* script and extracts the result from it. 

### 2.2.1 Creating a module

Therefore, a module with the name "*mruby*" will need to be created.
*This is created by the following command:*

```bash
mkdir src/mruby && touch $_/mruby.v
```

*The 'mruby.v' file has to have the following source code:*

```V
module mruby

#flag -L @VMODROOT/lib
#flag -I @VMODROOT/include
#flag @VMODROOT/lib/libmruby.a -lm
#include "mruby.h"
#include "mruby/compile.h"
#include "mruby/string.h"
#include "mruby/array.h"

struct C.RClass {
}

struct C.mrb_state {
	object_class &C.RClass
	kernel_module &C.RClass
}

struct C.mrb_value {
}

struct C.mrb_kwargs {
}

type Func_t = fn (&C.mrb_state, C.mrb_value) C.mrb_value
type Aspec  = u32

fn C.MRB_ARGS_NONE() Aspec
fn C.MRB_ARGS_OPT(n_one Aspec) Aspec
fn C.RSTRING_PTR(obj_str C.mrb_value) charptr
fn C.RARRAY_LEN(C.mrb_value) int

fn C.mrb_open() &C.mrb_state
fn C.mrb_load_string(mrb &C.mrb_state, s &char) C.mrb_value
fn C.mrb_close(mrb &C.mrb_state)
fn C.mrb_define_class(mrb &C.mrb_state, name &char, super &C.RClass) &C.RClass
fn C.mrb_define_class_method(mrb_state &C.mrb_state, cla &C.RClass, name &char, fun Func_t, aspec Aspec) voidptr
fn C.mrb_define_method(mrb_state &C.mrb_state, cla &C.RClass, name &char, fun Func_t, aspec Aspec) voidptr
fn C.mrb_get_args(mrb &C.mrb_state, format &char, value &C.mrb_value) int
fn C.mrb_string_p(C.mrb_value) bool
fn C.mrb_fixnum_p(C.mrb_value) bool
fn C.mrb_fixnum(C.mrb_value) int
fn C.mrb_bool(C.mrb_value) u8
fn C.mrb_float_p(C.mrb_value) bool
fn C.mrb_float(C.mrb_value) f32
fn C.mrb_array_p(C.mrb_value) bool
fn C.mrb_array_p(C.mrb_value) bool
fn C.mrb_ary_ref(C.mrb_state, C.mrb_value, int) C.mrb_value
fn C.mrb_string_cstr(&C.mrb_state, C.mrb_value) &u8

pub fn mrb_code(mrb_code string) string {
	mut mrb := C.mrb_open()
	mut mrb_result := ""
	
	mrb_content := C.mrb_load_string(mrb, mrb_code.str)
	mrb_result = get_value(mrb, mrb_content)
	C.mrb_close(mrb)

	return mrb_result
}

fn get_value(mrb &C.mrb_state, value C.mrb_value) string {
	if C.mrb_string_p(value) {
		return unsafe{ tos_clone( C.mrb_string_cstr(mrb, value) ) }
	}
	else if C.mrb_fixnum_p( value ) {
		return C.mrb_fixnum(value).str()
	}
	else if C.mrb_float_p(value) {
		return C.mrb_float(value).str()
	}
	else if C.mrb_array_p(value) {
		mut result := ""
		len := C.RARRAY_LEN(value)
		for i := 0; i < len; i++ {
			str_value := C.mrb_ary_ref( mrb, value, i )
			result += get_value(mrb, str_value)

			if i != len - 1 {
				result += ";"
			}
		}

		return result
	}
	else {
		bool_v := C.mrb_bool(value)
		return if bool_v == 0 { "false" } else { "true" }
	}

	return ""
}
```

### 2.2.2 Import module
The "*mruby*" module is imported under "*module src*" after editing the "*api.v*" file.

*Here is the code:*
```V
// api.v
module src

import src.mruby
// ...
```

### 2.3 API
Finally, we reach the stage where programming the *API* will take place.
As a result, the "*api.v*" file will be modified,
and a router that uses the "*page_root()*" - *("/")* reference will be built from it.
He will assess the *MRuby API* overall functionality.
You need to define a structure containing the *MRuby*
values of the result in order to render the result in the *json* format.

### 2.3.1 Extension
*By importing the module, we expand the file and add the 'Result' structure:*

```V
// api.v
// ...
import src.mruby
import vweb

struct Result {
	code     string
	mrb_code string
	result   string
}
// ...
```

*A new function is added after being inserted under the "main()" function:*
```V
// api.v
// ...
['/'; get]
fn (mut a App) page_root() vweb.Result {
	mrb_head := a.query["mrb"]
	mut json_struct := Result{ "Error", mrb_head, "nil" }

	if mrb_head.len > 0 {
		json_struct = Result{ "Result", mrb_head, mruby.mrb_code(mrb_head) }
	}

	return a.json(json_struct)
}
```

### 2.3.2 Test
The *API* should operate after extending the source code.
As soon as the server is running and the browser is open,
the output in *json* format is visible.
For *MRuby*, the anticipated outcome is "*nil*".
This is due to the fact that we do not attribute the "*mrb*" option with *Ruby* script.
If we add a *Ruby* script parameter after the url "*mrb*",
then this script should execute successfully. 

![api_web_test_arg_02](/public/png/api_web_test_arg_02.png)

## 3 Epilogue
You have successfully finished the first stage of
developing an *API* if everything functions as it should.
Additionally, a public server may host this web application.
It is required to include this application in *Docker* in order
to make most services work as intended. 

### 3.1 Dockerfile
The [*Dockerfile*](https://github.com/filipvrba/mrb-api/blob/main/Dockerfile) is
available in my repository, but I won't go into detail about it here. 

### 3.2 A more sophisticated API
A more advanced version of this *API* is also available in the repository.
Additionally, it has a link that directs you to the public *API*.

## 4 Signpost
There are many projects that can use the *API*.
I prepared a project using this *API* as a result.
This link will take you to the game's prototype if you wish to play it.

- **[Edu Game](https://edu-game-rjs.vercel.app/)**

I'll direct you to this post if you want to learn more about the progress of this project.
The method used to access the *API* in order to assess *Ruby* scripts is also described in it. 

- ![Project development]()

### 4.1 Repository
The repository is released under the *MIT license*,
and you are free to alter it to suit your needs.

- [mrb-api](https://github.com/filipvrba/mrb-api)
