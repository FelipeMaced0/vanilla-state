## Usage

In the head section of your html file add the fololwing line:
`<script src='vanilla-state'/>`

## How Vanilla State Works?
Vanilla state will atomatically track all input that are not of type button.
The inputs should have names. The names will be used to set the appropriate property
at the state object.

## Example

The following html code:

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

would produce the following object state

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

Well, now that you now how to build a state from your html code using input names, it time to dive
into how Vanilla State can give you control the that and receive the state or part of it when nedded.

## Handlers
Vanilla State has a spacial handlers called: `vs-on:click`. It is almost like onclick html handler. The diffenrence is that
on VS, the function inside `vs-on:click` will receive an object with one or more properties present on the object state. To specify what propreties should be sent by `VS` to your handler, it is necessary to specify them at the `vs-payload-path` property on a button
tag, like so `vs-payload-path="person,user"`, that would send an object like the one bellow to your function when the button is clicked:

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
    }
}
```

Your handler should look like something this

```javascript
function sendRequest(payload){
    /* Do something with payload*/
    console.log(JSON.stringfy(payload))
}
```