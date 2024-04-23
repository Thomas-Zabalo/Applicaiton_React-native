export default class Classe {

    constructor(nom, description, icone, id) {

        this._nom = nom;
        this._description = description;
        this._icone = icone;
        this._id = id;
    }

    get id() {
        return this._id
    }

    get nom() {
        return this._nom
    }

    get description() {
        return this._description
    }

    get icone() {
        return this._icone
    }

    toJSON() {
        return {
            id: this._id,
            nom: this._nom,
            description: this._description,
            icone: this._icone,
        }
    }
}


