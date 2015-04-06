// Concept, script and CSS copyright CBT Limited
// Author	CBT Limited, London, UK
// Version	3.0.9
// See license at http://razor-cloud.com/razor/License.html
// See http://api.jquery.com/jQuery.getJSON/
// See https://github.com/jquery/globalize/tree/master/lib
// See https://github.com/jquery/globalize#why
// See http://wiki.jqueryui.com/w/page/39118647/Globalize
// See http://www.codeproject.com/Articles/152732/Exploring-Globalization-with-jQuery
// See http://www.ibm.com/developerworks/opensource/library/os-jquerynewpart1/index.html
// See http://www.bytelevelbooks.com/code/javascript/
//
//  Format rules are
//	the optional string format is the number of characters in the string
//	
//	and the allowed number format values are:
//	    n for number
//	    d for decimal digits
//	    p for percentage
//	    c for currency
//		with an optional digit appended to show the number of decimal places:
//		
//		value	format	result
//		123.45	n		123.45
//		123.45	n0		123
//		123.45	n1		123.5
//		123.45	d		123
//		12		d3		012
//		123.45	c		$123.45
//		123.45	c0		$123
//		123.45	c1		$123.5
//		-123.45	c		($123.45)
//		0.12345	p		12.35 %
//		0.12345	p0		12 %
//		0.12345	p4		12.3450 %
//
//	and allowed date format values with en-US results are:
//	
//		format	description				result
//		f 		Long Date, Short Time 	dddd, MMMM dd, yyyy h:mm tt
//		F 		Long Date, Long Time 	dddd, MMMM dd, yyyy h:mm:ss tt
//		t 		Short Time 				h:mm tt
//		T 		Long Time 				h:mm:ss tt
//		d 		Short Date 				M/d/yyyy
//		D 		Long Date 				dddd, MMMM dd, yyyy
//		Y 		Month/Year 				MMMM, yyyy
//		M 		Month/Day 				yyyy MMMM

var cmap = new Object();
cmap.AED="ar-AE";
cmap.AFN="fa-AF";
cmap.ALL="sq-AL";
cmap.AMD="hy-AM";
cmap.ANG="nl-AN";
cmap.AOA="pt-AO";
cmap.ARS="es-AR";
cmap.AUD="en-AU";
cmap.AWG="nl-AW";
cmap.AZN="az-AZ";
cmap.BAM="bs-BA";
cmap.BBD="en-BB";
cmap.BDT="bn-BD";
cmap.BGN="bg-BG";
cmap.BHD="ar-BH";
cmap.BIF="fr-BI";
cmap.BMD="en-BM";
cmap.BND="ms-BN";
cmap.BOB="es-BO";
cmap.BRL="pt-BR";
cmap.BSD="en-BS";
cmap.BTN="dz-BT";
cmap.BWP="en-BW";
cmap.BYR="be-BY";
cmap.BZD="en-BZ";
cmap.CAD="en-CA";
cmap.CDF="fr-CD";
cmap.CHF="de-CH";
cmap.CLP="es-CL";
cmap.CNY="zh-CN";
cmap.COP="es-CO";
cmap.CRC="es-CR";
cmap.CUP="es-CU";
cmap.CVE="pt-CV";
cmap.CZK="cs-CZ";
cmap.DJF="fr-DJ";
cmap.DKK="da-DK";
cmap.DOP="es-DO";
cmap.DZD="ar-DZ";
cmap.EGP="ar-EG";
cmap.ERN="aa-ER";
cmap.ETB="am-ET";
cmap.EUR="ca-AD";
cmap.FJD="en-FJ";
cmap.FKP="en-FK";
cmap.GBP="en-GB";
cmap.GEL="ka-GE";
cmap.GHS="en-GH";
cmap.GIP="en-GI";
cmap.GMD="en-GM";
cmap.GNF="fr-GN";
cmap.GTQ="es-GT";
cmap.GYD="en-GY";
cmap.HKD="zh-HK";
cmap.HNL="es-HN";
cmap.HRK="hr-HR";
cmap.HTG="ht-HT";
cmap.HUF="hu-HU";
cmap.IDR="id-ID";
cmap.ILS="ar-IL";
cmap.INR="en-IN";
cmap.IQD="ar-IQ";
cmap.IRR="fa-IR";
cmap.ISK="is-IS";
cmap.JMD="en-JM";
cmap.JOD="ar-JO";
cmap.JPY="ja-JP";
cmap.KES="en-KE";
cmap.KGS="ky-KG";
cmap.KHR="km-KH";
cmap.KMF="ar-KM";
cmap.KPW="ko-KP";
cmap.KRW="ko-KR";
cmap.KWD="ar-KW";
cmap.KYD="en-KY";
cmap.KZT="kk-KZ";
cmap.LAK="lo-LA";
cmap.LBP="ar-LB";
cmap.LKR="si-LK";
cmap.LRD="en-LR";
cmap.LSL="en-LS";
cmap.LTL="lt-LT";
cmap.LVL="lv-LV";
cmap.LYD="ar-LY";
cmap.MAD="ar-EH";
cmap.MDL="ro-MD";
cmap.MGA="fr-MG";
cmap.MKD="mk-MK";
cmap.MMK="my-MM";
cmap.MNT="mn-MN";
cmap.MOP="zh-MO";
cmap.MRO="ar-MR";
cmap.MUR="en-MU";
cmap.MVR="dv-MV";
cmap.MWK="ny-MW";
cmap.MXN="es-MX";
cmap.MYR="ms-MY";
cmap.MZN="pt-MZ";
cmap.NAD="en-NA";
cmap.NGN="en-NG";
cmap.NIO="es-NI";
cmap.NOK="no-BV";
cmap.NPR="ne-NP";
cmap.NZD="en-CK";
cmap.OMR="ar-OM";
cmap.PAB="es-PA";
cmap.PEN="es-PE";
cmap.PGK="en-PG";
cmap.PHP="tl-PH";
cmap.PKR="ur-PK";
cmap.PLN="pl-PL";
cmap.PYG="es-PY";
cmap.QAR="ar-QA";
cmap.RON="ro-RO";
cmap.RSD="cu-CS";
cmap.RUB="ru-RU";
cmap.RWF="rw-RW";
cmap.SAR="ar-SA";
cmap.SBD="en-SB";
cmap.SCR="en-SC";
cmap.SDG="ar-SD";
cmap.SEK="sv-SE";
cmap.SGD="cm-SG";
cmap.SHP="en-SH";
cmap.SLL="en-SL";
cmap.SOS="so-SO";
cmap.SRD="nl-SR";
cmap.SSP="en-SS";
cmap.STD="pt-ST";
cmap.SYP="ar-SY";
cmap.SZL="en-SZ";
cmap.THB="th-TH";
cmap.TJS="tg-TJ";
cmap.TMT="tk-TM";
cmap.TND="ar-TN";
cmap.TOP="to-TO";
cmap.TRY="tr-TR";
cmap.TTD="en-TT";
cmap.TWD="zh-TW";
cmap.TZS="sw-TZ";
cmap.UAH="uk-UA";
cmap.UGX="en-UG";
cmap.USD="en-AS";
cmap.UYU="es-UY";
cmap.UZS="uz-UZ";
cmap.VEF="es-VE";
cmap.VND="vi-VN";
cmap.VUV="bi-VU";
cmap.WST="sm-WS";
cmap.XAF="en-CF";
cmap.XCD="en-AG";
cmap.XOF="fr-BF";
cmap.XPF="fr-NC";
cmap.YER="ar-YE";
cmap.ZAR="en-ZA";
cmap.ZMK="en-ZM";
cmap.ZWL="en-ZW";

