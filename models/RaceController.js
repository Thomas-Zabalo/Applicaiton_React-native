export default class Race {

    constructor(id, nom, description, icone) {

        this._id = id;

        this._nom = nom;

        this._description = description;

        this._icone = icone;
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


