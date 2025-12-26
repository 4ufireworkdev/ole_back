// contracts-form.js
const contractFormProperty = document.getElementById("contractFormProperty");
const contractFormTenant = document.getElementById("contractFormTenant");
const contractFormStartDate = document.getElementById("contractFormStartDate");
const contractFormEndDate = document.getElementById("contractFormEndDate");
const contractFormRent = document.getElementById("contractFormRent");
const contractFormDepositMonths = document.getElementById(
  "contractFormDepositMonths"
);
const contractFormDepositAmount = document.getElementById(
  "contractFormDepositAmount"
);
const contractFormStatus = document.getElementById("contractFormStatus");
const contractFormType = document.getElementById("contractFormType");
const contractFormDueDay = document.getElementById("contractFormDueDay");
const contractFormNotes = document.getElementById("contractFormNotes");
const contractFormAttachment = document.getElementById(
  "contractFormAttachment"
);
const landDocument = document.getElementById("landDocument");
let id = 0;

async function GetProperty() {
  let resProperty = await callXMLHttpRequestMethod(
    "POST",
    `${apiPort.apiGetAllRentals}`,
    {}
  );
  let htm = "<option value=''>เลือกบ้านเช่า</option>";
  if (resProperty.statusCodeText == textRespone.ok.CodeText) {
    for (let i = 0; i < resProperty.data.length; i++) {
      htm += `<option value='${resProperty.data[i].id}'>${resProperty.data[i].property_name}</option>`;
    }
  }
  contractFormProperty.innerHTML = htm;
}

async function GetTenants() {
  let resTenants = await callXMLHttpRequestMethod(
    "POST",
    `${apiPort.apiGetAllTenants}`,
    {}
  );
  let htm = "<option value=''>เลือกผู้เช่า</option>";
  if (resTenants.statusCodeText == textRespone.ok.CodeText) {
    for (let i = 0; i < resTenants.data.length; i++) {
      htm += `<option value='${resTenants.data[i].id}'>${
        resTenants.data[i].first_name + " " + resTenants.data[i].last_name
      }</option>`;
    }
  }
  contractFormTenant.innerHTML = htm;
}

async function startFunction() {
  let params = await getParamInGetUrl();
  if (params.action == "edit") {
    id = params.id;
    let resEdit = await callXMLHttpRequestMethod(
      "GET",
      `${apiPort.apiGetContractById}/${params.id}`,
      {}
    );
    if (resEdit.statusCodeText == textRespone.ok.CodeText) {
      contractFormProperty.value = resEdit.data[0].property_id;
      contractFormTenant.value = resEdit.data[0].tenant_id;
      contractFormStartDate.value = formatDate(resEdit.data[0].start_date);
      contractFormEndDate.value = formatDate(resEdit.data[0].end_date);
      contractFormRent.value = resEdit.data[0].monthly_rent;
      contractFormDepositMonths.value = resEdit.data[0].renewal_count;
      contractFormDepositAmount.value = resEdit.data[0].deposit_amount;
      contractFormStatus.value = resEdit.data[0].status;
      contractFormType.value = resEdit.data[0].payment_method;
      contractFormDueDay.value = resEdit.data[0].payment_due_date;
      contractFormNotes.value = resEdit.data[0].notes;
      landDocument.innerHTML =
        resEdit.data[0].documents && resEdit.data[0].documents != "null"
          ? `<a href="${
              uat + JSON.parse(resEdit.data[0].documents)
            }" target="_blank">โหลดเอกสาร</a>`
          : "";
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

async function AddContracts() {
  let documents = "";
  let checkLengthDocument = document.getElementById("contractFormAttachment");
  if (checkLengthDocument.files.length > 0) {
    for (let i = 0; i < checkLengthDocument.files.length; i++) {
      let resDataUpload = await callXMLHttpRequestUploadFile(
        "POST",
        `${apiPort.apiUploadFile}`,
        document.getElementById("contractFormAttachment").files[i]
      );

      if (resDataUpload.fileUrl) {
        documents = resDataUpload.fileUrl;
      }
    }
  }
  let data = {
    id: id,
    property_id: contractFormProperty.value,
    tenant_id: contractFormTenant.value,
    start_date: contractFormStartDate.value,
    end_date: contractFormEndDate.value,
    monthly_rent: contractFormRent.value,
    renewal_count: contractFormDepositMonths.value,
    deposit_amount: contractFormDepositAmount.value,
    status: contractFormStatus.value,
    payment_method: contractFormType.value,
    payment_due_date: contractFormDueDay.value,
    notes: contractFormNotes.value,
    documents,
  };
  let resEdit;
  if (id == 0) {
    resEdit = await callXMLHttpRequestMethod(
      "POST",
      `${apiPort.apiCreateContract}`,
      data
    );
  } else {
    resEdit = await callXMLHttpRequestMethod(
      "PUT",
      `${apiPort.apiUpdateContract}/${id}`,
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
        window.location.href = "contracts.html";
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
  documents = "";
}
GetProperty();
GetTenants();
startFunction();
