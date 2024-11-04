import { initFormModal, closeModal } from "./form.js";
import { createProductCard } from "./assets/createCardProduct.js";
import { methodProductPost } from "./method/methodPost.js";
import { methodProductPut } from "./method/methodPut.js";
import { methodProductPatch } from "./method/methodPatch.js";
import { methodProductDelete } from "./method/methodDelete.js";

const containerProduct = document.querySelector(".container-product");
const form = document.querySelector("form");
let methodSelect = ""; // Inicializa com uma string vazia

async function getProdutos(url = "http://localhost/loja/Controller/produto.php") {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro: ${response.statusText}`);

    const data = await response.json();
    console.log("Produtos recebidos:", data);

    containerProduct.innerHTML = "";
    data.forEach((product) => {
      const productHTML = createProductCard(product);
      containerProduct.appendChild(productHTML);
    });

    localStorage.setItem("produtos", JSON.stringify(data));
  } catch (error) {
    console.error("Erro:", error.message);
  }

  initFormModal();
  initMethodSelect(); // Inicializa a seleção do método
}

function initMethodSelect() {
  document.querySelectorAll(".btnpost, .btnput, .btnpatch, .btndelete").forEach((btn) => {
    btn.addEventListener("click", () => {
      methodSelect = btn.classList[2]; // Obtém a classe que indica o método
      console.log("Método selecionado:", methodSelect); // Log do método selecionado

      if (methodSelect === "DELETE") {
        const productId = btn.id;
        confirmDelete(productId); // Chama a função de confirmação de exclusão
      }
    });
  });
}

function confirmDelete(productId) {
  Swal.fire({
    title: "Tem certeza?",
    text: "Você não poderá reverter essa ação!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, excluir!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await handleDelete(productId); // Chama a função de delete com o ID
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Produto excluído com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
}

async function handleDelete(productId) {
  try {
    const jsonResponse = await methodProductDelete(productId);
    console.log("Resposta do servidor para DELETE:", jsonResponse);
    getProdutos(); // Atualiza a lista de produtos
  } catch (error) {
    console.error("Erro ao deletar o produto:", error.message);
  }
}

function showSuccessAlert(method) {
  let title = "";

  switch (method) {
    case "POST":
      title = "Produto adicionado com sucesso!";
      break;
    case "PUT":
      title = "Produto atualizado com sucesso!";
      break;
    case "PATCH":
      title = "Produto modificado com sucesso!";
      break;
  }

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500
  });
}

function initButtonEvents() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Extrai os dados do formulário
    const dados = Object.fromEntries(new FormData(form).entries());
    console.log("Dados do formulário:", dados);

    try {
      let jsonResponse;

      // Chama a função correspondente com base no método selecionado
      switch (methodSelect) {
        case "POST":
          console.log("Método: POST");
          jsonResponse = await methodProductPost(dados);
          showSuccessAlert("POST");
          break;
        case "PUT":
          console.log("Método: PUT");
          jsonResponse = await methodProductPut(dados);
          showSuccessAlert("PUT");
          break;
        case "PATCH":
          console.log("Método: PATCH");
          jsonResponse = await methodProductPatch(dados);
          showSuccessAlert("PATCH");
          break;
        default:
          throw new Error("Método não suportado.");
      }

      console.log("Resposta do servidor:", jsonResponse);
      closeModal();
      form.reset(); // Limpa todos os campos do formulário
      getProdutos(); // Atualiza a lista de produtos
    } catch (error) {
      console.error("Erro ao enviar os dados:", error.message);
    }
  });
}

// Chama a função para buscar produtos ao carregar
getProdutos();
initButtonEvents(); // Inicia eventos dos botões
