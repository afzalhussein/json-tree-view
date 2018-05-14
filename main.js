

var _ulWrapper = document.getElementById('main');
var _collapseAll = document.getElementById('collapseall');
var _expandAll = document.getElementById('expandall');

function hookUpCollapseAllButtons(){
    _collapseAll.addEventListener('click', function(){
        _.forEach(document.querySelectorAll('.clickable'), function(el){
            el.classList.add('collapsed');

            const ulToToggle = el.nextSibling
            ulToToggle.classList.add('collapsed');
        })

    })

    _expandAll.addEventListener('click', function(){
        _.forEach(document.querySelectorAll('.clickable'), function(el){
            el.classList.remove('collapsed');

            const ulToToggle = el.nextSibling
            ulToToggle.classList.remove('collapsed');
        });
    })
}


function hookUpEvent(element){
    element.addEventListener('click', function(e){
        e.stopPropagation();
        const clickedElement = e.target;

        //toggle the class
        const ulToToggle = clickedElement.nextSibling
        ulToToggle.classList.toggle('collapsed');


        clickedElement.classList.toggle('collapsed')

    });
}

function generateLi(title, contents){
    var newLi = document.createElement('li');

    newLi.innerHTML = `<span class="li-title">${title}:</span>`;

    if(contents){
        newLi.innerHTML = newLi.innerHTML + `<span class="li-contents">${contents}</span>`;
    } 


    return newLi;
}


function generateNestedNode(title){
    var newLi = document.createElement('li');
    newLi.className = 'li-wrapper';




    var newNestedTitle = document.createElement('span');
    newNestedTitle.className='li-title clickable';
    newNestedTitle.innerHTML = `${title}:`

    newLi.appendChild(newNestedTitle)

    hookUpEvent(newNestedTitle);

    var newUl = document.createElement('ul');
    newUl.className = "nested";

    newLi.appendChild(newUl);

    return newLi;
}


function generateNode(obj, parentNode){
    //loop through all props in an object
    for (let key in obj) {
        const value = obj[key];

        if(typeof value === 'object' && !_.isEmpty(value)){
            //if its an object, we need to recurse

            const newNested = generateNestedNode(key)

            const ul = parentNode.querySelector('ul')

            if (ul){
                ul.appendChild(newNested);
            } else {
                parentNode.appendChild(newNested);
            }
            
            generateNode(value, newNested);
        } else {
            
            let liValue;

            if(typeof value === 'object' && _.isEmpty(value)){

                liValue = '(empty object)';
            }
            else if((value + '').trim() === ''){

                liValue = '(empty string)'
            } else{
                liValue = value + '';
            }

            const newLi = generateLi(key, liValue)

            const ul = parentNode.querySelector('ul')


            if (ul){
                ul.appendChild(newLi)
            } else {
                parentNode.appendChild(newLi);
            }

        }
    }
}


function init(){
    //map thru shit

    generateNode(_data, _ulWrapper)
    hookUpCollapseAllButtons();
}
init();