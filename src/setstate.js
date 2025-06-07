import { vs } from "./state";

document.addEventListener('DOMContentLoaded', function () {
    const allInputs = document.querySelectorAll(vs.config.input_selector);

    allInputs?.forEach(element => {
        const path = element.getAttribute('name');
        const value = element.getAttribute('value');
        //element.id = `${vs.config.input_prefix}-${Number.parseInt(Math.random()*10000000)}`;
        const storedValue = vs.getProperty(path);

        if (storedValue != undefined) {
            element.value = storedValue;
        } else {
            vs.setProperty(path, value);
        }


        element.addEventListener('change', change);
    });

    const sendButtons = document.querySelectorAll(vs.config.button_selector);

    sendButtons?.forEach(element => {
        const oldCallbackString = element.getAttribute(vs.config.on_click_prop_name);

        element.removeAttribute('onclick');

        element.addEventListener('click', (ev) => {
            click(ev, oldCallbackString)
        });
    });
}, false);

function change(event) {
    event.preventDefault();
    const path = event.target.getAttribute("name");
    let value;

    if (event.target.type == 'checkbox') {
        value = event.target.checked
    }
    else if (event.target.type == 'file') {
        value = event.target.files
    } else {
        value = event.target.value
    }

    vs.setProperty(path, value);
}

function click(event, callbackString) {
    event.preventDefault();
    const pathString = event.target.getAttribute(vs.config.payload_path_prop_name);
    const paths = pathString.split(",")?.map((path) => path.trim());
    callbackString = callbackString.replaceAll(/[^\w]/g, '');
    //debugger;
    const payload = vs.getProperties(paths);

    
    const callbackFunc = new Function('payload', `${callbackString}(payload)`);
    callbackFunc(payload);
}

// Attach to global window object
window.vs = vs.public;