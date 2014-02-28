/*!
RDBL.js
v1.0
Copyright (c) 2014 Kezz Bracey (https://plus.google.com/103208006520277578989)
MIT style license

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

var $target_el;
var $min_rdbl_chx = 63;
var $max_rdbl_chx = 81;
var $el_chxperline;
var $base_fontsize;
var $el_fontsize;
var $body_width_px;
var $body_width_em;
var $el_width_px;
var $el_width_em;
var $stylesheets;

function init_rdbl(min_rdbl_chx, max_rdbl_chx){

	$min_rdbl_chx = typeof min_rdbl_chx !== 'undefined' ? min_rdbl_chx : $min_rdbl_chx;

	$max_rdbl_chx = typeof max_rdbl_chx !== 'undefined' ? max_rdbl_chx : $max_rdbl_chx;

	var nouislidercss = '.noUi-target,.noUi-target *{-webkit-touch-callout:none;-webkit-user-select:none;-ms-touch-action:none;-ms-user-select:none;-moz-user-select:none;-moz-box-sizing:border-box;box-sizing:border-box}.noUi-base{width:100%;height:100%;position:relative}.noUi-origin{position:absolute;right:0;top:0;left:0;bottom:0}.noUi-handle{position:relative;z-index:1}.noUi-stacking .noUi-handle{z-index:10}.noUi-stacking+.noUi-origin{*z-index:-1}.noUi-state-tap .noUi-origin{-webkit-transition:left .3s,top .3s;transition:left .3s,top .3s}.noUi-state-drag *{cursor:inherit!important}.noUi-horizontal{height:18px}.noUi-horizontal .noUi-handle{width:20px;height:18px;left:-17px;top:-5px}.noUi-horizontal.noUi-extended{padding:0 15px}.noUi-horizontal.noUi-extended .noUi-origin{right:-15px}.noUi-vertical{width:18px}.noUi-vertical .noUi-handle{width:28px;height:34px;left:-6px;top:-17px}.noUi-vertical.noUi-extended{padding:15px 0}.noUi-vertical.noUi-extended .noUi-origin{bottom:-15px}.noUi-background{background:#FAFAFA;box-shadow:inset 0 1px 1px #f0f0f0}.noUi-connect{background:#3FB8AF;box-shadow:inset 0 0 3px rgba(51,51,51,.45);-webkit-transition:background 450ms;transition:background 450ms}.noUi-origin{border-radius:2px}.noUi-target{border-radius:4px;border:1px solid #D3D3D3;box-shadow:inset 0 1px 1px #F0F0F0,0 3px 6px -5px #BBB}.noUi-target.noUi-connect{box-shadow:inset 0 0 3px rgba(51,51,51,.45),0 3px 6px -5px #BBB}.noUi-dragable{cursor:w-resize}.noUi-vertical .noUi-dragable{cursor:n-resize}.noUi-handle{border:1px solid #D9D9D9;border-radius:3px;background:#FFF;cursor:default;box-shadow:inset 0 0 1px #FFF,inset 0 1px 7px #EBEBEB,0 3px 6px -3px #BBB}.noUi-active{box-shadow:inset 0 0 1px #FFF,inset 0 1px 7px #DDD,0 3px 6px -3px #BBB}.noUi-handle:after,.noUi-handle:before{content:"";display:block;position:absolute;height:8px;width:1px;background:#E8E7E6;left:7px;top:4px}.noUi-handle:after{left:10px}.noUi-vertical .noUi-handle:after,.noUi-vertical .noUi-handle:before{width:14px;height:1px;left:6px;top:14px}.noUi-vertical .noUi-handle:after{top:17px}[disabled] .noUi-connect,[disabled].noUi-connect{background:#B8B8B8}[disabled] .noUi-handle{cursor:not-allowed}.noUi-state-blocked .noUi-connect,.noUi-state-blocked.noUi-connect{background:#4FDACF}';
	
	// var css = 'h1 { background: red; }',
	var head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = nouislidercss;
	} else {
		style.appendChild(document.createTextNode(nouislidercss));
	}

	head.appendChild(style);

	rdbl_display = '<div id="html_width_slider" style="position:absolute;top:10px;left:10px;right:10px;z-index:40000;height:10px;"></div>';

	rdbl_display += '<div id="rdbl_display" style="z-index:40000;position:absolute;top:40px;left:10px;width:300px;padding:10px;height:auto;background:rgba(255,255,255,0.95);border:1px solid #ccc;font-family:Arial !important;font-size:11px !important;-webkit-box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.5);box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.5);">';

	rdbl_display += '<div id="rdbl_warning"></div><p>Target Content Element: <input style="display:inline;font-family:Arial !important;font-size:11px !important;" id="rdbl_tgt_el"></input></p>';

	rdbl_display += '<p>Characters Per Line Range: <input style="display:inline;width:20px;font-family:Arial !important;font-size:11px !important;" id="rdbl_chx_min"></input> - <input style="display:inline;width:20px;font-family:Arial !important;font-size:11px !important;" id="rdbl_chx_max"></input></p>';

	rdbl_display += '<p>Current Characters Per Line: <span class="highlight" id="rdbl_chx_perline"></span></p>';

	rdbl_display += '<div style="border-bottom:1px solid #ccc;"></div>';

	rdbl_display += '<p>Current Document Width em: <span class="highlight" id="rdbl_body_widthem"></span></p>';

	rdbl_display += '<p>Media query code: <input style="display:inline;font-family:Arial !important;font-size:11px !important;" id="rdbl_media_query"></input></p>';

	rdbl_display += '<p>Current Document Width px: <span class="highlight" id="rdbl_body_widthpx"></span></p>';

	rdbl_display += '<p>Base Font Size: <span id="rdbl_base_fontsize"></span></p>';

	rdbl_display += '<div style="border-bottom:1px solid #ccc;"></div>';

	rdbl_display += '<p>Estimated Readable EM Range: <span id="est_em_range"></span>';

	rdbl_display += '<p>Current Element Width em: <span class="highlight" id="rdbl_widthem"></span></p>';

	rdbl_display += '<p>Target Element Width px: <span class="highlight" id="rdbl_widthpx"></span></p>';

	rdbl_display += '<p>Target Element Font Size: <span id="rdbl_fontsize"></span></p>';

	rdbl_display += '<div style="border-bottom:1px solid #ccc;"></div>';

	rdbl_display += '<p style="font-size:12px;font-weight:bold;">Readability: <span id="rdbl_status"></span></p>';

	rdbl_display += '</div>';

	jQuery('body').prepend(rdbl_display);

	jQuery('#html_width_slider').noUiSlider({
		range: [ 1, 100 ],
		start: [ 100 ],
		handles: 1,
		slide: function(){
			if (jQuery(this).val() < 100){
				jQuery("html").css({
					"width": jQuery(this).val() + "%",
					"position": "relative",
					"margin-left": "auto",
					"margin-right": "auto",
					"-webkit-box-shadow": "0px 0px 4px 0 rgba(0,0,0,0.5)",
					"box-shadow": "0px 0px 4px 0 rgba(0,0,0,0.5)"
				});
			} else {
				jQuery("html").removeAttr('style');
			}
			rdbl_set_values();
			highlightChanged();

			for(var q in media_query){

				var this_min_width = media_query[q].min_width;
				var this_max_width = media_query[q].max_width;

				if ( this_max_width !== null && this_min_width === null && jQuery("html").width() < this_max_width ) {

					jQuery('#media_' + q).html(media_query[q].add_rules);

				} else if (this_max_width === null && this_min_width !== null && jQuery("html").width() > this_min_width) {

					jQuery('#media_' + q).html(media_query[q].add_rules);

				} else if (this_max_width !== null && this_min_width !== null && jQuery("html").width() < this_min_width && jQuery("html").width() > this_min_width) {

					jQuery('#media_' + q).html(media_query[q].add_rules);

				} else {
					jQuery('#media_' + q).html('');
				}
			}
		}
	}).change( function(){
		removeHighlight();
	});

	default_rdbl_target = ['article', 'section', 'main'];
	no_el_warning = '<p style="color:#C00;">Enter the ID / class / tag  of your target element below including any "." or "#", (can\'t use body tag).</p>';

	for (var tgt in default_rdbl_target){
		$target_el = jQuery('body '+ default_rdbl_target[tgt] +':first-of-type');
		if ($target_el.length > 0){
			jQuery('#rdbl_tgt_el').val(default_rdbl_target[tgt]);
			rdbl_set_values();
			jQuery('#est_em_range').html(est_em_range());
			break;
		} else {
			if(tgt == (default_rdbl_target.length-1)){
				jQuery('#rdbl_warning').html(no_el_warning);
			}
		}
	}

	jQuery('#rdbl_chx_min').on('input', function() {
		$min_rdbl_chx = jQuery(this).val();
		rdbl_set_values();
	});

	jQuery('#rdbl_chx_max').on('input', function() {
		$max_rdbl_chx = jQuery(this).val();
		rdbl_set_values();
	});

	jQuery('#rdbl_tgt_el').on('input', function() {
		entered = jQuery(this).val();
		if(entered.length > 1){
			$target_el = jQuery(entered);

			if ($target_el.length > 0){
				jQuery('#rdbl_tgt_el').val(entered);
				jQuery('#rdbl_warning').html('');
				rdbl_set_values();
				jQuery('#est_em_range').html(est_em_range());
			}

		} else {
			jQuery('#rdbl_warning').html(no_el_warning);
		}
	});



	$stylesheets = document.styleSheets;

	var media_query = {};

	var count_queries = 0;

	for (var i in $stylesheets){

		var css_rules = $stylesheets[i].cssRules;

		for (var r in css_rules){

			var media = css_rules[r].media;

			if (typeof media !== 'undefined'){

				var strip_mediaText = media.mediaText.replace(/\s+/g, '');

				var max_width = strip_mediaText.match(/max-width:[^\(\r\n]*\)/g);

				if (max_width !== null){

					max_width = max_width[0].replace('max-width:', '');
					max_width = max_width.replace('em)', '');

					max_width = max_width * parseInt($base_fontsize);
				}

				var min_width = strip_mediaText.match(/min-width:[^\(\r\n]*\)/g);

				if (min_width !== null){

					min_width = min_width[0].replace('min-width:', '');
					min_width = min_width.replace('em)', '');

					min_width = min_width * parseInt($base_fontsize);

				}

				var media_rules = css_rules[r].cssRules;

				jQuery('head').append('<style id="media_' + count_queries + '"></style>');

				var add_rules = "";

				for (var m in media_rules){

					var media_rule_text = media_rules[m].cssText;

					if (typeof media_rule_text !== 'undefined'){

						add_rules += media_rule_text;

					}
				}

				media_query[count_queries] = {'max_width': max_width, 'min_width': min_width, 'add_rules': add_rules};

				count_queries++;

			}

		}

	}

}

function rdbl_set_values(){

	jQuery('#rdbl_chx_min').val($min_rdbl_chx);

	jQuery('#rdbl_chx_max').val($max_rdbl_chx);

	jQuery('#rdbl_chx_perline').html(rdbl_avg_chx_line());

	jQuery('#rdbl_fontsize').html(rdbl_get_font_size());

	jQuery('#rdbl_base_fontsize').html(rdbl_get_base_font_size());

	jQuery('#rdbl_body_widthpx').html(rdbl_get_body_width_px());

	var body_ems = rdbl_get_body_width_em();

	jQuery('#rdbl_body_widthem').html(body_ems);

	jQuery('#rdbl_media_query').val('@media (max-width: ' + body_ems + 'em) { /*...*/ }');

	jQuery('#rdbl_widthpx').html(rdbl_get_width_px());

	jQuery('#rdbl_widthem').html(rdbl_get_width_em());

	jQuery('#rdbl_status').html(rdbl_status());

}

