/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */
module.exports = (sequilize, DataTypes) => {
    const BancoDoFavorecido = sequilize.define('BancoDoFavorecido', {
        agencia: DataTypes.STRING,
        digito: DataTypes.STRING,
        favorecido_id: DataTypes.INTEGER,
        banco_id: DataTypes.INTEGER,
    }, {});

    BancoDoFavorecido.associate = function(models) {
        //Relacionamento 1:1 Favorecido
        BancoDoFavorecido.belongsTo(models.Favorecido,
            {foreignKey: 'favorecido_id', as: 'favorecido'})

        //Relacionamento 1:1 Banco
        BancoDoFavorecido.hasOne(models.Banco,
            {foreignKey: 'banco_id', as: 'banco'})
    };

    return BancoDoFavorecido;
}
