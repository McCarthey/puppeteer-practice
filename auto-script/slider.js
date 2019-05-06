const elem = document.querySelector('#nc_1_n1z')
elem.style.left = '0px'
elem.style.top = '0px'
function moveElement(final_x, final_y, interval) {
    let timer
    let xpos = parseInt(elem.style.left);
    let ypos = parseInt(elem.style.top);
    if(xpos === 0 && ypos === 0) {
        elem.dispatchEvent(new Event('mousedown'));
    }
    elem.dispatchEvent(new Event('mousemove'));
    if (xpos === final_x && ypos === final_y) {
        console.log('done')
        elem.dispatchEvent(new Event('mousemove'));
        elem.dispatchEvent(new Event('mouseup'));
        clearTimeout(timer)
        return true;
    }
    if (xpos < final_x) {
        xpos = xpos + 3;
    }
    if (xpos > final_x) {
        xpos--;
    }
    if (ypos < final_y) {
        ypos++;
    }
    if (ypos > final_y) {
        ypos--;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    const randomInterval = Math.ceil(Math.random() * 5)
    let repeat = "moveElement(" + final_x + "," + final_y + "," + randomInterval + ")";
    timer = setTimeout(repeat, randomInterval)
}

KISSY.use('anim',function(S,Anim){
    var anim1=new Anim("#nc_1_n1z",{'left':'258px'},2);
    var anim2=new Anim("#nc_1__bg",{'width':'258px'},2);
    anim1.run();
    anim2.run();
})
