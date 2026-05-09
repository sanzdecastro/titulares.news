var TITULARES_JSON = 'https://raw.githubusercontent.com/sanzdecastro/media-headlines/refs/heads/main/titulares.json';

var MEDIA_MAP = {
  'El País':         '.elpais',
  'El Mundo':        '.elmundo',
  'El Español':      '.elespanol',
  'ABC':             '.abc',
  'La Razón':        '.razon',
  'El Confidencial': '.confidencial',
  '20minutos':       '.minutos',
  'La Vanguardia':   '.vanguardia',
  'El Diario':       '.eldiario',
  'El Periódico':    '.periodico',
  'Público':         '.publico',
  'Infolibre':       '.infolibre',
};

function getelement() {
  fetch(TITULARES_JSON)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      data.forEach(function(item) {
        var selector = MEDIA_MAP[item.media];
        if (selector) {
          $(selector + ' h2').html(item.headline);
        }
      });
    })
    .catch(function(err) { console.error('Error cargando titulares:', err); });
}
 

function orderRandom() {
    var cards = $(".new-container");
    for(var i = 0; i < cards.length; i++){
        var target = Math.floor(Math.random() * cards.length -1) + 1;
        var target2 = Math.floor(Math.random() * cards.length -1) +1;
        cards.eq(target).before(cards.eq(target2));
    }
}