function highlightChanged(){
	jQuery('.highlight').css('background-color', '#FF0');
}

function removeHighlight(){
	jQuery('.highlight').css('background-color', 'none');
}

function rdbl_set_body_values(){
	jQuery('#rdbl_body_widthpx').html(rdbl_get_body_width_px());
	jQuery('#rdbl_body_widthem').html(rdbl_get_body_width_em());	
}

function rdbl_avg_chx_line(){
	var firstpar = jQuery($target_el).children('p:first');
	var text = firstpar.html();
	var parheight = firstpar.height();
	var paroffset = Math.floor( firstpar.offset().top );
	var lineheight = parseInt(firstpar.css('line-height'));
	var linecount = parheight / lineheight;
	var full_linecount = ( linecount > 1) ? (linecount - 1) : linecount;
	var trimafter = full_linecount * lineheight + paroffset;
	words = text.split(" ");
	replacepar = "";
	for (var i = 0; i < words.length; i++) {
		replacepar += '<span class="getoffset">' + words[i] + '</span> ';
	}
	firstpar.html(replacepar);
	var full_lines = "";
	jQuery('.getoffset').each(function( index ) {
		this_top = Math.floor( $( this ).position().top );
		word = $( this ).html();
		if ( this_top < trimafter ){
			full_lines += $( this ).html() + " ";
		}
	});
	total_chx = full_lines.length;
	$el_chxperline = Math.floor(total_chx / full_linecount);
	firstpar.html(text);
	return $el_chxperline;
}

