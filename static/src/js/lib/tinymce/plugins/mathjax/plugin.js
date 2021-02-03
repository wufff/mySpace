tinymce.PluginManager.add('mathjax', function(editor, url) {
  let mathjaxClassName = editor.settings.mathjax.className || "math-tex";
  let mathjaxTempClassName = mathjaxClassName + '-original';
  let mathjaxSymbols = editor.settings.mathjax.symbols || {start: '\\(', end: '\\)'};
  let mathjaxUrl = editor.settings.mathjax.lib || null;
  let mathjaxConfigUrl = (editor.settings.mathjax.configUrl || url + '/config.js') + '?class=' + mathjaxTempClassName;
  let mathjaxScripts = [mathjaxConfigUrl];
  if (mathjaxUrl) {
    mathjaxScripts.push(mathjaxUrl);
  }

  // load mathjax and its config on editor init
  editor.on('init', function () {
    let scripts = editor.getDoc().getElementsByTagName('script');
    for (let i = 0; i < mathjaxScripts.length; i++) {
      // check if script have already loaded
      let id = editor.dom.uniqueId();
      let script = editor.dom.create('script', {id: id, type: 'text/javascript', src: mathjaxScripts[i]});
      let found = false;
      for (let j = 0; j < scripts.length; j++) {
        if (scripts[j].src == script.src) {
          found = true;
          break;
        }
      }
      // load script
      if (!found) {
        editor.getDoc().getElementsByTagName('head')[0].appendChild(script);
      }
    }
  });

  // remove extra tags on get content
  editor.on('GetContent', function (e) {
    let div = editor.dom.create('div');
    div.innerHTML = e.content;
    let elements = div.querySelectorAll('.' + mathjaxClassName);
    for (let i = 0; i < elements.length; i++) {
      let children = elements[i].querySelectorAll('span');
      for (let j = 0; j < children.length; j++) {
        children[j].remove();
      }
      let latex = elements[i].getAttribute('data-latex');
      elements[i].removeAttribute('contenteditable');
      elements[i].removeAttribute('style');
      elements[i].removeAttribute('data-latex');
      elements[i].innerHTML = latex;
    }
    e.content = div.innerHTML;
  });

  let checkElement = function(element) {
    if (element.childNodes.length != 2) {
      element.setAttribute('contenteditable', false);
      element.style.cursor = 'pointer';
      let latex = element.getAttribute('data-latex') || element.innerHTML;
      element.setAttribute('data-latex', latex);
      element.innerHTML = '';

      let math = editor.dom.create('span');
      math.innerHTML = latex;
      math.classList.add(mathjaxTempClassName);
      element.appendChild(math);

      let dummy = editor.dom.create('span');
      dummy.classList.add('dummy');
      dummy.innerHTML = 'dummy';
      dummy.setAttribute('hidden', 'hidden');
      element.appendChild(dummy);
    }
  };

  // add dummy tag on set content
  editor.on('BeforeSetContent', function (e) {
    let div = editor.dom.create('div');
    div.innerHTML = e.content;
    let elements = div.querySelectorAll('.' + mathjaxClassName);
    for (let i = 0 ; i < elements.length; i++) {
      checkElement(elements[i]);
    }
    e.content = div.innerHTML;
  });

  // refresh mathjax on set content
  editor.on('SetContent', function(e) {
    if (editor.getDoc().defaultView.MathJax) {
      editor.getDoc().defaultView.MathJax.startup.getComponents();
      editor.getDoc().defaultView.MathJax.typeset();
    }
  });

  // add button to tinimce
  editor.ui.registry.addToggleButton('mathjax', {
    text: 'Σ',
    tooltip: 'Mathjax',
    onAction: function() {
      let selected = editor.selection.getNode();
      let target = undefined;
      if (selected.classList.contains(mathjaxClassName)) {
        target = selected;
      }
      openMathjaxEditor(target);
    },
    onSetup: function (buttonApi) {
      return editor.selection.selectorChangedWithUnbind('.' + mathjaxClassName, buttonApi.setActive).unbind;
    }
  });

  // handle click on existing
  editor.on("click", function (e) {
    let closest = e.target.closest('.' + mathjaxClassName);
    if (closest) {
      openMathjaxEditor(closest);
    }
  });

  // open window with editor
  let openMathjaxEditor = function(target) {
    // let mathjaxId = editor.dom.uniqueId();
    let latex_attribute;
    let latex = '';
    let bl = false;
    if (target) {
      latex_attribute = target.getAttribute('data-latex');
      let regex = /\[|\]/g;
      bl = regex.test(mathjaxSymbols.start);
      if (latex_attribute.length >= (mathjaxSymbols.start + mathjaxSymbols.end).length) {
        latex = latex_attribute.substr(mathjaxSymbols.start.length, latex_attribute.length - (mathjaxSymbols.start + mathjaxSymbols.end).length);
      }
    }

    window.editor = editor;
    const instanceApi = editor.windowManager.openUrl({
      title: '公式编辑区',
      url:'/myEditor/static/src/js/lib/kityformula/kityFormulaDialog.html',
      width:790,
      height:490
    });

    let obj = {
      latex:latex,
      checked:bl
    };

    setTimeout(function () {
      instanceApi.sendMessage({
        message: JSON.stringify(obj)
      });
    }, 300);
  };

 function getMathText(value, symbols) {
    if (!symbols) {
      symbols = mathjaxSymbols;
    }
    return symbols.start + ' ' + value + ' ' + symbols.end;
  }

  window.addEventListener('message', function (e) {
    //console.log('主页面', e.data.content);
    var json = JSON.parse(e.data.content);
    var data = json.latex.trim();
    var value = data.slice(1);

    if(json.checked) {
      mathjaxSymbols = { start: '\\[', end: '\\] ' };
    }else{
      mathjaxSymbols = { start: '\\(', end: '\\) ' };
    }

    if(value === 'placeholder') {
      data = "";
    }

    let newElement = editor.getDoc().createElement('span');
    newElement.innerHTML = getMathText(data);
    newElement.classList.add(mathjaxClassName);
    checkElement(newElement);
    editor.insertContent(newElement.outerHTML);
    editor.getDoc().defaultView.MathJax.startup.getComponents();
    editor.getDoc().defaultView.MathJax.typeset();
  });
});
