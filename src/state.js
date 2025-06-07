import set from 'lodash/set'
import get from 'lodash/get'
import pick from 'lodash/pick'
import assign from 'lodash/assign'

export const setProperty = (path, value) => {
    set(vs.public.state, path, value);
}

export const getProperty = (path) => {
    return get(vs.public.state, path);
}

export const getProperties = (paths) => {
    return pick(vs.public.state, paths);
}

export const loadState = (value) => {
    assign(vs.public.state, value);
}

export const vs = {
    setProperty: setProperty,
    getProperty: getProperty,
    getProperties: getProperties,
    loadState: loadState,
    config: {
        input_prefix: 'vs-input',
        input_selector: 'input:not([type="button"])',
        button_selector: 'button[vs-on\\:click], input[type="button"][vs-on\\:click]',
        payload_path_prop_name: 'vs-payload-path',
        on_click_prop_name: 'vs-on:click',
        print_state_element_id: 'vs-print-state'
    },
    public: {
        loadState: loadState,
        state: {
        }
    },
}