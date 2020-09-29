const express = require('express');
const faker = require('faker');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.set('view engine', 'jade');

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/cart/user/:id', (req, res) => {
//   res.send(carts(req.params.id));
  res.send(generateHtml(req.params.id))
})

app.get('/html', (req, res) => {
    res.send(generateHtml(req.params.id))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function generateHtml(id) {
    var _x = carts(id);
    var _ul = `<ul>`;
    _x.item.forEach((element, index) => {

        var li = `
            <li>
                <img src="${element.thumb}" alt="">
                <p>${element.name}</p>
                <p>${element.price}</p>
            </li>
        `;

        _ul+= li;
    });

    _ul+= `</ul>`;

    return _ul;
    
}

function carts(id) {
    var _data = {
        "uid" : id,
        "nama" : `${faker.name.firstName()} ${faker.name.lastName()}`,
        "item" : []
    };
    
    var _random = Math.floor(Math.random(1, 9999) * 10);
    // _random = (_random == 0 ) ? _random + 1 : _random;
    
    for (let index = 0; index < _random; index++) {
        
        _data.item.push(createProduct());
        
    }

    return _data;
}

function createProduct() {
    var _product = {
        "id" : faker.random.uuid(),
        "name" : faker.commerce.productName(),
        "price" : faker.commerce.price(),
        "thumb" : faker.image.food() + "?=" + Math.random(9,9999999)
    }

    return _product;
}