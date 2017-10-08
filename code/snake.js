// 把全局的window和之前的食物对象 传入进去 需要的时候用
		(function(window,Food){
			// 建立一个数组 用来存往页面上放置的蛇的组成部分
			var ele = [];
			
			// 把蛇抽象成一个对象
			// 属性： width  height  方向   body蛇的组成部分（头 两个身子）
			
			// 方法 render 把蛇放入页面中
			
		
			function Snake(width,height,direction) {
				// 蛇的宽高
				this.width = width || 20;
				this.height = height || 20;
				// 设定一个蛇的方向  默认为右
				this.direction = direction || "right";
				
				// 蛇的身体 建立一个数组  用来存三节身 每一个部位 都有颜色color和位置（x,y）
				this.body = [
					{x:3,y:2,color:"red"},
					{x:2,y:2,color:"orange"},
					{x:1,y:2,color:"orange"}
				];
			}
			
			Snake.prototype.render = function(map) {
				// 渲染之前先删除原来的页面上的蛇
				remove();
				
				// 根据蛇的身体这个数组 来循环生成蛇
				for(var i = 0; i < this.body.length; i++) {
					
					var oDiv = document.createElement("div");
					
					if(i==0) {
						oDiv.style.zIndex = 2;
					}
					
					oDiv.style.width = this.width + "px";
					oDiv.style.height = this.height + "px";
					oDiv.style.position = "absolute";
					// 让div生成的这部分 位置 等于body里面的坐标 依次循环赋值
					oDiv.style.left = this.body[i].x*this.width + "px";
					oDiv.style.top = this.body[i].y*this.height + "px";
					
					oDiv.style.backgroundColor = this.body[i].color;
					
					map.appendChild(oDiv);
					// 在循环渲染当中 只要 加进去一个蛇的部位 那么就将这个部位存到ele数组
					ele.push(oDiv);
				}
				
				
			}
			
			// 建立一个私有的方法成员 用来删除页面上原来的蛇的身体
			function remove() {
				for(var i = 0; i < ele.length; i++) {
					ele[i].parentNode.removeChild(ele[i]);
				}
				ele = [];
			}
			
			
			// 想要让蛇移动 ： 需要将蛇的每一部分都往前挪一下
			Snake.prototype.move = function(food,map){
				//让蛇的除了头　其他身体都已经往前挪了
				for(var i = this.body.length-1; i > 0; i--) {
					
					this.body[i].x = this.body[i-1].x;
					this.body[i].y = this.body[i-1].y;
					
				}
				
				//　头往哪走 取决于方向direction
				switch(this.direction) {
					
					case "left" :
						this.body[0].x -= 1;
					break;
					case "right":
						this.body[0].x += 1;
					break;
					case "up":
						this.body[0].y -= 1;
					break;
					case "down":
						this.body[0].y += 1;
					break;
				}
				
				// 检测是否碰到食物 如果 碰到 食物 则自身加一个最后的身体 让map上食物删除，重新生成一个随机的新的食物
				// 获取一下当前的蛇的头部坐标
				var headX = this.body[0].x * this.width; 
				var headY = this.body[0].y * this.height;
				// 判断是否碰撞上了食物
				if(headX == food.x && headY == food.y) {
					// 如果碰上了 则让自己的身体长一部分
					// 将原来的身体的最后一部分 存起来
					var last = this.body[this.body.length-1];
					// 往数组body里面添加进去最后一部分  最后效果就是增加了一节
					this.body.push({
						x: last.x,
						y: last.y,
						color :last.color
					})
					// 如果蛇已经把食物吃了 那么则食物应该删除 重新生成新的食物
					food.render(map);
				}
			}
			
			window.Snake = Snake;
			
		})(window,Food);
		
//		this.body = [
//					{x:3,y:2,color:"red"},
//					{x:2,y:2,color:"orange"},
//					{x:1,y:2,color:"orange"},
//					{x:1,y:2,color:"orange"}
//				];
//				
		// 1  你的逻辑思维没有很好的培养起来 有待加强
		// 2 js基础不扎实  重复练习 加深理解
		// 3 js高级部分  （面向对象  思维不太好转换 内容偏理论  新知识点 ）
		
		
		/*1 大脑知识脑存储量不够  多见不同题型 开阔视野
		2 知识迁移能力差  提供举一反三的能力  (多想一想)
		* 享受痛苦 
		* 
		* */
		
//让蛇动起来
//
//键盘控制
//删除方法