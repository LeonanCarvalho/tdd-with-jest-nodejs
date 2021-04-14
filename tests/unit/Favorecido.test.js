const truncate = require('../utils/truncate');
const FavorecidoFactory = require('../factories/FavorecidoFactory');

describe('Favorecido Unit', () => {
    afterAll(async () => {
        await truncate();
    });

    it('should create a Favorecido with valid Person data', async () => {
        const favorecido = await FavorecidoFactory.create('FavorecidoPF', {});

        expect(favorecido)
          .toHaveProperty('id');
    });

    it('should create a Favorecido with valid Company data', async () => {
        const favorecido = await FavorecidoFactory.create('FavorecidoPJ', {});

        expect(favorecido)
          .toHaveProperty('id');
    })

})
