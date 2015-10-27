'use strict';

var Yeoman = require('yeoman-generator');
var YeoSay = require('yosay');
var Chalk  = require('chalk');

module.exports = Yeoman.generators.Base.extend({

	constructor:function(){
		Yeoman.Base.apply(this, arguments);
		this.argument('AppName', {type:'string', required: false});
	},

	initializing:function(){
		this.log(YeoSay(`Create your ${Chalk.yellow('GIK')} app with super powers!`));
		this.LOCALS = {};
	},

	prompting:function(){
		var done = this.async();
		var prompts = [];
		var yo = this;

		if (!this.LOCALS.AppName) prompts.push({
			type    : 'input',
			name    : 'AppName',
			message : 'What\'s your app name?',
			default : yo.appname
		});

		yo.prompt(prompts, function(answers){
			for (var key in answers) yo.LOCALS[key] = answers[key];
			done();
		});
	},

	writing: function(){
		this.directory('src');
		this.directory('test');
		this.template('_npmignore', '.npmignore');
		this.template('_gitignore', '.gitignore');
		this.template('_package.json', 'package.json', this.LOCALS);
		this.template('_gulpfile.js', 'gulpfile.js');
	},

	install: function(){
		this.installDependencies();
	}

});
