let paragrafoSelecionado = null;

function marcarParagrafo(paragrafo) {
    // Limpa a seleção anterior
    limparSelecao();

    // Marca o parágrafo atual
    paragrafo.classList.add('selecionado');
    paragrafoSelecionado = paragrafo;

    // Adiciona box shadow ao parágrafo selecionado
    paragrafoSelecionado.classList.add('card')

    // Exibe os ícones de ação sobre o parágrafo selecionado
    exibirIconesSobreParagrafo(paragrafoSelecionado);
}

function limparSelecao() {
    // Remove a marcação e box shadow do parágrafo anterior
    if (paragrafoSelecionado !== null) {
        paragrafoSelecionado.classList.remove('selecionado');
        limparBoxShadow();
        esconderIcones();
    }
}

function limparBoxShadow() {
    paragrafoSelecionado.classList.remove('card')
}

function exibirIconesSobreParagrafo(paragrafo) {
    let botoesAcoes = document.getElementById('botoes-acoes');

    // Adiciona margem ao corpo para criar espaço para os botões
    document.body.style.marginTop = botoesAcoes.offsetHeight + 'px';

    // Posiciona os ícones acima do parágrafo
    let paragrafoRect = paragrafo.getBoundingClientRect();
    let topPosition = paragrafoRect.top - botoesAcoes.offsetHeight - 30;

    // Garante que os ícones não fiquem sobre o parágrafo
    topPosition = Math.max(topPosition, 0);

    let leftPosition = paragrafoRect.left;

    botoesAcoes.style.left = leftPosition + 'px';
    botoesAcoes.style.top = topPosition + 'px';

    // Exibe os ícones
    botoesAcoes.style.display = 'flex';
}



function esconderIcones() {
    const botoesAcoes = document.getElementById('botoes-acoes');
    
    // Esconde os ícones
    botoesAcoes.style.display = 'none';

    // Remove a margem superior do corpo
    document.body.style.marginTop = '0';
}


function copiarParagrafo() {
    if (paragrafoSelecionado !== null) {
        // Seleciona o conteúdo do parágrafo
        let range = document.createRange();
        range.selectNode(paragrafoSelecionado);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Copia o conteúdo selecionado para a área de transferência
        try {
            document.execCommand('copy');
            document.getElementById('icone-copiar').innerHTML = '<i class="fas fa-check"></i>';
            document.getElementById('texto-copiar').innerText = 'Copiado';
            setTimeout(function() {
                document.getElementById('icone-copiar').innerHTML = '<i class="fas fa-copy"></i>';
                document.getElementById('texto-copiar').innerText = 'Copiar';
            }, 2000); // Reverte para o texto original após 2 segundos

        } catch (err) {
            console.error('Erro ao copiar parágrafo', err);
        }

        // Limpa a seleção
        // window.getSelection().removeAllRanges();
    }
}

function compartilharNoFacebook() {
    copiarParagrafo();

    const textoCopiado = window.getSelection().toString();
    if (textoCopiado) {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href) + '&quote=' + encodeURIComponent(textoCopiado))
    }
}

function compartilharNoInstagram() {
    // Chama a função para copiar o texto antes de compartilhar no Instagram
    copiarParagrafo();

    // Compartilha o texto copiado no Instagram
    const textoCopiado = window.getSelection().toString();
    if (textoCopiado) {
        window.open('https://www.instagram.com/share/?u=https://leonardogiagio.github.io/Plugin-Copiar-Paragrafo/&caption=' + encodeURIComponent(textoCopiado))
    }
}

function compartilharNoWhatsapp() {
    // Chama a função para copiar o texto antes de compartilhar no Whatsapp
    copiarParagrafo();

    // Compartilha o texto copiado no Whatsapp
    const textoCopiado = window.getSelection().toString();
    if (textoCopiado) {
        window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(textoCopiado), '_blank');
    }
}


// Adiciona um ouvinte de eventos para limpar a seleção quando clicar fora dos parágrafos
document.addEventListener('click', function(event) {
    if (!event.target.closest('.paragrafo') && !event.target.closest('.botoes-acoes')) {
        limparSelecao();
    }
});
