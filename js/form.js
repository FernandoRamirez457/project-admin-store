import {
  configurePost,
  configurePut,
  configurePatch,
} from "./assets/formUtils.js";

const modal = document.querySelector(".modal-overlay");
const overlay = document.querySelector(".container-form");
const closeModalBtn = document.querySelector(".close-modal");

const openModal = () => {
  modal.style.display = "block";
  overlay.style.display = "block";
};

export const closeModal = () => {
  const modal = document.querySelector(".container-form");
  const overlay = document.querySelector("#modal-overlay");
  const form = document.querySelector("#product-form");
  const previewImage = document.querySelector("#preview-image");

  // Fecha o modal e o overlay
  modal.style.display = "none";
  overlay.style.display = "none";

  // Limpa os dados do formulário
  form.reset();

  // Remove a imagem de preview
  previewImage.src = "";
  previewImage.style.display = "none";
};


export const initFormModal = () => {
  const btnMethods = document.querySelectorAll(".btnpost, .btnput, .btnpatch");
  const inputs = document.querySelectorAll("input, select, textarea");
  const titleForm = document.querySelector(".container-title h1");
  const editIcons = document.querySelectorAll(".edit-icon");

  closeModalBtn.addEventListener("click", closeModal);

  btnMethods.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal();
      const method = btn.classList[2];
      const idProduct = btn.id; // O ID do produto pode ser utilizado para o PUT e PATCH

      inputs.forEach((input) => {
        input.classList.remove("patch-mode");
      });

      switch (method) {
        case "POST":
          titleForm.textContent = "New Product";
          configurePost(inputs, editIcons);
          break;

        case "PUT":
          titleForm.textContent = "Update Product";
          configurePut(inputs, editIcons, idProduct);
          break;

        case "PATCH":
          titleForm.textContent = "Update Product";
          configurePatch(inputs, editIcons, idProduct);
          break;
      }
    });
  });

  editIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const targetId = icon.getAttribute("data-target");
      const targetInput = document.getElementById(targetId);
      if (targetInput) {
        targetInput.disabled = !targetInput.disabled;
        if (!targetInput.disabled) {
          targetInput.focus(); // Foca no campo habilitado
        }
      }
    });
  });

};
