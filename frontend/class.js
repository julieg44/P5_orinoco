/// base de construction d'un article
class article {
    constructor (color, description, image, name, price, _id){
        this.color = color;
        this.description = description;
        this.image = image;
        this.name = name;
        this.price = price;
        this._id = _id;
    }
}

/// base pour un contact
class Contact {
    constructor (firstName, lastName, address, city, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}
