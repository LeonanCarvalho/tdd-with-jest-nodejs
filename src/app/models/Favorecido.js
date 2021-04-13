/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */
module.exports = (sequilize, DataTypes) => {
    const Favorecido = sequilize.define('Favorecido', {
        name: DataTypes.STRING,
        doc: DataTypes.STRING,
        email: DataTypes.STRING,
    });

    Favorecido.associate = function (models) {
        //Relacionamento 1:N para Contas Bancárias
        Favorecido.hasMany(models.BancoDoFavorecido, {as: 'favorecido_banco'})
    };

    return Favorecido;
}
