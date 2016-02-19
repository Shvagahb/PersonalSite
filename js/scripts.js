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

// TweenMax.to(".logoRight", 2, {right:285});
// TweenMax.to(".logoLeft", 2, {left:20});
// TweenMax.to(".logoLeftLess", 1, {left:320});
// TweenMax.to(".logoLeftLess1", 1, {left:20});

// // BG Animation Setup
// // .to('@target', @length, {@object})
// var bg_tween = TweenMax.to('#bg-trigger', 1, {
//   backgroundColor: '#000',
//   ease: Linear.easeNone
// });


// var controller = new ScrollMagic.Controller();

// // Background Scene
// var bg_scene = new ScrollMagic.Scene({
//   triggerElement: '#bg-trigger'
// })
// .setTween(bg_tween);

// controller.addScene([
//   bg_scene

// ]);



// Controller
var controller = new ScrollMagic.controller();
var bg_scene = new ScrollMagic.Scene({

triggerElement: '#trigger1'
}).setTween('#animate1', 1, {backgroundColor: 'black'})
// addTo.(controller);


// 2. Curtain Timeline
// var tlCurtain = new TimelineMax();
//     tlCurtain.set($curtain, {yPercent: -100})
//     .to($curtain, 0.3, {yPercent: 0, ease:Power4.easeOut})
//     .to([tomatoLeft2, tomatoLeaves2, tomatoRight2, letters2, bracketRight2, bracketLeft2], 0.01, {fill: "#707070"})
//     .to($curtain, 0.3, {yPercent: -100, ease:Power4.easeOut})
 
// // 2. Curtain Scene
// var scene = new ScrollScene({triggerElement: "#screen2 .imacInner"})
//     .addTo(controller)
//     .setTween(tlCurtain);


// var projectImage = $('#image');
// projectImage.hover(function(){
// 	projectImage.attr("src","pics/GScore.png");
// }, function(){projectImage.attr("src","pics/GScore2.png")});


// var projectImage = $('#image2');
// projectImage.hover(function(){
// 	projectImage.attr("src","pics/dogeKu.jpg");
// }, function(){projectImage.attr("src","pics/dogeKu1.png")});



// // var scale_tween = TweenMax.to('#scale-animation', 1, {
// //   transform: 'scale(.75)',
// //   ease: Linear.easeNone
// // });





// // new ScrollMagic.Scene({
// //         duration: 100,    // the scene should last for a scroll distance of 100px
// //         offset: 100        // start this scene after scrolling for 50px
// //     })
// //     .setPin("#my-sticky-element") // pins the element for the the scene's duration
// //     .addTo(controller); // assign the scene to the controller


// // $(function() {
// //     $(window).scroll( function(){
    
       
// //         $('.fadeInBlock').each( function(i){
            
// //             var bottom_of_object = $(this).position().top + $(this).outerHeight();
// //             var bottom_of_window = $(window).scrollTop() + $(window).height();
            
//              Adjust the "200" to either have a delay or that the content starts fading a bit before you reach it  
//             bottom_of_window = bottom_of_window + 200;  
          
//             if( bottom_of_window > bottom_of_object ){
                
//                 $(this).animate({'opacity':'1'},500);
                    
//             }
//         }); 
    
//     });
// });
