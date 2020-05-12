/* TODO: Build up the HTML document by using JavaScript DOM manipulation functions.
 * Do not make any changes to index.html as they won't be seen by the grader
 */

document.title = "Good title";

var infoDiv = document.createElement('div');
infoDiv.className = "stuff-box, purple";
var welcome = document.createElement('h1');
welcome.textContent = 'Welcome to the JavaScript Interactive calculator!'
var infoHeader = document.createElement('h4');
infoHeader.textContent = 'Type 2 numbers, select an operand and a color and the magical javascript calculator will add a colored stuff-box with your answer. You may then click a colored box to make it dissapear.';
infoDiv.appendChild(welcome);
infoDiv.appendChild(infoHeader);
var calcDiv = document.createElement('div');
calcDiv.className = "stuff-box, shadowed";

document.body.appendChild(infoDiv);

//creating some text input boxes

var rightInput = document.createElement("INPUT");
rightInput.id = 'rightInput';
rightInput.setAttribute("type", "number");
rightInput.setAttribute("placeholder", "First number");

var colorInput = document.createElement("INPUT");
colorInput.id = 'colorInput';
colorInput.setAttribute("type", "color");

var leftInput = document.createElement("INPUT");
leftInput.id = 'leftInput';
leftInput.setAttribute("type", "number");
leftInput.setAttribute("placeholder", "Second number");

var operand = document.createElement('select');
operand.id = 'operand';
var dropOp1 = document.createElement('option');
var dropOp2 = document.createElement('option');
var dropOp3 = document.createElement('option');
var dropOp4 = document.createElement('option');
var dropOp5 = document.createElement('option');
var dropOp6 = document.createElement('option');

dropOp1.textContent = '+';
dropOp2.textContent = '-';
dropOp3.textContent = '*';
dropOp4.textContent = '/';
dropOp5.textContent = '%';
dropOp6.textContent = '**';

operand.appendChild(dropOp1);
operand.appendChild(dropOp2);
operand.appendChild(dropOp3);
operand.appendChild(dropOp4);
operand.appendChild(dropOp5);
operand.appendChild(dropOp6);

var goButton = document.createElement("INPUT");
goButton.setAttribute("type", "button");
goButton.setAttribute("value", "COMPUTE!");
goButton.setAttribute("onclick", "calculate()")


calcDiv.appendChild(rightInput);
calcDiv.appendChild(operand);
calcDiv.appendChild(leftInput);
calcDiv.appendChild(colorInput);
calcDiv.appendChild(goButton);



// var result = document.createElement('p');
// result.textContent = document.getElementById('leftInput').nodeValue;

// calcDiv.appendChild(result);

var parentDiv = document.createElement('div');
document.body.appendChild(calcDiv);
document.body.appendChild(parentDiv);


var i = 0;

var calculate = function() {
    
    var newResultDiv = document.createElement('div');

    // calcDiv.appendChild(p);
    // calcDiv.setAttribute("id", 'target');
    parentDiv.setAttribute("id", 'target');

    var target = document.querySelector('#target');

    newResultDiv.setAttribute("onclick", "this.remove()");

    colorVal = document.getElementById("colorInput").value;
    newResultDiv.className = "stuff-box";
    
    var result = document.createElement('p');
    // console.log(document.getElementById('leftInput'))
    console.log(document.getElementById('leftInput').value)
    // Number.isNaN(document.getElementById('leftInput').value) || Number.isNaN(document.getElementById('rightInput').value)
    if ((document.getElementById('leftInput').value).length == 0 || (document.getElementById('rightInput').value).length == 0){
        console.log("hey i'm in the loop!!!!")
        var error = document.createElement('p');
        error.textContent = 'ERROR!! Empty number input.';
        newResultDiv.appendChild(error);
        newResultDiv.style.backgroundColor = 'red';
        parentDiv.insertBefore(newResultDiv, target.firstChild);
    }
    else{
        newResultDiv.style.backgroundColor = colorVal;
        var evaluated = eval(document.getElementById('leftInput').value + document.getElementById('operand').value + document.getElementById('rightInput').value);
        result.textContent = `Here is the calculation:   ${document.getElementById('leftInput').value +  document.getElementById('operand').value + document.getElementById('rightInput').value} = ${evaluated}`;
        newResultDiv.appendChild(result);
        // console.log(target)
        parentDiv.insertBefore(newResultDiv, target.firstChild);
        // calcDiv.appendChild(newResultDiv);
    }

}

var append = function() {
    var target = document.querySelector('#target');
    var p = document.createElement('p');
    p.textContent = `Appended paragraph #${i++}`;
    target.appendChild(p);
}


var insert = function() {
    var target = document.querySelector('#target');
    var p = document.createElement('p');
    p.textContent = `Inserted paragraph #${i++}`;
    target.insertBefore(p, target.firstChild);
}


var remove = function() {
    console.log(document.querySelector('#target'));
    var target = document.querySelector('#target');
    target.remove();
    // if (target.hasChildNodes()) {
    //     target.firstChild.remove();
    // }
}


var move = function() {
    var target = document.querySelector('#target');

    if (target.hasChildNodes()) {
        var receiver = document.querySelector('#receiver');
        receiver.appendChild(target.firstChild);
    }
}


var copy = function() {
    var target = document.querySelector('#target');

    if (target.hasChildNodes()) {
        var receiver = document.querySelector('#receiver');

        // Important!  It's gotta be a "Deep" clone for this to work!
        let c = target.firstChild.cloneNode(true);
        receiver.appendChild(c);
    }
}


