const Router = require('express');
const sample = require('./Models/userdetails.js')
var router = Router();
router.post('/create', async (req, res) => {
    try {
        const data = req.body;
        const result = await sample.create(data);
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json();
    }
})

router.get('/read/:id', async (req, res) => {


    const id = req.params.id;
    console.log(id);
    const details = await sample.findOne({ userid: id });
    // const details = await sample.find({});
    console.log("details", details);


    res.json(details);

});

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await sample.updateOne({ userid: id }, updatedData);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteData = req.body;
        const result = await sample.deleteOne({ userid: id }, deleteData, { new: true });
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
});



module.exports=router;