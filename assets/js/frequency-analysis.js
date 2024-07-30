//Count number of each alphebets
function count(){
    let text = document.getElementById("ciphertext").value;
    text = text.toUpperCase();
    let strArray = text.split("");
    let resultArray = strArray.reduce((chars, ch) => {
        if (!chars[ch]) {
            chars[ch] = 1;
        } else {
            chars[ch] += 1;
        }
        return chars;
    }, []);
    result = resultArray;
    console.log("The occurrence of each letter in given string is:", resultArray)
    console.log(resultArray['A'])
}

//Generate the bar chart
let result = {A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0, K: 0, L: 0, M: 0, N: 0, O: 0, P: 0, Q: 0, R: 0, S: 0, T: 0, U: 0, V: 0, W: 0, X: 0, Y: 0, Z: 0};
const ctx = document.getElementById('myChart');
let chartData = [result['A'], result['B'], result['C'], result['D'], result['E'], result['F'], result['G'],
result['H'], result['I'], result['J'], result['K'], result['L'], result['M'], result['N'], 
result['O'], result['P'], result['Q'], result['R'], result['S'], result['T'], result['U'], 
result['V'], result['W'], result['X'], result['Y'], result['Z']]
let config = {
  type: 'bar',
  data: {
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    datasets: [{
      label: '# of letters',
      data: chartData,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
}
let chart = new Chart(ctx, config);

//Check if the array is empty/undefined
function checkArray(check) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
    letters.forEach(letter => {
      if (check[letter] === undefined) {
        result[letter] = 0;
      }
    });
  }


(() => { 
    //Initialize the table for substitution input
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let sub = document.getElementById("sub-input");
    for(let i = 0; i < 13; i++){
      let td = document.createElement("td");
      let input = document.createElement("input");
      input.className = "text-center"
      input.setAttribute("id", letters[i] );
      input.setAttribute("maxlength", "1");
      input.setAttribute("size", "1");
      input.classList.add("fw-bold");
      td.appendChild(input);
      sub.appendChild(td);
    }

    let sub_2 = document.getElementById("sub-input-2");
    for(let i = 0; i < 13; i++){
      let td = document.createElement("td");
      let input = document.createElement("input");
      input.className = "text-center"
      input.setAttribute("id", letters[i+13] );
      input.setAttribute("maxlength", "1");
      input.setAttribute("size", "1");
      input.classList.add("fw-bold");
      td.appendChild(input);
      sub_2.appendChild(td);
    }
    
    //Update the chart 
    document.querySelector('#analysis').addEventListener('click',function(){
    count();
      checkArray(result)
      chartData = [result['A'], result['B'], result['C'], result['D'], result['E'], result['F'], result['G'],
      result['H'], result['I'], result['J'], result['K'], result['L'], result['M'], result['N'], 
      result['O'], result['P'], result['Q'], result['R'], result['S'], result['T'], result['U'], 
      result['V'], result['W'], result['X'], result['Y'], result['Z']];
      chart.data.datasets.forEach((dataset) => {
          dataset.data = chartData;
      });
      chart.update();
      console.log(chart)
    });
})();

//For ciphertext substitution
function substitution(){  
  const chars = {
    'A': '',
    'B': '',
    'C': '',
    'D': '',
    'E': '',
    'F': '',
    'G': '',
    'H': '',
    'I': '',
    'J': '',
    'K': '',
    'L': '',
    'M': '',
    'N': '',
    'O': '',
    'P': '',
    'Q': '',
    'R': '',
    'S': '',
    'T': '',
    'U': '',
    'V': '',
    'W': '',
    'X': '',
    'Y': '',
    'Z': ''
  };
  //Get substitution letters input value
  let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let values = letters.map(letter => document.getElementById(letter).value);

  //Map the value to the specific letter
  for (let i = 0; i < letters.length; i++) {
    if(values[i] === ""){
      chars[letters[i]] = letters[i]
    } else {
      chars[letters[i]] = values[i];
      //Add color to the letter with substitution
      chars[letters[i]] = "<span style='color:red'>" + chars[letters[i]] + "</span>";
    }
  }

  //Substitution
  let ciphertext = document.getElementById("ciphertext").value;
  ciphertext = ciphertext.replace(/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g, m => chars[m]);

  // CodeProject
  document.getElementById("sub-text").innerHTML = ciphertext.toUpperCase();
}
