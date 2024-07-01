document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    document.querySelector('.loader').style.display = 'block'; // Mostra o ícone de carregamento
    // ... Lógica para enviar o formulário (AJAX, etc.)
});


commentForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir o comportamento padrão de submissão
    // Restante do código para adicionar o comentário
});



const displayComment = (comment) => {
    // Criação do elemento de comentário
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `<strong>${comment.author}</strong><p>${comment.text}</p>`;
    commentsList.appendChild(commentElement);

    // Rolar para a seção de comentários após adicionar o novo comentário
    commentElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
};