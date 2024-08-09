const easterEgg = new Konami(() => {
    // Get a reference to the modal element
    var myModal = new bootstrap.Modal(document.getElementById("modulesModal"));
    myModal.show();
});
var editor;
let params = new URLSearchParams(document.location.search);
var question = params.get("question") == null ? "0" : params.get("question");
if (config[question] == undefined || question > config.length - 1)  {
  question = 'err';
  document.querySelector('.loader').style.display = "none";
  document.querySelector('#title').innerHTML = "This question does not exists!";
  throw "Invalid question number";
}
if (config[question].test.length == 0){
  document.getElementById("check").style.display = "none";
}

async function init() {
  document.querySelector("#title").innerHTML = config[question].title;
  document.querySelector("#description").innerHTML = config[question].description;
  document.querySelector("#hints").innerHTML = config[question].hints;
  self.pyodide = await loadPyodide();
  await config[question].packages.forEach(pyodide.loadPackage);
  console.log("Pyodide loaded!");
  document.querySelector('.loader').style.display = "none";
  document.querySelector('#codingSection').style.display = "block";
  require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor/min/vs' }});
  require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor'), {
      value: config[question].skeleton.join('\n'),
      language: 'python',
      theme: 'vs-dark',
      automaticLayout: true
    });
  })
  importBtn = document.getElementById("import");
  selectedModule = document.getElementsByTagName('select')[0];
  importBtn.addEventListener("click", () => {
    importPackages(selectedModule.value.split(','));
  });
};

async function compileAndRunCode() {
  const code = editor.getValue();
  let outputElement = document.getElementById('output');
  outputElement.textContent = '';  // Clear previous output

  try {
    // Redirect print statements to the output element
    let output = await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()

${code}
sys.stdout.getvalue()
    `);
    outputElement.textContent = output;
  } catch (err) {
    outputElement.textContent = err;
  }
}

async function checkAnswer() {
  const code = editor.getValue();
  let outputElement = document.getElementById('output');
  outputElement.textContent = '';  // Clear previous output

  try {
    let listOfImport = ""
    for (item of config[question].packages){
      listOfImport += `import ${item}\n`
    }
    // Redirect print statements to the output element
    let completeCode = `
import sys
import io
${listOfImport}

sys.stdout = io.StringIO()

${extractFunction(code, config[question].functionName)}
${config[question].additionalFunctions}
try:
${'\t'+config[question].test.join('\n\t')}
except AssertionError as e:
raise Exception(e)

sys.stdout.getvalue()
`
    let output = await pyodide.runPythonAsync(completeCode);
    outputElement.textContent = "All tests passed!"
    if (config[question].key != undefined){
      outputElement.textContent += " Here is the key: "+config[question].key;
    }   
  } catch (err) {
    console.log(err)
    outputElement.textContent = "One or more tests failed.";
  }
  
}

async function importPackages(packages) {
  try{
    await pyodide.loadPackage(packages);
    alert("Packages loaded!");
  }
  catch (err) {
    alert(err);
  }
}

function extractFunction(code, functionName){
  const functionPattern = new RegExp(`def ${functionName}\\(([^)]*)\\):([\\s\\S]*?)(?=def |$)`);
  const match = functionPattern.exec(code);
  return match[0];
}

window.onload = init;