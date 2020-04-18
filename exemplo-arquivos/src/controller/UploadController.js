const fs = require ('fs');

const controller = {

    realizarUpload: (req, res) => {
        
        const {name,  mimetype, data } = req.files['arquivo'];

        /**
         * Cria o nome do arquivo temporário
         */

        const nomeArquivo = `${new Date().getTime()}`;
        console.log(nomeArquivo);

        /**
         * cria o arquivo temporário
         */
        fs.writeFileSync(nomeArquivo, data);

        /**
         * Cria o stream de leitura do arquivo temporário
         */
        const readStream = fs.createReadStream(nomeArquivo);

        /**
         * Realiza a gravação do arquivo no baco de dados
         */

        const Arquivo = require ('../models/Arquivo')
        const metadados = {filename: name, contentType: mimetype };
        Arquivo.write(metadados, readStream, (erro, arquivo) => {
            fs.unlinkSync(nomeArquivo);
            if(erro){
                console.log(erro);
                res.status(500).json({ erro: 'Erro ao tentar salvar o arquivo'})
            }else{
            res.status(201).json({mensagem: 'Arquivo salvo', id: arquivo_id});
            }
        })        
        
    }
};


module.exports = controller;