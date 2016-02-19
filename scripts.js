var wordmark = document.querySelector('.rainbow-wordmark');

var wordmarkImg = wordmark.querySelector('.rainbow-wordmark__image');
var canvas = wordmark.querySelector('.rainbow-wordmark__canvas');
var ctx = canvas.getContext('2d');
var trailCount = 20;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// ----- load image ----- //

var whiteImg = new Image();
whiteImg.onload = onWhiteImgLoad;
whiteImg.src = 'pics/bi.png';

function onWhiteImgLoad() {
  setColorCanvas( 'red', '#AA333F' );
  setColorCanvas( 'purple', '#A68390' );
  setColorCanvas( 'green', '#39421F' );
  setColorCanvas( 'orange', '#806227' );
  animate();
}

var colorCanvases = {};

// get a canvas with the logotype rendered in a color
function setColorCanvas( name, color ) {
  var colorCanvas = document.createElement('canvas');
  colorCanvas.width = whiteImg.width;
  colorCanvas.height = whiteImg.height;
  var colorCtx = colorCanvas.getContext('2d');
  colorCtx.drawImage( whiteImg, 0, 0 );
  colorCtx.globalCompositeOperation = 'source-in';
  colorCtx.fillStyle = color;
  colorCtx.fillRect( 0, 0, whiteImg.width, whiteImg.height );
  colorCanvases[ name ] = colorCanvas;
}

// ----- animate rainbow ----- //

var isHovering;
var t = 0;

var rainbow = [];
(function() {
  for ( var i=0; i < trailCount; i++ ) {
    rainbow.push(null);
  }
})();

wordmarkImg.onmouseenter = function() {
  isHovering = true;
};

wordmarkImg.onmouseleave = function() {
  isHovering = false;
};

var colorCycle = [ 'red', 'purple', 'green', 'orange' ];

function animate() {
  update();
  render();
  requestAnimationFrame( animate );
}

function update() {
  t++;


  var colorCycleIndex = Math.floor( t / 8 ) % 4;
  var nextColor = isHovering ? colorCycle[ colorCycleIndex ] : null;

  rainbow.pop();
  rainbow.pop();
  rainbow.pop();
  rainbow.unshift( nextColor );
  rainbow.unshift( nextColor );
  rainbow.unshift( nextColor );
}

function render() {
  ctx.clearRect( 0, 0, canvasWidth, canvasHeight );

  // iterate backwards through rainbow
  for ( var i = rainbow.length-1; i >= 0; i-- ) {
    var color = rainbow[i];
    if ( color ) {
      ctx.drawImage( colorCanvases[ color ], i+1, i+1 );
    }
  }
}

TweenMax.to(".logoRight", 2, {right:285});
TweenMax.to(".logoLeft", 2, {left:20});
TweenMax.to(".logoLeftLess", 1, {left:320});
TweenMax.to(".logoLeftLess1", 1, {left:20});


// var projectImage = $('#image2');
// projectImage.hover(function(){
// 	projectImage.attr("src","pics/dogeKu.jpg");
// }, function(){projectImage.attr("src","pics/dogeKu1.png")});



// // var scale_tween = TweenMax.to('#scale-animation', 1, {
// //   transform: 'scale(.75)',
// //   ease: Linear.easeNone
// // });





var	$parent = $("#main"),
		$aside = $("#aside"),
		$asideTarget = $aside.find(".aside--details"),
		$asideClose = $aside.find(".close"),
		$tilesParent = $(".tiles-a"),
		$tiles = $tilesParent.find("a"),		slideClass = "show-detail";

		// tile click
		$tiles.on("click", function(e){
			e.preventDefault();
			e.stopPropagation();
			if(!$("html").hasClass(slideClass)){
				$tiles.removeClass("active");
				$(this).addClass("active");
				$(this).attr("aria-expanded","true");
				loadTileData($(this));
			}else{
				killAside();
				$(this).attr("aria-expanded","false");
			}
		});

		// kill aside
		$asideClose.on("click", function(e){
			e.preventDefault();
			killAside();
		});

		// load data to aside
		function loadTileData(target){
			var $this = $(target),
					itemHtml = $this.find(".details").html();
					$asideTarget.html(itemHtml);
					showAside();
		}

		// show/hide aside
		function showAside(){
			if(!$("html").hasClass(slideClass)){
				$("html").toggleClass(slideClass);
				$aside.attr("aria-hidden","false");
				focusCloseButton();
			}
		}
		
		// handle esc key
		window.addEventListener("keyup", function(e){

			// grab key pressed
			var code = (e.keyCode ? e.keyCode : e.which);
			
			// escape
			if(code === 27){
				killAside();
			}

		}, false);

		// kill aside
		function killAside(){
			if($("html").hasClass(slideClass)){
				$("html").removeClass(slideClass);
				sendFocusBack();
				$aside.attr("aria-hidden","true");
				$tiles.attr("aria-expanded","false");
			}
		}

		// send focus to close button
		function focusCloseButton(){
			$asideClose.focus();	
		}

		// send focus back to item that triggered event
		function sendFocusBack(){
			$(".active").focus();
		}

		// handle body click to close off-canvas
		$parent.on("click",function(e){
			if($("html").hasClass(slideClass)){
				killAside();
			}
		});
