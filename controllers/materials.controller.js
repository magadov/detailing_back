const Material = require('/models/Material.model');

module.exports.materialsController = {
    addMaterials: async (req, res) => {
        const { name, price, volumeType, left, direction } = req.body;
        try {
            const material = await Material.create({
                name,
                price,
                volumeType,
                left,
                direction
            })
            res.json(material)
        }catch (e) {
            res.json(e.message)
        }
    }
}