function dragView() {
  var element = document.getElementById('drag')
    var hammertime = new Hammer(element, {});

    hammertime.get('pinch').set({ enable: true });
    hammertime.get('pan').set({ threshold: 0 });

    var fixHammerjsDeltaIssue = undefined;
    var pinchStart = { x: undefined, y: undefined }
    var lastEvent = undefined;

    var originalSize = {
        width: 1000,
        height: 1000
    }

    var current = {
        x: 0,
        y: 0,
        z: .7,
        zooming: false,
        width: originalSize.width * 1,
        height: originalSize.height * 1,
    }

    var last = {
        x: current.x,
        y: current.y,
        z: current.z
    }

    function getRelativePosition(element, point, originalSize, scale) {
        var domCoords = getCoords(element);

        var elementX = point.x - domCoords.x;
        var elementY = point.y - domCoords.y;

        var relativeX = elementX / (originalSize.width * scale / 2) - 1;
        var relativeY = elementY / (originalSize.height * scale / 2) - 1;
        return { x: relativeX, y: relativeY }
    }

    function getCoords(elem) { // crossbrowser version
	    var box = elem.getBoundingClientRect();

	    var body = document.body;
	    var docEl = document.documentElement;

	    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	    var clientTop = docEl.clientTop || body.clientTop || 0;
	    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

	    var top  = box.top +  scrollTop - clientTop;
	    var left = box.left + scrollLeft - clientLeft;

	    return { x: Math.round(left), y: Math.round(top) };
	}

    function scaleFrom(zoomOrigin, currentScale, newScale) {
        var currentShift = getCoordinateShiftDueToScale(originalSize, currentScale);
        var newShift = getCoordinateShiftDueToScale(originalSize, newScale)

        var zoomDistance = newScale - currentScale
        
        var shift = {
        	x: currentShift.x - newShift.x,
        	y: currentShift.y - newShift.y,
        }

        var output = {
            x: zoomOrigin.x * shift.x,
            y: zoomOrigin.y * shift.y,
            z: zoomDistance
        }
        return output
    }

    function getCoordinateShiftDueToScale(size, scale){
    	var newWidth = scale * size.width;
        var newHeight = scale * size.height;
    	var dx = (newWidth - size.width) / 2
    	var dy = (newHeight - size.height) / 2
    	return {
    		x: dx,
    		y: dy
    	}
    }

    hammertime.on('pan', function(e) {
        if (lastEvent !== 'pan') {
            fixHammerjsDeltaIssue = {
                x: e.deltaX,
                y: e.deltaY
            }
        }

        current.x = last.x + e.deltaX - fixHammerjsDeltaIssue.x;
        current.y = last.y + e.deltaY - fixHammerjsDeltaIssue.y;
        lastEvent = 'pan';
        update();
        
    })    

    hammertime.on('pinch', function(e) {
        var d = scaleFrom(pinchZoomOrigin, last.z, last.z * e.scale)
        current.x = d.x + last.x + e.deltaX;
        current.y = d.y + last.y + e.deltaY;
        current.z = d.z + last.z;
        lastEvent = 'pinch';
        menuAnimation();
        update();
        
    })

    var pinchZoomOrigin = undefined;
    hammertime.on('pinchstart', function(e) {
        pinchStart.x = e.center.x;
        pinchStart.y = e.center.y;
        pinchZoomOrigin = getRelativePosition(element, { x: pinchStart.x, y: pinchStart.y }, originalSize, current.z);
        lastEvent = 'pinchstart';
        
    })

    hammertime.on('panend', function(e) {
        last.x = current.x;
        last.y = current.y;
        lastEvent = 'panend';
        
    })

    hammertime.on('pinchend', function(e) {
        last.x = current.x;
        last.y = current.y;
        last.z = current.z;
        lastEvent = 'pinchend';
        
    })

    function update() {
        current.height = originalSize.height * current.z;
        current.width = originalSize.width * current.z;
        element.style.transform = "translate3d(" + current.x + "px, " + current.y + "px, 0) scale(" + current.z + ")";
    }
  

    var myBlock = document.querySelector('.news-wrapper');
    
    // create a simple instance on our object
    var mc = new Hammer(myBlock);
    
    // add a "PAN" recognizer to it (all directions)
    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
    
    // tie in the handler that will be called
    mc.on("pan", handleDrag);
    
    // poor choice here, but to keep it simple
    // setting up a few vars to keep track of things.
    // at issue is these values need to be encapsulated
    // in some scope other than global.
    var lastPosX = 0;
    var lastPosY = 0;
    var isDragging = false;
    function handleDrag(ev) {
      
      // for convience, let's get a reference to our object
      var elem = ev.target;
      
      // DRAG STARTED
      // here, let's snag the current position
      // and keep track of the fact that we're dragging
      if ( ! isDragging ) {
        isDragging = true;
        lastPosX = elem.offsetLeft;
        lastPosY = elem.offsetTop;
        menuAnimation();
        removeMovementAbout();
      }
      
      // we simply need to determine where the x,y of this
      // object is relative to where it's "last" known position is
      // NOTE: 
      //    deltaX and deltaY are cumulative
      // Thus we need to always calculate 'real x and y' relative
      // to the "lastPosX/Y"
      var posX = ev.deltaX + lastPosX;
      var posY = ev.deltaY + lastPosY;
      
      // move our element to that position
      elem.style.left = posX + "px";
      elem.style.top = posY + "px";
      
      // DRAG ENDED
      // this is where we simply forget we are dragging
      if (ev.isFinal) {
        isDragging = false;
        menuAnimationBack();
        
      }
    }
}

function reload(){
  location.reload();
}

function refresh() {
  const refresh = document.querySelector(".refresh");
  
  refresh.addEventListener("click", reload);
}





