// DESABILITAR INPUTS
export const disableAllInputs = (inputs) => {
  inputs.forEach((input) => {
    input.disabled = true;
  });
};

// EXIBIR OU OCULTAR ICON EDIT
export const toggleEditIcons = (editIcons, show) => {
  editIcons.forEach((icon) => {
    icon.style.display = show ? "inline" : "none";
  });
};

// CONFIGURANDO FORM POST
export const configurePost = (inputs, toggleEditIcons) => {
  inputs.forEach((input) => {
    input.disabled = false;
    input.required = true;
  });
  document.getElementById("fid").disabled = true;
  document.getElementById("fid").value = "";
  toggleEditIcons(false);
};

// CONFIGURANDO FORM PUT
export const configurePut = (inputs, toggleEditIcons) => {
  inputs.forEach((input) => {
    input.disabled = false;
    input.required = true;
  });
  document.getElementById("fid").disabled = true;
  document.getElementById("fid").value = "ID123";
  toggleEditIcons(false);
};

// CONFIGURANDO FORM PATCH
export const configurePatch = (inputs, editIcons, toggleEditIcons, disableAllInputs) => {
  disableAllInputs(inputs);
  toggleEditIcons(editIcons, true);
  document.querySelectorAll("input[type='date']").forEach((input) => {
    input.classList.add("patch-mode");
  });
};
