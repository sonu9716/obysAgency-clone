function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
function loadingAnimation() {



    var tl = gsap.timeline();
    tl.from(".line h1", {
        y: 150,
        stagger: 0.25,
        duration: 0.6,
        delay: 0.5
    });
    tl.from("#line1-part1", {
        opacity: 0,
        onStart: function () {
            var h5timer = document.querySelector("#line1-part1 h5")
            var grow = 0
            setInterval(function () {
                if (grow < 100) {
                    h5timer.innerHTML = grow++
                } else {
                    h5timer.innerHTML = grow
                }
            }, 33)
        }

    });
    tl.to(".line h2", {
        animationName: "anime",
        opacity: 0
    })
    tl.to("#loader", {
        opacity: 0,
        duration: 0.4,
        delay: 0,
    });
    tl.from("#page1", {
        delay: 0.2,
        y: 1600,
        duration: 0.6,
        ease: Power4.easeOut

    });
    tl.to("#loader", {
        display: "none"
    });
    tl.from("#nav", {
        opacity: 0

    })
    tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1", {
        y: 140,
        stagger: 0.2,

    });
    tl.from("#hero1,#page2", {
        opacity: 0,

    }, "-=1.2")

}


function cursorAnimation() { 
    Shery.mouseFollower({
        skew:true,
        ease:"cubic-bezier(0.23,1,0,0.320,1)",
        duration:1,
    });
    Shery.makeMagnet("#nav-part2 h4");
    var videocontainer=document.querySelector("#video-container");
   var video= document.querySelector("#video-container video"); 
   var img=document.querySelector("#video-container img");
    videocontainer.addEventListener("mouseenter",function(){
        
        videocontainer.addEventListener("mousemove",function(dets){
            gsap.to(".mousefollower",{
                opacity:0
            })
            gsap.to("#video-cursor",{
                left:dets.x - 450,
                y:dets.y - 207 ,
            })
        })
    
    })
    videocontainer.addEventListener("mouseleave",function(){
        gsap.to(".mousefollower",{
            opacity:1
        })
        gsap.to("#video-cursor",{
            left:"70%",
            top:"-15%"

        })
    });


    var flag=0

    videocontainer.addEventListener("click",function(){
        if(flag===0){
         video.play()
        img.style.opacity = 0
        video.style.opacity = 1
        document.querySelector("#video-cursor").innerHTML = ` <i class="ri-pause-line"></i>`
        gsap.to("#video-cursor",{ 
            scale:0.8 
        })
        flag=1
    }else{
         video.pause()
        img.style.opacity = 1
        video.style.opacity = 0
              document.querySelector("#video-cursor").innerHTML = ` <i class="ri-play-fill"></i>`        
        gsap.to("#video-cursor",{ 
            scale:0.8 
        })
        flag=0
    }
        
    })
}
function sheryAnimation() {
    Shery.imageEffect(".image-div", {
        style: 5,
        config: { "a": { "value": 2, "range": [0, 30] }, "b": { "value": 0.75, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7272771866183175 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": false }, "maskVal": { "value": 1.3, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.66, "range": [0, 10] }, "metaball": { "value": 0.5, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.43, "range": [0, 2] }, "noise_scale": { "value": 7, "range": [0, 100] } },
        gooey: true
    })
}

cursorAnimation() ;
loadingAnimation();
locomotiveAnimation();
sheryAnimation();  
document.addEventListener("mousemove",function(dets){
    gsap.to("#flag",{
         x:dets.x,
         y:dets.y,
         
    })
})
document.querySelector("#hero3").addEventListener("mouseenter",function(){
    gsap.to("#flag",{
       opacity:1
    })
})
document.querySelector("#hero3").addEventListener("mouseleave",function(){
    gsap.to("#flag",{
       opacity:0 
    })
})


const footer = document.querySelector("#footer");
const footerH1 = document.querySelector("#footer h1");

// Split text into letters and wrap in spans
footerH1.innerHTML = footerH1.textContent.split('').map(letter => 
  `<span class="letter">${letter === ' ' ? '&nbsp;' : letter}</span>`
).join('');

const letters = footerH1.querySelectorAll('.letter');

footer.addEventListener("mouseenter", function() {
  // Fade in the entire heading first
  gsap.from(footerH1, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5
  });
  
  // Then fade in letters one by one
  gsap.from(letters, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.05,
    delay: 0.8, // Start after container animation
    ease: "power2.out"
  });
});