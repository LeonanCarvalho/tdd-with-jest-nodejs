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
    });

    return BancoDoFavorecido;
}
