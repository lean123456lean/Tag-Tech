document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    document.querySelector('.loader').style.display = 'block'; // Mostra o ícone de carregamento
    // ... Lógica para enviar o formulário (AJAX, etc.)
});


