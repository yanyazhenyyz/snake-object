		
			
			/*把蛇和食物以及map对象 分别实现具体代码
			把整体的游戏抽象成一个对象  让蛇和食物以及map统一到游戏对象下面 统一由游戏对象支配
			
				游戏对象：
					属性：食物 蛇  map
					方法：开始游戏的方法  （统一调用食物渲染 和蛇的渲染 以及其他的方法）
					
				new Game();
				Game.start();
			* 
			* 
			* 
			* */
			(function(window,Food,Snake){
				
				// 游戏构造函数
				function Game(map) {
					// 分别把之前写法的食物对象和蛇对象 实例化之后挂载到当前构造函数的属性下面
					// map也加过来
					this.Food = new Food(); // this.Food.render();
					this.Snake = new Snake();
					this.map = map;
				}
				Game.prototype.start = function() {
					
					this.Food.render(this.map);
					this.Snake.render(this.map);
					// 下面是让蛇走起来
					runSnake(this);
					bindKey(this);
				}
				
				// 建立一个私有的方法  runSnake  让蛇走起来
				function runSnake(that) {
					
					
					var timer = setInterval(function(){
						// 定时器里面的this有问题 指向window 所以用that
						
						that.Snake.move(that.Food,that.map);
						// 运动一下  让蛇重新在页面上渲染一下
						// 这个渲染方法里面 蛇的位置 是根据body里面的数据渲染的  那么原来页面上的蛇还在
						// 让新的蛇在页面上放置之前 需要将原来页面上放置过的蛇 删除掉
						that.Snake.render(that.map);
						
						// 判断是否撞墙
						
						// 用头的坐标 和map地图边界进行判断 
						var headX = that.Snake.body[0].x * that.Snake.width;
						var headY = that.Snake.body[0].y * that.Snake.height;
						// 地图的最右边 和最下面
						var maxX  = that.map.offsetWidth - that.Snake.width;
						var maxY = that.map.offsetHeight - that.Snake.height;
						
						// 从四个边界 判断是否撞墙
						if(headX <0 || headX > maxX) {
							clearInterval(timer);//停止蛇的运动
							alert("Game Over");
						}
						
						if(headY < 0 || headY > maxY) {
							clearInterval(timer);//停止蛇的运动
							alert("Game Over");
						}
						
					},200)
					
					
				}
				
				// 私有方法 绑定键盘事件
				function bindKey(that) {
					
					document.addEventListener("keydown",function(e){
						e = e || event;
						//console.log(e.keyCode)
						// 37 左键 38 上键  39 右键 40 下键
						
						switch(e.keyCode) {
							case 37 :
								that.Snake.direction = "left";
							break;
							case 38 :
								that.Snake.direction = "up";
							break;
							case 39 :
								that.Snake.direction = "right";
							break;
							case 40 :
								that.Snake.direction = "down";
							break;
						}
						
						
						
					},false);
					
				}
				
				// 暴露出去Game构造函数
				window.Game = Game;
				
			})(window,Food,Snake);
		
			