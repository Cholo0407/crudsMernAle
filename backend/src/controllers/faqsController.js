import faqsModel from "../models/faqs.js";

const faqsController = {};

//SELECT
faqsController.getfaqs = async (req, res) => {
    try {
        const faqs = await faqsModel.find()
        res.status(200).json(faqs)
    } catch (error) {
        console.log("error: "+error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

//INSERT
faqsController.postfaqs = async (req, res) => {
    const { question, answer, level, isActive } = req.body;

    try {
        //Validaciones
        //hay campos vacios
        if(!question || !answer || !level || !isActive){
            return res.status(400).json({message: "Please fill in all the blanks"})
        }
        //Nivel
        if(level < 1 || level > 10){
            return res.status(400).json({message: "Level needs to be beetween 1 and 10"})
        }
        //Longitud
        if(question.length < 4 || answer.length < 4){
            return res.status(400).json({message: "To short"})
        }

        //guardar
        const newFaqs = new faqsModel({
            question, 
            answer, 
            level, 
            isActive,
        })
        newFaqs.save();
        return res.status(200).json({message: "faq saved"})
    } catch (error) {
        console.log("error: "+error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

//UPDATE
faqsController.updatefaqs = async (req, res) => {
    const { question, answer, level, isActive } = req.body;
    try {
        if(level < 1 || level > 10){
            return res.status(400).json({message: "Level needs to be beetween 1 and 10"})
        }

        if(question.length < 4 || answer.length < 4){
            return res.status(400).json({message: "To short"})
        }

        const faqsUpdated = await faqsModel.findByIdAndUpdate(
            req.params.id,
            { question, answer, level, isActive },
            {new: true}
        )

        if (!faqsUpdated){
            return res.status(400).json({message: "faqs not found"})
        }

        res.status(200).json({message: "faq updated"})
    } catch (error) {
        console.log("error: "+error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

//DELETE
faqsController.deletefaqs = async (req, res) => {
    try {
        const deleteFaqs = await faqsModel.findByIdAndDelete(req.params.id);

        if(!deleteFaqs){
            return res.status(400).json({message: "faq not found"})
        }

        res.status(200).json({message: "faq deleted"})
    } catch (error) {
        console.log("error: "+error)
        res.status(500).json({message: "Internal Server Error"})
    }
}