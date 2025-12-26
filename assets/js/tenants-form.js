// tenants-form.js
const tenantFormFirstName = document.getElementById("tenantFormFirstName");
const tenantFormLastName = document.getElementById("tenantFormLastName");
const tenantFormPhone = document.getElementById("tenantFormPhone");
const tenantFormEmail = document.getElementById("tenantFormEmail");
const tenantFormEmergencyContact = document.getElementById("tenantFormEmergencyContact");
const tenantFormEmergencyPhone = document.getElementById("tenantFormEmergencyPhone");
const tenantFormAddress = document.getElementById("tenantFormAddress");


let id =0 ;


async function startFunction() {
  let params = await getParamInGetUrl();
  if (params.action == "edit") {
    id = params.id;
    let resEdit = await callXMLHttpRequestMethod(
      "GET",
      `${apiPort.apiGetTenantById}/${params.id}`,
      {}
    );
    if (resEdit.statusCodeText == textRespone.ok.CodeText) {
      tenantFormFirstName.value = resEdit.data[0].first_name;
      tenantFormLastName.value = resEdit.data[0].last_name;
      tenantFormPhone.value = resEdit.data[0].phone;
      tenantFormEmail.value = resEdit.data[0].email;
      tenantFormEmergencyContact.value = resEdit.data[0].emergency_contact;
      tenantFormEmergencyPhone.value = resEdit.data[0].emergency_phone;
      tenantFormAddress.value = resEdit.data[0].current_address;
    } else if (resEdit.statusCodeText == "401") {
      Swal.fire({
        title: "แจ้งเตือน",
        text: resEdit.description,
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("role");
          window.location.href = "../login.html";
        }
      });
    } else {
      Swal.fire({
        title: "แจ้งเตือน",
        text: resEdit.description,
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          el("username").value = "";
          el("password").value = "";
          el("secert").value = "";
        }
      });
    }
  }
}

async function Addtenants() {
  let data = {
    id: id,
    first_name:tenantFormFirstName.value,
    last_name:tenantFormLastName.value,
    phone:tenantFormPhone.value,
    email:tenantFormEmail.value,
    emergency_contact:tenantFormEmergencyContact.value,
    emergency_phone:tenantFormEmergencyPhone.value,
    current_address:tenantFormAddress.value
    
  };
  let resEdit;
  if (id == 0) {
    resEdit = await callXMLHttpRequestMethod(
      "POST",
      `${apiPort.apiCreateTenant}`,
      data
    );
  } else {
    resEdit = await callXMLHttpRequestMethod(
      "PUT",
      `${apiPort.apiUpdateTenant}/${id}`,
      data
    );
  }

  if (resEdit.statusCodeText == textRespone.ok.CodeText) {
    Swal.fire({
      title: "แจ้งเตือน",
      text: resEdit.description,
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.value) {
        window.location.href = "tenants.html";
      }
    });
  } else if (resEdit.statusCodeText == "401") {
    Swal.fire({
      title: "แจ้งเตือน",
      text: resEdit.description,
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.value) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("role");
        window.location.href = "../login.html";
      }
    });
  } else {
    Swal.fire({
      title: "แจ้งเตือน",
      text: resEdit.description,
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  }
}
startFunction();