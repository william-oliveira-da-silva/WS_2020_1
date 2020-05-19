const socket = io('http://localhost:3000');

const renderizarMensagem = objetoMensagem => {
    const novaLinha = `
        <div>
            <b>${objetoMensagem.usuario}</b>: ${objetoMensagem.mensagem}
        </div>
    `;

    $('#mensagensChat').append(novaLinha);
};

let usuarios = [];

const atualizarListaUsuarios = objetoMensagem => {
    const usuario = objetoMensagem.usuario;
    if(!usuarios.includes(usuario)) {
        usuarios.push(usuario);
        const novoParagrafoUsuario = `<p>${usuario}</p>`;
        $('#listaUsuarios').append(novoParagrafoUsuario);
    }
}

const atualizarTelaChat = (objetoMensagem) => {
    renderizarMensagem(objetoMensagem);
    atualizarListaUsuarios(objetoMensagem);
};

socket.on('mensagensAnteriores', 
    mensagens => mensagens.forEach(m => atualizarTelaChat(m))
);

socket.on('mensagemRecebida', objetoMensagem => {
    atualizarTelaChat(objetoMensagem);
});

$('form').submit(event => {
    event.preventDefault();

    const usuario = $('#usuario').val();
    const mensagem = $('#mensagem').val();
    $('#mensagem').val('');


    const objetoMensagem = { usuario, mensagem };
    socket.emit('enviarMensagem', objetoMensagem);
    atualizarTelaChat(objetoMensagem);
});