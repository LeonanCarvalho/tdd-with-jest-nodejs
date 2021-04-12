/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */
module.exports = (sequilize, DataTypes) => {
    const Banco = sequilize.define('Banco', {
        code: DataTypes.STRING,
        name: DataTypes.STRING
    });

    return Banco;
}
