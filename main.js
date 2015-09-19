if (document.title.indexOf("Support") == 0){

	$.getJSON("https://api.fixer.io/latest?base=USD", function(data){
		fx.base = "USD";
		fx.rates = data.rates;

		var dollarsRaw = document.getElementsByClassName("dollars_per")[0].textContent;
		var dollars = parseFloat(dollarsRaw.replace(/['"$,]+/g, ''));
		var patronsRaw = document.getElementsByClassName("patrons_count")[0].textContent;
		var patrons = parseInt(patronsRaw);

		var patreonFee = (dollars * 0.05).toFixed(2);

		var minFees = (dollars*0.019).toFixed(2);
		var maxFees = ((dollars*0.05)+(patrons*0.3)).toFixed(2);

		var minPaypalFeesUsa;
		if((dollars - patreonFee - maxFees)>=50){
			minPaypalFeesUsa = (1).toFixed(2);
		} else {
			minPaypalFeesUsa = ((dollars - patreonFee - maxFees) * 0.02).toFixed(2);
		}
		var maxPaypalFeesUsa;
		if((dollars - patreonFee - minFees)>=50){
			maxPaypalFeesUsa = (1).toFixed(2);
		} else {
			maxPaypalFeesUsa = ((dollars - patreonFee - minFees) * 0.02).toFixed(2);
		}

		var minPaypalFeesInt;
		if((dollars - patreonFee - maxFees)>=1000){
			minPaypalFeesInt = (20).toFixed(2);
		} else {
			minPaypalFeesInt = ((dollars - patreonFee - maxFees) * 0.02).toFixed(2);
		}
		var maxPaypalFeesInt;
		if((dollars - patreonFee - minFees)>=1000){
			maxPaypalFeesInt = (20).toFixed(2);
		} else {
			maxPaypalFeesInt = ((dollars - patreonFee - minFees) * 0.02).toFixed(2);
		}

		var minTotal = (dollars - patreonFee - maxFees - maxPaypalFeesInt).toFixed(2);
		var maxTotal = (dollars - patreonFee - minFees - minPaypalFeesUsa).toFixed(2);

		var minTotalEur = (fx.convert(minTotal, {from: "USD", to: "EUR"})).toFixed(2);
		var maxTotalEur = (fx.convert(maxTotal, {from: "USD", to: "EUR"})).toFixed(2);

		$("#totalEarnings").parent().append("<div><p style='font-size:28px;margin-top:32px;'>minus <span class='headorange'>Patreon fee</span></p><p style='font-size:32px;line-height:54px;'>$"+patreonFee+"</p><p style='font-size:28px;margin-top:10px;'>minus <span class='headorange'>credit card fees</span></p><p style='font-size:32px;line-height:54px;'>$"+minFees+" <span style='font-size:28px;'>to</span> $"+maxFees+"</p><p style='font-size:28px;margin-top:10px;'>minus <span class='headorange'>transaction costs</span></p><p style='font-size:32px;line-height:54px;border-bottom:1px solid #cdcdcd'>$"+minPaypalFeesUsa+" <span style='font-size:28px;'>to</span> $"+maxPaypalFeesInt+"</p><p style='font-size:28px;margin-top:30px;'>for a <span class='headorange'>grand total</span> of</p><p style='font-size:32px;line-height:54px;'>$"+minTotal+" <span style='font-size:28px;'>to</span> $"+maxTotal+"</p><p style='font-size:32px;line-height:22px;margin-bottom:15px;'>&euro;"+minTotalEur+" <span style='font-size:28px;'>to</span> &euro;"+maxTotalEur+"</p></div>");
		$(".inner.bottom").children().children().children('.numfooter').children('.headorange').append('<span style="color:#333">,</span>');
		$(".inner.bottom").children().children().children('.numfooter').eq(1).append('<div style="font-size:22px;line-height:25px;text-decoration:underline;">assuming that <span class="headorange">every pledge</span> is collected successfully, and</div><div style="font-size:28px;line-height:32px;text-decoration:underline;"><span class="headorange">BEFORE TAXES</span>!</div>');
		$(".inner.bottom").append('<div style="margin-top:15px;"><small>Calculations by <a href="#">TruePatreon</a></small></div>');
	});
}