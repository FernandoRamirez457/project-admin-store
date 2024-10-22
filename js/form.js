import {
  configurePost,
  configurePut,
  configurePatch,
  disableAllInputs,
  toggleEditIcons,
} from "./assets/formUtils.js";

const btnMethods = document.querySelectorAll(".btnpost, .btnput, .btnpatch");
const inputs = document.querySelectorAll("input, select, textarea");
const form = document.querySelector("form");
const editIcons = document.querySelectorAll(".edit-icon");
const titleForm = document.querySelector(".container-title h1");

const modal = document.querySelector(".modal-overlay");
const overlay = document.querySelector(".container-form");
const closeModalBtn = document.querySelector(".close-modal");

const openModal = () => {
  modal.style.display = "block";
  overlay.style.display = "block";
};

export const closeModal = () => {
  modal.style.display = "none";
  overlay.style.display = "none";
};

closeModalBtn.addEventListener("click", closeModal);

btnMethods.forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal();
    const method = btn.id;

    inputs.forEach((input) => {
      input.classList.remove("patch-mode");
    });

    switch (method) {
      case "post":
        titleForm.textContent = "New Product";
        configurePost(inputs, (show) => toggleEditIcons(editIcons, show));
        break;

      case "put":
        titleForm.textContent = "Update Product";
        configurePut(inputs, (show) => toggleEditIcons(editIcons, show));
        break;

      case "patch":
        titleForm.textContent = "Update Product";
        configurePatch(inputs, editIcons, toggleEditIcons, disableAllInputs);
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

document.getElementById("fimage").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const preview = document.getElementById("preview-image");

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
