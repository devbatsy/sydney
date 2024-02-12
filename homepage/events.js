const searchPri = document.querySelectorAll('.searchBar');
const searchpSec = document.querySelector('.auxSearchCont');
const secInput = searchpSec.querySelector('input');
const subTwo = document.querySelector('#two');
const ignite = document.createElement('span');
ignite.classList.add('ignition');
document.body.appendChild(ignite);
searchPri.forEach(val =>{
    val.addEventListener('click', e =>{
        searchpSec.style.display = 'flex';
        secInput.focus();
    })
})

secInput.addEventListener('focusout', e =>{
    searchpSec.style.display = 'none';
})

addEventListener('resize', e =>{
    setParameters()
})
addEventListener('load', e =>{
    setParameters()
})
function setParameters()
{
    const subCont = document.querySelectorAll('.subContainer');
    Array.from(subCont).forEach((param,id,arr) =>{
        let length = window.getComputedStyle(param).height
        length = Number(length.slice(0,length.length-2));
        switch(true)
        {
            case id < arr.length-1:
                // bars.forEach(val =>{
                    bars[id].style.height = `${length-50}px`;
                // })
        }
        switch(true)
        {
            case id === 0:
                document.querySelector('.scrollCustom').style.top = `${(length-60)/2}px`;
        }
    })
}
addEventListener('mousemove', e =>{
    renderShadow(e.x,e.y)
})
addEventListener('touchmove', e =>{
    let touch = e.touches[0]
    renderShadow(touch.clientX,touch.clientY)
})
function renderShadow(x,y)
{
    ignite.style.top = `${y+5}px`;
    ignite.style.left = `${x+5}px`
}