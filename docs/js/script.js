var textbox = document.getElementById("eq");
var num1 = '';
var res = 0;
var mul = 1;
var lastOp;
var divCount = 0;
var subCount = 0;
var disp = function(element) {
	var val = element.value, count = 0;
	//console.log(val);
	
	if (val !== null && val !== '=' && val !== " ") {
		switch (val) {
		case '+':
				if (lastOp === '=')
                    {num1 = '0';}
			lastOp = '+';
		
			res += ((num1 !== '') ? parseInt(num1, 10) : 0);
			count++;
			num1 = '';
			break;
		case '-':
				if(lastOp === '=')
					{num1 = '0';}
				lastOp = '-';
			if(subCount === 0){
					res = ((res !== '') ? res : parseInt(num1));
					subCount+= 1;
				}else{
					res = res - ((num1 !== '') ? parseInt(num1) : 0);
				}
			count++;
			num1 = '';
			break;
		case '*':
				if(lastOp === '=')
					{num1 = '1';}
				lastOp = '*';
			res = mul * ((num1 !== '') ? parseInt(num1) : 1);
				mul = res;
			count++;
			num1 = '';
			break;
		case '/':
				if(lastOp === '='){
					num1 = '1';
                }
				lastOp = '/';
				if(divCount === 0){
					res = ((res !== '') ? res : parseInt(num1));
					divCount += 1;
				}else{
					res = res / ((num1 !== '') ? parseInt(num1) : 1);
				}
			count++;
			num1 = '';
			break;
		default:
			num1 += val;
			textbox.value = '' + num1;
			//console.log(num1);
			break;
		}
		console.log(res +' '+num1 + ' '+lastOp + ' ' + count + ' ' + subCount +' ');
	}
	else if (val === '=') {
		
		if (count >= 0) {
			//console.log(lastOp);
			if (lastOp === '+') {
				res += parseInt(num1);
				mul = res;
				//num1 = '0';
			}
			else if (lastOp === '-') {
				res -= parseInt(num1);
				mul = res;
			//	num1 = '0';
			}
			else if (lastOp === '*') {
				res = mul * parseInt(num1);
				mul = res;
			}
			else if (lastOp === '/') {
				res = res / parseInt(num1);
				mul = res;
			}
			console.log(num1 + ' ' + res);
		}
		num1='';
		textbox.value = res;
		lastOp = '=';
		console.log(parseInt(num1));
		//alert(res);
	}
	else {
		res = 0;
		num1 = '';
		mul = 1;
		lastOp = '';
		textbox.value = 0;
		divCount = 0;
		subCount = 0;
	}
}