function culture(currency) {
	return eval("cmap." + currency);
}

function jsonURL() {
	return "https://razor-cloud.com/razor/JSONService?callback=?";
}

function localize(callback) {
	$.getJSON(jsonURL(), {
		service : "culture"
	},
	function(data) {
		Globalize.culture(data.culture);
		if (callback && typeof(callback) === "function") {callback(data);}
	})
	.error(function(data) {console.log("culture error");});
};

var datetime = new RegExp("y|m|d|f|t|s","i");
var number = new RegExp("c|d|n|p","i");
var space = new RegExp("_","i");

function formatted (value, format, culture) {
	if (format) {
		var type = typeof format;
		if (type == "string") {
			if (format.match(datetime)) {return Globalize.format(new Date(value), format);}
			else if (format.match(number)) {return "<div class='number'>" + Globalize.format(value, format, culture) + "</div>";}
			else if (format.match(space)) {return value ? value.replace("_"," ") : "";}
			else return Globalize.format(value, format);
		}
		else if (type == "number") {return value ? value.substring(0,format) : "";}
		else {return value ? value : "";}
	}
	else return value ? value : "";
}

function dateFormat(f) {
	var format = eval("Globalize.culture().calendars.standard.patterns." + f);
	format = format.replace("dd","d");
	format = format.replace("mm","m");
	format = format.replace("MM","M");
	if (f == "d") {format = format.replace("M","m");}
	return format.replace("yyyy","yy");
}

function getURLParameter(name) {
	//divide the URL in half at the '?'
	var urlHalves = String(document.location).split('?');
	var urlVarValue = '';
	if(urlHalves[1]){
		//load all the name/value pairs into an array
		var urlVars = urlHalves[1].split('&');
		//loop over the list, and find the specified url variable
		var i=0;
		for(i; i<=(urlVars.length); i++){
			if(urlVars[i]){
				//load the name/value pair into an array
				var urlVarPair = urlVars[i].split('=');
				if (urlVarPair[0] && urlVarPair[0] == name) {
					//I found a variable that matches, load it's value into the return variable
					urlVarValue = urlVarPair[1];
				}
			}
		}
	}
	return urlVarValue;   
}

function language() {
	if (!navigator) { return null; }
	return navigator.language || 
	navigator.browserLanguage ||
	navigator.systemLanguage || 
	navigator.userLanguage || 
	null; 
}
