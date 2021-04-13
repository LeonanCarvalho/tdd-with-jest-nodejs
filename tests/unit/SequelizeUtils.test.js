const {paginate} = require('../../src/app/utils/SequelizeUtils')

describe("SequelizeUtils unit", () => {
    it("should create paginate object", async () => {
        const page = 1;
        const pageSize = 10
        const paginateObj = paginate({where: {id: 1}},
            {page, pageSize}
        )

        expect(paginateObj).toHaveProperty("where")
        expect(paginateObj.offset).toBe(10)
        expect(paginateObj.limit).toBe(10)
    })
})
