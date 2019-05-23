$(document).ready(function(){
	
	var sendBtn = $('#send');

	var list = $('.BMIList');
	var data = JSON.parse(window.localStorage.getItem("BMIList")) || [];

	updateList(data);

	sendBtn.on({
		click: function(){
			var height = $('#tallNum').val();
			var weight = $('#weightNum').val();
			var bmiList = {};
			var bmi, status, BMIcolor, circleColor, textColor, bgColor;
			
			var d = new Date();
			var TimeNow = d.getFullYear() + "/" + (d.getMonth()+1 <10 ? '0' : '') + 
				   (d.getMonth()+1) + "/" + d.getDate(); 
			var TimeNowT = (d.getHours() < 10 ? '0' : '') + d.getHours() + " : " +
				  	   (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + " : " +
				   	   (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
			
			if(!height || !weight){
				$('#tall').val("");
				$('#weight').val("");
				return;
			}
			else{
				bmi = weight / ((height / 100) * (height / 100));
				bmi = bmi.toFixed(2);
					if(bmi < 18.5){
						status="過輕";
						BMIcolor="less-color";
						circleColor="less-border-color";
						textColor = "less-color-text";
						bgColor = "less-color-bg";

					} else if( bmi >= 18.5 && bmi < 25){
						status="理想";
						BMIcolor="ldeal-color";
						circleColor="ldeal-border-color";
						textColor = "ldeal-color-text";
						bgColor = "ldeal-color-bg";

					} else if( bmi >= 25 && bmi < 30){
						status="過重";
						BMIcolor="fat-color";
						circleColor="fat-border-color";
						textColor = "fat-color-text";
						bgColor = "fat-color-bg";

					} else if( bmi >= 30 && bmi < 35){
						status="輕度肥胖";
						BMIcolor="less-fat-color";
						circleColor="less-fat-border-color";
						textColor = "less-fat-color-text";
						bgColor = "less-fat-color-bg";

					} else if( bmi >= 35 && bmi < 40){
						status="中等肥胖";
						BMIcolor="middle-fat-color";
						circleColor="middle-border-color";
						textColor = "middle-fat-color-text";
						bgColor = "middle-fat-color-bg";

					} else{
						status="嚴重肥胖";
						BMIcolor="much-fat-color";
						circleColor="much-fat-border-color";
						textColor = "much-fat-color-text";
						bgColor = "much-fat-color-bg";

					}
				}

				bmiList = {
					H: height,
					W: weight,
					Bmi: bmi,
					Status: status,
					bmiC: BMIcolor,
					circleC: circleColor,
					bgC: bgColor,
					txtC: textColor,
					data: TimeNow,
					time: TimeNowT
				}
				var forBtn = [circleColor, textColor, bmi, bgColor, status];
				data.push(bmiList);
				window.localStorage.setItem('BMIList', JSON.stringify(data));
				updateList(data);
				$('#tallNum').val("");
				$('#weightNum').val("");
				showBtn(forBtn);
		}
	});

	function updateList(items){
		var len = items.length;
		list.find('*').remove();
		for(var i = 0; i<len; i++){
			list.append(`<li class="d-flex justify-content-between
						align-items-center bg-white ${items[i].bmiC} py-2 mb-3 text-center">
						 <div class="col-2 text-lg bg-white textSize">
						 	${items[i].Status}
						 </div>
						 <div class="col-2 textSize" >
						 	<small>BMI</small>
						 	${items[i].Bmi}
						 </div>
						 <div class="col-2 text-lg">
						 	<small>身高: </small>
						 	${items[i].H}
						 	<span> cm</span>
						 </div>
						 <div class="col-2 text-lg">
						 	<small>體重: </small>
						 	${items[i].W}
						 	<span> kg</span>
						 </div>
						 <div class="col-3 d-md-flex align-items-center">
						 	<div class=" d-forMobile-flex align-items-center mr-md-1">
						 		<i class="far fa-calendar-alt mr-1"></i>
						 		${items[i].data}
						 	</div>
						 	<div class="d-forMobile-flex align-items-center">
						 		<i class="far fa-clock mr-0.5"></i>
						 		${items[i].time}
						 	</div>
						 </div>
						 <div class="col-1">
						 	<button type="button" class="close" aria-label="Close" value = ${i}>
						 		<span class="delete" aria-hidden="true">&times;</span>
						 	</button>
						 </div>
						</li>`);
		}
		$('.delete').each(function(){
			$(this).on({
				click: function(e){
					if(e.target.nodeName !=="SPAN"){return}
					else{
						var num = $(this).val();
						data.splice(num, 1);
						window.localStorage.setItem('BMIList', JSON.stringify(data));
						updateList(data);
					}
					//console.log(e.target.nodeName);
				}
			});
		});
	}

	function showBtn(btn){
		$('#send').hide();
		//var forBtn = [circleColor, textColor, bmi, bgColor, status];
		var str = `<div id="circle-icon" class="text-center ${btn[0]}">
					  <p class="textSize ${btn[1]}">${btn[2]}</p>
					  <small class=" ${btn[1]}">BMI<small>
					    <img src="images/icons_loop.png" alt="icons_loop" class = "${btn[3]}" id="reverse-icon">
				   </div>
				   <p class="text-center textSize ml-5 ${btn[1]}">${btn[4]}</p>`;
		$('.againBtn').append(str);
		$('#reverse-icon').on({
			click: function(){
				$('.againBtn').find('*').remove();
				$('#send').show();
				//console.log("123");
			}
		});
	}
});