## Usage

In the <head> section of your HTML file, add the following line:
`<script src='vanilla-state'/>`

## How Vanilla State Works?
Vanilla State automatically tracks all <input> elements that are not buttons. Each input must have a `name` attribute, which will be used to create corresponding properties in the state object.

## Example

Given this HTML:

```html
<div>
    <input type="range" name="person.age" min="1" max="100" />
    <input name="person.name" value="Julian">
    <input name="person.mother_name" value="Cabrero da Silva Sauro">
    <input type="date" name="person.birthday" value="2025-05-12">
    <input type="color" name="person.eye_color" value="#e66465" />
    <input type="email" name="user.email" value="email@test.com">
    <input name="user.password" value="123456">
    <input name="card.holder_nome" value="Mr. Bubbles">
    <input name="card.number" value="1234 4567 0988 213">
    <input name="card.cvc" value="120">
     
    <button vs-on:click="sendRequest" vs-payload-path="cart" class="bg-blue-500 p-2 hover:opacity-75">Cart</button>
    <input type="button" vs-on:click="sendRequest"  vs-payload-path="person,user" value="Person" class="bg-blue-500 p-2 hover:opacity-75"/>
</div>
```

Vanilla State will generate this state object:

```json
{
    "person": {
        "name":"asdasd asdasd asdasd",
        "birthday":"2000-09-10",
        "age":"10",
        "mother_name":"Cabrero da Silva Sauro",
        "eye_color":"#e66465"
    },
    "user": {
        "email": "email@test.com",
        "password": "123456"
    },
    "card": {
        "holder_name": "Mr. Bubbles",
        "number": "1234 4567 0988 213",
        "cvc": "120"
    }
}
```

## How to make it useful

Now that you understand how to build a state from your HTML inputs, let's explore how to work with this state.

## Handlers
Vanilla State provides special handlers prefixed with vs-on:. These work similarly to standard HTML event handlers, but with enhanced functionality.
### Click Handlers
Use `vs-on:click` to specify a function that will receive selected portions of your state:

```html
<button 
    vs-on:click="sendRequest" 
    vs-payload-path="person,user">
    Submit
</button>


```
When clicked, your handler receives an object containing only the specified state portions:

```json
{
    "person": {
        "name": "Julian",
        "birthday": "2025-05-12",
        "age": "50",
        "mother_name": "Cabrero da Silva Sauro",
        "eye_color": "#e66465"
    },
    "user": {
        "email": "email@test.com",
        "password": "123456"
    }
}
```

Handler Function Example
```javascript
function sendRequest(payload) {
    // Process the payload
    console.log(JSON.stringify(payload, null, 2));
    
    // Example: Send data to an API
    fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
```

## Viewing the Current State
Add this element to your page to display the current state:

```html
<div id="vs-print-state">

</div>
```

Vanilla State will automatically render the current state here:
```html
<div id="vs-print-state">
    <code>
        <pre>
            {
                "person": {
                    "name":"asdasd asdasd asdasd",
                    "birthday":"2000-09-10",
                    "age":"10",
                    "mother_name":"Cabrero da Silva Sauro",
                    "eye_color":"#e66465"
                },
                "user": {
                    "email": "email@test.com",
                    "password": "123456"
                }
            }
        </pre>
    </code>
</div>
```

## Modifying the State

Access and modify the state through the global vs object:
```javascript
// View the entire state
console.log(window.vs.state);

// Update specific portions
window.vs.loadState('user', {
    email: 'new@email.com',
    password: 'securepassword123'
});

```