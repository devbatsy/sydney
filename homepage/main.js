class createProgressBar{
    constructor(num)
    {
        this.parent = document.querySelector('.scrollCustom');
        this.bulb_style = [
            ['min-height','fit-content'],
            ['min-width','fit-content'],
            ['borderRadius','50%'],
            ['display','flex'],
            ['justifyContent','center'],
            ['alignItems','center'],
            ['fontSize','10px'],
            ['fontWeight','100'],
            ['transition','background linear 1s'],
            ['position','relative'],
            ['opacity','0.3']
        ]
        this.layer_style = [
            ['height','0'],
            ['width','100%'],
            ['position','absolute'],
            ['left','0'],
            ['top','0'],
        ]
        this.bar_style = [
            ['minHeight','400px'],
            ['height','100vh'],
            // ['maxHeight','600px'],
            ['width','2px'],
            ['position','relative'],
            // ['height','100%']
        ]
        this.objective = [
            [
                ['background',' linear-gradient(to bottom,transparent, rgb(124,144,255),rgb(188,140,255))'],
                // ['boxShadow','0 0 10px rgb(188,140,255,.3)']
            ],
            [
                ['background','linear-gradient(to bottom, rgb(122,116,248),rgb(82,141,160),rgb(60,181,80))'],
                // ['boxShadow','0 0 10px rgb(82,141,160,.5)']
            ],
            [
                ['background','linear-gradient(to bottom,rgb(60,181,80),transparent)'],
                // ['boxShadow','0 0 10px rgb(60,181,80,.3)']
            ]
        ];
        this.appendStyle = (style,element) =>{
            style.forEach(val => {
                    element.style[`${val[0]}`] = val[1]
            });
        }
        this.progressObject = {
            'bulbs':new Array(),
            'bars':new Array
        }
        const create_divs = () =>{
            for(let i = 0; i < num ; i++)
            {
                let bulb = document.createElement('div');
                this.progressObject.bulbs.push(bulb);
                this.appendStyle(this.bulb_style,bulb)
                switch(true)
                {
                    case i == 0:
                        bulb.classList.add('bulbing');
                        bulb.style.opacity = '1';
                        bulb.style.height = '50px';
                        bulb.style.width = '50px';
                }
                bulb.innerHTML = i+1
                this.parent.appendChild(bulb)
                switch(true)
                {
                    case i+1 < num:
                        let bar = document.createElement('div');
                        let layer = document.createElement('div');
                        bar.appendChild(layer)
                        this.progressObject.bars.push(bar);
                        this.appendStyle(this.bar_style,bar);
                        this.appendStyle(this.objective[i],layer)
                        this.appendStyle(this.layer_style,layer)
                        this.parent.appendChild(bar)
                }
            }
        }
        create_divs()
    }
}
// start();

const animateProcess = new createProgressBar(document.querySelectorAll('.subContainer').length);
const bulbs = animateProcess.progressObject.bulbs;
const bars = animateProcess.progressObject.bars;
class animate{
    constructor()
    {
        this.target = null;
        this.shadows = [
            'rgb(188,140,255)',
            'rgb(82,141,160)',
            'rgb(60,181,80)'
        ]
        this.subCont = document.querySelectorAll('.subContainer');
        animate.run(this);
    }
    static run(params)
    {
        const {target,subCont,shadows} = params;

        const heightArr = [];
        for(let i = 0; i < Array.from(subCont).length; i++)
        {
            switch(true)
            {
                case i > 0:
                    heightArr.push(0);
            }
        }
        document.querySelector('.container').addEventListener('scroll', e =>{
            mainModule()
        }); 
        document.querySelector('.container').addEventListener('touchmove', e =>{
            mainModule()
        })

        function mainModule()
        {
            const param = document.querySelector('.container').scrollTop;
            let currentIndex;

            const array = Array.from(subCont).map((val,idx) =>{return val.offsetTop });
            function getClosest()
            {
                let temp = [array[array.length-1],array.length-1];
                for(let i = 0; i < array.length; i++)
                {
                    switch(true)
                    {
                        case i > 0:
                            if(Math.abs(param-array[i]) < temp[0])
                            {
                                temp = [Math.abs(param-array[i]),i]
                            }
                    }
                }
                currentIndex = temp[1]-1;
                heightArr.forEach((value, idxParam) =>{
                    switch(true)
                    {
                        case idxParam !== currentIndex:
                            if(value === 100)
                            {
                                heightArr[idxParam] = 0;
                                bars[idxParam].querySelector('div').style.height = `${heightArr[idxParam]}%`;
                                if(bulbs[idxParam+1].classList.contains('bulbing'))
                                {
                                    bulbs[idxParam+1].classList.remove('bulbing');
                                    bulbs[idxParam+1].style.opacity = '0.3';
                                    Array.from(subCont[idxParam+1].children).forEach((parameters,pId) =>{
                                        switch(true)
                                        {
                                            case parameters.classList.contains(`ent${pId+1}`):
                                                parameters.classList.remove(`ent${pId+1}`);
                                        }
                                        parameters.classList.add(`ext${pId+1}`);
                                    })
                                    switch(true)
                                    {
                                        case subCont[idxParam].children[1] !== undefined:
                                            try{Array.from(subCont[idxParam+1].children[1].children).forEach((parameters,pId) =>{
                                                switch(true)
                                                {
                                                    case parameters.classList.contains(`ent${pId+1}`):
                                                        parameters.classList.remove(`ent${pId+1}`);
                                                }
                                                parameters.classList.add(`ext${pId+1}`);
                                            })}catch(err){
                                                console.log('found an error')
                                            }
                                    }
                                }
                            }
                    }
                })
                switch(true)
                {
                    case heightArr[currentIndex] === 0:
                        startAnimation();
                }
                // }
            }
            getClosest();

            function startAnimation(){
                let begin = requestAnimationFrame(startAnimation);

                bars[currentIndex].querySelector('div').style.height = `${heightArr[currentIndex]}%`;

                if(heightArr[currentIndex] >= 100)
                {
                    cancelAnimationFrame(begin);
                    bulbs[currentIndex+1].classList.add('bulbing');
                    bulbs[currentIndex+1].style.opacity = '1';
                    ignite.style.boxShadow = `0 0 150px 80px ${shadows[currentIndex]},0 0 5px ${shadows[currentIndex]} inset`;

                    Array.from(subCont[currentIndex+1].children).forEach((parameters,pId) =>{
                        switch(true)
                        {
                            case parameters.classList.contains(`ext${pId+1}`):
                                parameters.classList.remove(`ext${pId+1}`);
                        }
                        parameters.classList.add(`ent${pId+1}`);
                        parameters.style.animationPlayState = 'running'
                    })
                    switch(true)
                    {
                        case subCont[currentIndex+1].children[1] !== undefined:
                            Array.from(subCont[currentIndex+1].children[1].children).forEach((parameters,pId) =>{
                                switch(true)
                                {
                                    case parameters.classList.contains(`ext${pId+1}`):
                                        parameters.classList.remove(`ext${pId+1}`);
                                }
                                parameters.classList.add(`ent${pId+1}`);
                                parameters.style.animationPlayState = 'running'
                            })
                    }
                }else{
                    heightArr[currentIndex]+=20;
                }
            }
        }
        
    }
}

new animate()