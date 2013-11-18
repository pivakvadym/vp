function Enemy(x, y, type, subtype){
	this.x = x;
	this.y = y;

	this.direction = {
		up: true,
		down: false,
	};

	this.step = function(){
		if(subtype !== 1){
			if(this.direction.up){
				this.y -= this.speed;
			}else if(this.direction.down){
				this.y += this.speed;
			}

			if(this.y < 0){
				this.direction.up = !(this.direction.down = true);
			}else if(this.y + this.height > level.scene.height){
				this.direction.up = !(this.direction.down = false);
			}
		}else{
			if(this.direction.up){
				this.x -= this.speed;
			}else if(this.direction.down){
				this.x += this.speed;
			}

			if(this.x < 0){
				this.direction.up = !(this.direction.down = true);
			}else if(this.x + this.width > level.scene.width){
				this.direction.up = !(this.direction.down = false);
			}
		}
	};


	if(type === 0){
		this.width = 10;
		this.height = 10;
		this.color = "#000";
		this.speed = 3;
		this.Effect = Enemy.effects.Colored;
	}else
	if(type === 1){
		this.width = 20;
		this.height = 10;
		this.color = "#0F0";
		this.speed = 5;
		this.Effect = Enemy.effects.Dilatory;
	}else
	if(type === 2){
		this.width = 10;
		this.height = 20;
		this.color = "#0FF";
		this.speed = 3;
		this.Effect = Enemy.effects.Enlarge;

		var fixedX = x;
		var fixedY = y;
		var angle = 0; // deg
		var angleSpeed = 3;
		var radius = 30;
		this.step = function(){
			this.x = Math.sin(angle / 180 * Math.PI) * radius + fixedX;
			this.y = Math.cos(angle / 180 * Math.PI) * radius + fixedY;
			angle += angleSpeed;
		}
	}

	this.usedEffect = null;

	this.collisionEffect = function(hero){
		if(!this.usedEffect){
			for(var i = 0; i < hero.effects.length; i++){
				var effect = hero.effects[i];
				if(effect instanceof this.Effect){
					effect.remove();
				}
			}

			hero.effects.push(new this.Effect(hero, this));
		}else{
			this.usedEffect.reset();
		}
	}
}

Enemy.effects = {
	Colored: function(target, guilty){
		var COUNTER_START_VALUE = 50;

		this.target = target;
		this.guilty = guilty;
		this.guilty.usedEffect = this;
		this.oldColor = target.color;
/*        this.target.color = get_random_color();*/
		this.target.color = "#" + (0 | Math.random() * 0xFFFFFF).toString(16);

		this.update = function(){
			this.counter--;

			if(this.counter <= 0){
				this.remove();
			}
		};

		this.reset = function(){
			this.counter = COUNTER_START_VALUE;
		};

		this.remove = function(){
			this.target.color = this.oldColor;
			this.target.effects.splice(
				this.target.effects.indexOf(this),
				1
			);
			this.guilty.usedEffect = null;
		};
	},
	Dilatory: function(target, guilty){
		var COUNTER_START_VALUE = 50;
		
		this.target = target;
		this.guilty = guilty;
		this.guilty.usedEffect = this;

		this.oldSpeed = target.speed;
		this.target.speed *= .5;

		this.update = function(){
			this.counter--;

			if(this.counter <= 0){
				this.remove();
			}
		};

		this.reset = function(){
			this.counter = COUNTER_START_VALUE;
		};

		this.remove = function(){
			this.target.speed = this.oldSpeed;
			this.target.effects.splice(
				this.target.effects.indexOf(this),
				1
			);
			this.guilty.usedEffect = null;
		};
	},
	Enlarge: function(target, guilty){
		var COUNTER_START_VALUE = 50;
		
		this.target = target;
		this.guilty = guilty;
		this.guilty.usedEffect = this;

		this.oldSize = target.size;
		this.target.size *= 2;
		this.target.x -= this.target.size / 4;
		this.target.y -= this.target.size / 4;

		this.update = function(){
			this.counter--;

			if(this.counter <= 0){
				this.remove();
			}
		};

		this.reset = function(){
			this.counter = COUNTER_START_VALUE;
		};

		this.remove = function(){
			this.target.x += this.target.size / 4;
			this.target.y += this.target.size / 4;
			this.target.size = this.oldSize;
			this.target.effects.splice(
				this.target.effects.indexOf(this),
				1
			);
			this.guilty.usedEffect = null;
		};
	}
};