# README #

This README would normally document whatever steps are necessary to get your application up and running with PracticeUpdate icons.

### What is this repository for? ###

This repo creates PracticeUpdate icons as font, svg and sprite. 

### How do I get set up? ###

PU-Icons can be installed using bower

within your project run:

```
bower install pu-icons --save
```

After that PU-icon folder will be added to you bower_component folder.

You can refer them by doing:

```
/bower_components/PU-icons/dist/grunticons/icons.data.png.css";
/bower_components/PU-icons/dist/grunticons/icons.data.svg.css";
/bower_components/PU-icons/dist/grunticons/icons.fallback.css";
----
/bower_components/PU-icons/dist/sprite/less/_sprite.less";
/bower_components/PU-icons/dist/webfonts/pu-icons.less";
```

Note that sprint and webfont are generating via less.
To get them as a css file do the follow:


First run this in your terminal:
```
npm install
```

Once that's done just run the grunt `less` task:

```
grunt less:dist
```

### Contribution guidelines ###

* Code review by [PracticeUpdate](http://www.practiceupdate.com) team.

### Who do I talk to? ###

[Brad Strong](https://bitbucket.org/bradstrong)
