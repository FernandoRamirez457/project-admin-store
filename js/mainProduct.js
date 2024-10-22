import { closeModal } from "./form.js";

const btnMethods = document.querySelectorAll(".btnpost, .btnput, .btnpatch, .btndelete");
const form = document.querySelector("form");
let methodSelect;

btnMethods.forEach(btn => {
  btn.addEventListener('click', () => {
    methodSelect = btn.id;
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const imagemFile = formData.get('imagemURL'); // Corrigido para pegar o arquivo de imagem
  console.log(imagemFile);

  const dados = {
    nome: formData.get('nome'),
    marca: formData.get('marca'),
    preco: formData.get('preco'),
    qtd: formData.get('qtd'),
    descricao: formData.get('descricao'),
    status: formData.get('status'),
    validade: new Date().toISOString().split('T')[0]
  };

  // Faz o upload da imagem se existir
  if (imagemFile) {
    try {
      const imagemURL = await uploadImage(imagemFile); // Função para fazer o upload da imagem
      dados.imagemURL = imagemURL; // Apenas a URL da imagem
    } catch (error) {
      console.error(error);
      return; // Impede o envio se o upload falhar
    }
  }

  // Aqui você pode adicionar a lógica para enviar os dados ao banco de dados
  console.log(JSON.stringify(dados, null, 2)); // Exibe o objeto em formato JSON

  // Fecha o modal após a confirmação
  closeModal();
});

// Função para fazer o upload da imagem
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('imagem', file);

  const response = await fetch('../img/produtos', { // Altere para a rota correta se necessário
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar a imagem');
  }

  // Supondo que o servidor retorne a URL da imagem
  const data = await response.json();
  return data.url; // Ajuste conforme a estrutura do seu retorno
}
