const controller = {

    realizarDownload: (req, res) => {
        const id = req.params.id;

        const Arquivo = require('../models/Arquivo');
        Arquivo.findById(id, (erro, anexo) => {
            if (erro) {
                console.log(erro);
                res.status(500).json({ mensagem: 'Erro ao tentar fazer o download' });
            } else {
                if (anexo) {
                    const nomeArquivo = anexo.filename;
                    const readStream = anexo.read(); 
                    /**
                     * Realiza o download
                     */
                    res.attachment(nomeArquivo);
                    readStream.pipe(res);
                } else {
                    res.status(404).json({ mensagem: 'Arquivo não encontrado' });
                }
            }
        });
    },    

    listarTodosArquivos: (req, res) => {
        const Arquivo = require('../models/Arquivo');
        Arquivo
            .find()
            .then(
                resposta => {
                    const arquivos = resposta.map(
                        arquivo => {
                            return {
                                tamanhoEmBytes: arquivo.length,
                                nome: arquivo.filename,
                                dataUpload: arquivo.uploadDate,
                                tipo: arquivo.contentType,
                                id: arquivo._id
                            };
                        }
                    );
                    res.json(arquivos);
                }
            )
            .catch(erro => {
                console.log(erro);
                res.status(500).json({ mensagem: 'Erro ao listar os arquivos'});
            });
    }
};

module.exports = controller;