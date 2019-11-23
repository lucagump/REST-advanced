# REST-Advanced

## Model View Control
<a href="https://techterms.com/definition/mvc">
<img src="https://raw.githubusercontent.com/lucagump/REST-advanced/master/assets/mvc.png" 
alt="Model View Controller" width="480" height="360"  /></a>

<!-- ![](./assets/mvc.png) -->

MVC stands for "Model-View-Controller." MVC is an application design model comprised of three interconnected parts. They include the model (data), the view (user interface), and the controller (processes that handle input).

The MVC model or "pattern" is commonly used for developing modern user interfaces. It is provides the fundamental pieces for designing a programs for desktop or mobile, as well as web applications. It works well with object-oriented programming, since the different models, views, and controllers can be treated as objects and reused within an application.

Below is a description of each aspect of MVC:

1. Model
A model is data used by a program. This may be a database, file, or a simple object, such as an icon or a character in a video game.

2. View
A view is the means of displaying objects within an application. Examples include displaying a window or buttons or text within a window. It includes anything that the user can see.

3. Controller
A controller updates both models and views. It accepts input and performs the corresponding update. For example, a controller can update a model by changing the attributes of a character in a video game. It may modify the view by displaying the updated character in the game.

The three parts of MVC are interconnected (see diagram). The view displays the model for the user. The controller accepts user input and updates the model and view accordingly. While MVC is not required in application design, many programming languages and IDEs support the MVC architecture, making it an common choice for developers.

## Requirements

Here what you need to run the application locally

### Node & NPM

```sh
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt-get install nodejs
$ node -v 
$ npm -v
```

### Mongodb & Compass 

1. <https://hevodata.com/blog/install-mongodb-on-ubuntu/>
2. <https://www.mongodb.com/download-center/compass?jmp=docs>

### Postman & HTTPIE

```sh
$ sudo apt install httpie
$ snap install postman
```

## Architecture

```sh
├── app.js
├── config
│   └── config.json
├── controllers
│   ├── actions
│   ├── encounter.controller.js
│   ├── enemy.controller.js
│   ├── player.controller.js
│   └── product.controller.js
├── models
│   ├── encounter.model.js
│   ├── enemy.model.js
│   ├── player.model.js
│   └── product.model.js
├── package.json
├── package-lock.json
├── README.md
└── routes.js
```

## Run!
Serve the application and the other stuffs

```sh
$ npm install
$ npm start
$ mongodb-compass&
$ postman
```

## Send Requests

Now the application is running on <http://localhost:3333> 

1. **post** <localhost:3333>/players/
2. **get** <localhost:3333>/players/:id
3. **post** <localhost:3333>/enemy/
4. **get** <localhost:3333>/enemy/:id
5. **post** <localhost:3333>/encounters/
6. **put** <localhost:3333>/encounters/
7. **delete** <localhost:3333>/encounters/:id

