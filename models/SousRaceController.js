export default class SousRace {

    constructor(races_id, nom, description, icone, id) {

        this._races_id = races_id
        this._nom = nom;
        this._description = description;
        this._icone = icone;
        this._id = id;

    }

    get races_id() {
        return this._races_id
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
            races_id: this._races_id,
            id: this._id,
            nom: this._nom,
            description: this._description,
            icone: this._icone,
        }
    }
}


