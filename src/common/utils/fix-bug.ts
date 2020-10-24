export function fixCarousel(){
    setTimeout(function(){
        window.dispatchEvent(new Event('resize'))
    },0)
}
