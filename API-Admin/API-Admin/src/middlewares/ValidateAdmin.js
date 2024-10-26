const validateAdmin = (req, res, next) => {
    const { nome, email, senha } = req.body;
  
    // preenchido | não preenchido
    if (!nome || !email || !senha) {
      return res.status(400).json({
        msg: "Campos invalidos.",
      });
    }
  
    // Permissão para avançar
    return next();
  };
  
  const validateAdminId = (req, res, next) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({
        msg: "Falta parametro",
      });
    }
  
    return next();
  };
  
  module.exports = { validateAdmin, validateAdminId };