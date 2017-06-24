	

	$(function(){

		var oContainer = $('#container');
		var oLoader = $('#loader');
		var iWidth = 200;	//列宽
		var iSpace = 10;	//间隔宽
		var iOuterWidth = iWidth + iSpace;	//列实际宽
		var iCells = 0;		//总列
		var sUrl = 'http://www.wookmark.com/api/json/popular?callback=?';
		var iPage = 0;
		var arrTop = [];
		var arrL = [];
		var flag = true;

		function setCells(){
			iCells = Math.floor($(window).innerWidth() / iOuterWidth);

			if(iCells < 3){
				iCells = 3;
			}
			if(iCells > 7 ){
				iCells =7
			}
			document.title = iCells;
			oContainer.css('width',iOuterWidth * iCells - iSpace);
		}

		setCells();

		for (var i = 0; i < iCells; i++) {
			arrTop.push(0);
			arrL.push(i * iOuterWidth);
		};
		console.log(arrL)

		function getData(){
			if(flag){
				flag = false;
				oLoader.show();
				$.getJSON(sUrl, 'page='+iPage, function(data) {
					$.each(data,function(index,obj){
						var oImg = $('<img />');
						oImg.attr('src',obj.preview);

						oContainer.append(oImg);

						var iHeight = iWidth / obj.width * obj.height;

						oImg.css({
							width: iWidth,
							height: iHeight
						});

						var iMinIndex = getMin();

						oImg.css({
							left: arrL[iMinIndex],
							top: arrTop[iMinIndex]
						})

						arrTop[iMinIndex] += iHeight + 10;

						oLoader.hide();
						flag = true;
					})
				});
			}
		}
		
		getData();

		$(window).on('scroll',function(){
			var iH = $(window).scrollTop() + $(window).innerHeight();
			var iMinIndex = getMin();

			if(arrTop[iMinIndex] + oContainer.offset().top < iH){
				iPage++;
			}

		})

		$(window).on('resize',function(){

			var iOldCells = iCells;

			setCells();

			if(iOldCells == iCells){
				return;
			}
			arrT = [];
			arrL = [];
			for (var i = 0; i < iCells; i++) {
				arrTop.push(0);
				arrL.push(i * iOuterWidth);
			};

			var aImgs = oContainer.find('img');
			aImgs.each(function(){
				var iMinIndex = getMin();
				$(this).animate({
					left: arrL[iMinIndex],
					top: arrTop[iMinIndex]
				});

				arrTop[iMinIndex] += $(this).height() + 10;
			});
		});

		function getMin(){
			var iv = arrTop[0];
			var _index = 0;

			for (var i = 0; i < arrTop.length; i++) {
				if(arrTop[i] < iv){
					iv = arrTop[i];
					_index = i;
				}
			}

			return _index;
		}












	})