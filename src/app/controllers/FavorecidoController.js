const {Favorecido} = require('../models')
const {paginate} = require('../utils/SequelizeUtils')

class FavorecidoController {
    async create(req, res) {


        return res.status(200).send()
    }

    async update(req, res) {

        return res.status(200).send()
    }

    async delete(req, res) {
        return res.status(200).send()
    }

    async get(req, res) {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({message: "O ID do Favorecido está incorreto"})
        }

        const favorecido = await Favorecido.findOne({where: {id: id}})

        if (!favorecido) {
            return res.status(404).json({message: "Favorecido não encontrado"})
        }
        return res.status(200).json({
            favorecido
        })
    }

    async list(req, res) {
        const pageSize = 10;
        let offset = 0;

        if (req.params.page) {
            offset = parseInt(req.params.page) - 1;
            if(offset < 0){
                offset = 0;
            }
        }

        Favorecido.findAndCountAll(
            paginate({},
                {offset, pageSize}
            )
        )
            .then(async result => {
                return res.status(200).send(result)
            })
            .catch(async err => {
                return res.status(500).send(err)
            })


    }
}

module.exports = new FavorecidoController()
