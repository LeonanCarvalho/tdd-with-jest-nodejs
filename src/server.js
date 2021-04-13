/**
 * A aplicação está separada do server porque não quero que durante os testes
 * a porta seja alocada.
 * Eu quero que quando os testes estiverem rodando não seja necessário colocar o servidor online
 *
 * @type {Express}
 */
const app = require('./app');

app.listen(process.env.PORT || 3000);
