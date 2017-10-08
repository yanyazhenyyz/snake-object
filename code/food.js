// 把函数自调用写出来  建立一个架子 封装起来这食物对象
		(function(window){
			// 建立一个数组 用来存 放入页面的食物
			var ele = [];
			
			// 把食物抽象成一个对象  构造函数
//			属性：
//					位置（x , y）
//					width
//					height
//					color
//				方法：渲染 render 随机将食物放置在mapdiv盒子里面
			function Food(x,y,width,height,color) {
				// 做一个默认处理 如果传入数据 按照传入的来    否则 按照默认走
				this.x = x || 0;
				this.y = y || 0;
				this.width = width || 20;
				this.height = height || 20;
				this.color = color || "green";
				
			}
			// 渲染方法 将食物创建出来 放在map上
			Food.prototype.render = function(map) {
				
				//在生成新的食物之前 先将原来页面上食物删除掉
				remove();
				
				
				
				// 创建出来一个div食物  20*20  800*600  800/20 ==40  0---40  23*20 =460
				
				/*
				 *   800*600  20*20   40,60  120,80   45,36
				 *   800/20 ==40    Math.round(Math.random()*40) * 20 ==真正的坐标
				 * 
				 * */
				var oDiv = document.createElement("div");
				// 位置是随机的  800/20  = 40   0--40===0--39  *20  0---780 一个20位单位的一个随机位置
				this.x = Math.floor(Math.random()*(map.offsetWidth/this.width))*this.width;
				this.y = Math.floor(Math.random()*(map.offsetHeight/this.height))*this.height;
				// 将this对象上面的数据依次 赋给这个食物
				oDiv.style.left = this.x + "px";
				oDiv.style.top = this.y + "px";
				// 将食物变为绝对定位
				oDiv.style.position = "absolute";
				oDiv.style.width = this.width + "px";
				oDiv.style.height = this.height + 'px';
				
				oDiv.style.backgroundColor = this.color;
				//最后要把这个食物div 放入页面中map里面
				map.appendChild(oDiv);
				// 将这个放入页面的div食物 存入数组ele
				ele.push(oDiv);
			}
			
			
			
			//如果你要是不想挂载到对象身上  不想暴露到外面 去  指向在内部用一下 可以建立 私有方法
			// 属于当前食物环境里面的私有方法
			function remove() {
				for(var i = 0; i < ele.length; i++) {
					
				 	ele[i].parentNode.removeChild(ele[i]);
					
				}
				ele = [];
			}
			
			// 最后肯定要暴露出去这个构造函数
			window.Food = Food;
			
		})(window);