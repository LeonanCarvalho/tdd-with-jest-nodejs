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

    return Favorecido;
}
