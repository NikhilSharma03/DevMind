# DevMind

<div align="center">  
<br>

<img width=100% src="./assets/docs.png"></p>

</div>

<div align="center">  
<br>
 
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=95)](https://github.com/NikhilSharma03/DevMind) 
[![Build by Nikhil](https://img.shields.io/badge/Built%20by-Nikhil-Green)](https://github.com/NikhilSharma03/DevMind)

</div>

<br>

<h3 align="center"> 🌟 DevMind is a social media platform for developers 💻 to share their ideas and thoughts with developers all over the world 🚀</h3>

<br>

## Technology Stack

<h3 align="center">Languages</h3>

<div align="center">

<img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%23323330.svg?&style=for-the-badge&logo=typescript"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="HTML5" 
src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" 
src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>

</div>

<br>

<h3 align="center">Library & Frameworks</h3>

<div align="center">

<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="Mongoose" src ="https://img.shields.io/badge/Mongoose-%234ea94b.svg?&style=for-the-badge&logo=Mongoose&logoColor=white"/>
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/docs/getting-started.html)

</div>

<br>

<h3 align="center">Project Management Tools</h3>

<div align="center">

<img alt="GitHub" src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/> <img alt="Git" src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/>

</div>

<br>

## Setup and Installation

First install the `server` dependency,

```
make setup-server-libs
```

Now to run server, first add `Environment Variables` by creating a new `.env` file at `root` level and add the contents following `.env.example`

Once you have added correct credentials, start the server

```
make run-server
```

To get auto reload, start the dev server,

```
make run-server-dev
```

If using `docker compose`, then first build the image

```
make compose-dev-build
```

Now start the dev server

```
make compose-dev-up
```

To access logs

```
make compose-dev-logs
```

To shut down the server

```
make compose-dev-down
```

<br>

Now to run `UI`, First install the UI dependency,

```
make setup-ui-libs
```

Now to run UI, first add `Environment Variables` by creating a new `.env` file in `ui` folder and add the contents following `.env.example`

Once you have added correct credentials, start the ui

```
make run-ui-dev
```

To build ui,

```
make build-ui
```

<br>

# License

<div align="center">  
<br>

<img width=35% src="https://media0.giphy.com/media/3ornjXbo3cjqh2BIyY/200.gif"></p>

<br>
</div>