function marquee() {
  
  function Marquee(selector, speed) {
    const parentSelector = document.querySelector(selector);
    const clone = parentSelector.innerHTML;
    const firstElement = parentSelector.children[0];
    let i = 0;
    console.log(firstElement);
  
    setInterval(function () {
      firstElement.style.marginLeft = `-${i}px`;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  }

    Marquee('.data-container', 0.2)

}

function menuAnimation() {
	
	var tlmenu = gsap.timeline();


	tlmenu.to("header", {
		yPercent: -100,
		ease:Power3.easeIn,
	});
	
}

function menuAnimationBack() {
	
	var tlmenu = gsap.timeline();


	tlmenu.to("header", {
		yPercent: 0,
		ease:Power3.easeIn,
	});
	
}

function newsAnimation() {
  var tlnew = gsap.timeline();

  tlnew.set(".new-wrapper", {
    autoAlpha: 0,
		ease:Power3.easeIn,
	});

  tlnew.set(".new-wrapper h2", {
		autoAlpha: 0,
		ease:Power3.easeIn,
	});

  tlnew.set(".new-wrapper .sup span", {
		autoAlpha: 1,
    yPercent: -100,
		ease:Power3.easeIn
	});

  tlnew.set(".new-wrapper .sup .red", {
		autoAlpha: 1,
    xPercent: -100,
		ease:Power3.easeIn
	});

  tlnew.to(".new-wrapper", {
		autoAlpha: 1,
    duration: .6,
    stagger: .05,
		ease:Power3.easeIn,
	}).to(".new-wrapper h2", {
		autoAlpha: 1,
    stagger: .05,
    duration: 1,
		ease:Power3.easeIn,
	}).to(".new-wrapper .sup span", {
		autoAlpha: 1,
    duration: .3,
    yPercent: 0,
		ease:Power3.easeIn,
	}).to(".new-wrapper .sup .red", {
		autoAlpha: 1,
    duration: .3,
    xPercent: 0,
		ease:Power3.easeIn,
	});
}

function addMovementAbout() {
  const about = document.querySelector(".moreinfo");
  about.classList.add("onabout");
  const newsWrapper = document.querySelector(".general-container");
  const newsWrapper2 = document.querySelector(".news-wrapper");
  newsWrapper.classList.add("hide");
  newsWrapper2.style.removeProperty('transform');
  newsWrapper2.style.removeProperty('top');
  newsWrapper2.style.removeProperty('left');
  

  var tlabout = gsap.timeline();
  tlabout.to(newsWrapper, {
    position: "fixed",
    bottom: "0vh",
    height: "30vh",
    ease:Power3.easeIn,
    duration: .5,
    borderRadius: "22px",
  })
}

function removeMovementAbout() {
  const about = document.querySelector(".moreinfo");
  about.classList.remove("onabout");
  
  const newsWrapper = document.querySelector(".general-container");
  newsWrapper.classList.remove("hide");
  var tlabout = gsap.timeline();
  tlabout.to(newsWrapper, {
    borderRadius: "0px",
    height: "100vh",
    width: "100vw",
    bottom: "0px",
    ease:Power3.easeIn,
    duration: .5,
    
  })
}

function showAbout() {
  const about = document.querySelector(".moreinfo");
  
  about.addEventListener("click", addMovementAbout);
  
}

function setreset() {
  const newsWrapper2 = document.querySelector(".news-wrapper");
  newsWrapper2.style.removeProperty('transform');
  newsWrapper2.style.removeProperty('top');
  newsWrapper2.style.removeProperty('left');
  
}

function reset() {
  const aboutcont = document.querySelector(".current-data");
  
  aboutcont.addEventListener("click", setreset);
  
}

function removeAbout() {
  const about = document.querySelector(".hide");
  
  about.addEventListener("click", removeMovementAbout);
  
}


window.onload = function() {
  const tlv = gsap.timeline({
    yoyo: true,
    repeatDelay: 0.4,
    onUpdate: changeIt
  });

  tlv.to(".loader", { duration: 5, height:"100vh", ease: "none" });
  let count = document.querySelectorAll(".theCountn");
  function changeIt() {
    newPercent = (this.progress() * 100).toFixed();
    count.forEach((obj, i) => {
      obj.textContent = newPercent +"%";
    });
  }

  function enterIn() {
    const tlend = gsap.timeline();
    gsap.set(".floatingchat-container-wrap-mobi", { autoAlpha: 0 });
    tlend.to(".loading", { autoAlpha: 0, duration: .2, PointerEvent: 'none', position: 'absolute' });
    gsap.to(".floatingchat-container-wrap-mobi", {  autoAlpha: 1 });
  }
  setTimeout(function() {
    
    getelement();
    enterIn();
    newsAnimation();
    gsap.set("header", { yPercent: -100 });
    gsap.to("header", { yPercent: 0 });
  }, 5000);
  
};



$(document).ready(function () {
  dragView();
    orderRandom();
    refresh();
    marquee();
    showAbout();
    reset();
    
});



