const commentModel = require('../model/commentModel');


const getIdComment = (req, res) => {
    const id = parseInt(req.params.id);
    const commentData = commentModel.getIdComment(id);

    if (commentData) {
        res.json(commentData);
    } else {
        res.status(404).json({ mensaje: "Comentario no encontrado" });
    }
};

module.exports = {
    getIdComment
};
