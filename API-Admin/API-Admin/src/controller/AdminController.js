const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminController = {


    login: async (req, res) => {
        try {
            const { email, senha } = req.body;
            const admin = await Admin.findOne({ where: { email } });

            if (!admin) {
                return res.status(400).json({
                    msg: 'Email ou senha incorretos'
                });
            };

            const isValid = await bcrypt.compare(senha, admin.senha);
            if (!isValid) {
                return res.status(400).json({
                    msg: 'Email ou senha incorretos'
                });
            };

            const token = jwt.sign({
                email: admin.email,
                nome: admin.nome,
            }, process.env.SECRET, { expiresIn: '1h' });

            return res.status(200).json({
                msg: 'Login realizado!',
                token
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },

    create: async (req, res) => {
        try {
            const { nome, senha, email } = req.body;

            const hashSenha = await bcrypt.hash(senha, 10);

            const adminCriado = await Admin.create({ nome, senha: hashSenha, email });

            return res.status(200).json({
                msg: "adm criado com sucesso!",
                admin: adminCriado,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, senha, email } = req.body;

            console.log("Atualizando o objeto");
            console.log({ id });
            console.log({ nome, senha, email });

            const adminUpdate = await Admin.findByPk(id);

            if (adminUpdate == null) {
                return res.status(404).json({
                    msg: "adm nao encontrado"
                })
            }

            const updated = await adminUpdate.update({
                nome, senha, email
            });

            if (updated) {
                return res.status(200).json({
                    msg: "adm atualizado com sucesso!",
                });
            }

            return res.status(500).json({
                msg: "erro ao atualizar adm"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },
    getAll: async (req, res) => {
        try {
            const admins = await Admin.findAll();
            return res.status(200).json({
                msg: "adms encontrados!",
                admins,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params;

            const adminEncontrado = await Admin.findByPk(id);

            if (adminEncontrado == null) {
                return res.status(404).json({
                    msg: "adm nao encontrado!",
                });
            }

            return res.status(200).json({
                msg: "adm encontrado com sucesso!",
                admin: adminEncontrado,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },
    delete: async (req, res) => {
        try {

            const { id } = req.params;

            const adminFinded = await Admin.findByPk(id);

            if (adminFinded == null) {
                return res.status(404).json({
                    msg: "adm nao encontrado"
                })
            }
            // Destruindo -> Deletando

            await adminFinded.destroy();

            return res.status(200).json({
                msg: "adm deletado com sucesso!",
                admin: adminFinded,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o Suporte" });
        }
    },
     // Rota, caso esqueça a senha
     forgotPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const admin = await Admin.findOne({ where: { email } });

            if (!admin) {
                return res.status(404).json({ msg: 'adm não encontrado com esse e-mail.' });
            }

            // Gerar um token de redefinição de senha
            const token = jwt.sign({ email: admin.email }, process.env.SECRET);
            await admin.update({ resetPasswordToken: token });

            // Aqui você deve enviar o token para o e-mail do usuário (não implementado aqui)
            return res.status(200).json({ msg: 'E-mail de redefinição de senha enviado.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Erro ao processar a solicitação.' });
        }
    },

    // Rota para redefinir a senha
    resetPassword: async (req, res) => {
        const { token, newPassword } = req.body;

        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            const admin = await Admin.findOne({ where: { email: decoded.email, resetPasswordToken: token } });

            if (!admin) {
                return res.status(400).json({ msg: 'Token inválido.' });
            }

            const hashSenha = await bcrypt.hash(newPassword, 10);
            await admin.update({ senha: hashSenha, resetPasswordToken: null });

            return res.status(200).json({ msg: 'Senha redefinida com sucesso.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Erro ao redefinir a senha.' });
        }
    },
};



module.exports = AdminController;