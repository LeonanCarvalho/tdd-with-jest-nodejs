/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */
module.exports = (sequilize, DataTypes) => {
  return sequilize.define('Favorecido', {
    name: DataTypes.STRING,
    doc: DataTypes.STRING,
    email: DataTypes.STRING,
    cod_banco: DataTypes.STRING,
    agencia: DataTypes.STRING,
    agencia_digito: DataTypes.STRING,
    conta: DataTypes.STRING,
    conta_digito: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('Rascunho', 'Validado'),
      defaultValue: 'Rascunho'
    }
  });
};
