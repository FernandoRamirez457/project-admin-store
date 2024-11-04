export const disableAllInputs = (inputs) => {
  // DESABILITA TODOS OS INPUTS, EXCETO O 'fid-hidden'
  inputs.forEach((input) => {
    if (input.id !== "fid-hidden") {
      input.disabled = true;
    }
  });
};

export const toggleEditIcons = (editIcons, show) => {
  // MOSTRA OU OCULTA OS ÍCONES DE EDIÇÃO
  const iconsArray = Array.from(editIcons);
  iconsArray.forEach((icon) => {
    icon.style.display = show ? "inline" : "none";
  });
};

export const configurePost = (inputs, editIcons) => {
  // HABILITA TODOS OS INPUTS E LIMPA VALORES ESPECÍFICOS
  inputs.forEach((input) => {
    input.disabled = false;
    input.required = true;
  });
  document.getElementById("fid").disabled = true;
  document.getElementById("fid").value = "";
  document.getElementById("fid-hidden").value = "";
  toggleEditIcons(editIcons, false);
};

export const configurePut = (inputs, editIcons, id) => {
  // HABILITA TODOS OS INPUTS E DEFINE VALORES PARA O ID ESPECIFICADO
  inputs.forEach((input) => {
    input.disabled = false;
    input.required = true;
  });
  document.getElementById("fid").disabled = true;
  document.getElementById("fid").value = id;
  document.getElementById("fid-hidden").value = id;
  toggleEditIcons(editIcons, false);
};

export const configurePatch = (inputs, editIcons, id) => {
  // HABILITA INPUTS E MOSTRA ÍCONES DE EDIÇÃO, ATUALIZA VALORES
  console.log(inputs);
  document.getElementById("fid").disabled = true;
  document.getElementById("fid").value = id;
  document.getElementById("fid-hidden").value = id;

  disableAllInputs(inputs);
  toggleEditIcons(editIcons, true);
  document.querySelectorAll("input[type='date']").forEach((input) => {
    input.classList.add("patch-mode");
  });

  alterDataFormPatch(inputs, id);
};

function alterDataFormPatch(inputs, id) {
  // ALTERA OS VALORES DOS INPUTS COM BASE NOS DADOS DO LOCAL STORAGE
  let dataLocal = localStorage.getItem("produtos");
  let data = JSON.parse(dataLocal);

  data.forEach((product) => {
    if (id == product.id) {
      inputs.forEach((elemento) => {
        const field = elemento.name;

        if (product.hasOwnProperty(field)) {
          if (field === "imagemURL" && product[field]) {
            const imgPreview = document.querySelector("#preview-image");
            imgPreview.src = product[field];
          } else if (elemento.type !== "file") {
            elemento.value = product[field];
          }
        }
      });
    }
  });
}