function rdbl_get_font_size(){
	$el_fontsize = $target_el.css('font-size');
	return $el_fontsize;
}

function rdbl_get_width_px(){
	$el_width_px = $target_el.css('width');
	return $el_width_px;
}

function rdbl_get_width_em(){
	$el_width_em = parseInt($el_width_px) / parseInt($el_fontsize);
	$el_width_em = Math.floor($el_width_em * 1000) / 1000;
	return $el_width_em;
}

function rdbl_get_base_font_size(){
	$base_fontsize = jQuery('body').css('font-size');
	return $base_fontsize;
}

function rdbl_get_body_width_px(){
	$body_width_px = jQuery('body').css('width');
	return $body_width_px;
}

function rdbl_get_body_width_em(){
	$body_width_em = parseInt($body_width_px) / parseInt($base_fontsize);
	$body_width_em = Math.floor($body_width_em * 1000) / 1000;
	return $body_width_em;
}

function est_em_range(){
	em_per_chx = $el_width_em / $el_chxperline;
	est_em_min = em_per_chx * $min_rdbl_chx;
	est_em_max = em_per_chx * $max_rdbl_chx;
	return (Math.floor(est_em_min * 1000) / 1000) + 'em - ' + (Math.floor(est_em_max * 1000) / 1000) + 'em';
}

function rdbl_status(){
	if ($el_chxperline < $min_rdbl_chx){
		return '<span style="font-weight:bold;background-color:#C00;color:#FFF;">&nbsp;TOO NARROW&nbsp;</span>';
	} else if ($el_chxperline > $max_rdbl_chx){
		return '<span style="font-weight:bold;background-color:#C00;color:#FFF;">&nbsp;TOO WIDE&nbsp;</span>';
	} else {
		return '<span style="font-weight:bold;background-color:#72BF00;color:#FFF;">&nbsp;IN RANGE&nbsp;</span>';
	}
}