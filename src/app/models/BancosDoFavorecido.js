/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */
module.exports = (sequilize, DataTypes) => {
  const BancoDoFavorecido = sequilize.define('BancoDoFavorecido', {
    agencia: DataTypes.STRING,
    digito: DataTypes.STRING,
    id_favorecido: DataTypes.INTEGER,
    cod_banco: DataTypes.INTEGER,
  }, {});

  BancoDoFavorecido.associate = function (models) {
    //Relacionamento 1:1 Favorecido
    BancoDoFavorecido.belongsTo(models.Favorecido,
      {
        foreignKey: 'id_favorecido',
        as: 'favorecido'
      });
  };

  return BancoDoFavorecido;
};
