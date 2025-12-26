// contracts.js
const contractsSearch = document.getElementById("contractsSearch");
const contractsStatus = document.getElementById("contractsStatus");

async function GetDataAllContracts() {
  let data = {
    description: contractsSearch.value,
    status: contractsStatus.value,
  };
  let resLand = await callXMLHttpRequestMethod(
    "POST",
    `${apiPort.apiGetAllContracts}`,
    data
  );
  if (resLand.statusCodeText == textRespone.ok.CodeText) {
    let htm = "";
    for (let i = 0; i < resLand.data.length; i++) {
      let data = resLand.data[i];
      htm += `<tr>
                  <td>${data.property_name}</td>
                  <td>${data.first_name+' '+data.last_name}</td>
                  <td>${formatDate(data.start_date)}</td>
                  <td>${formatDate(data.end_date)}</td>
                  <td>${
                    data.status == "active"
                      ? '<span class="badge badge--success">ใช้งานอยู่</span>'
                      : data.status == "pending"
                      ? '<span class="badge badge--warning">รออนุมัติ</span>'
                      : data.status == "expired"
                      ? '<span class="badge badge--danger">หมดอายุ</span>'
                      : '<span class="badge badge--danger">ยกเลิก</span>'
                  }</td>
                  <td>
                    <a href="contracts-form.html?action=edit&id=${
                      data.id
                    }" class="btn btn--warning btn--small">รายละเอียด/แก้ไข</a>
                    <button class="btn btn--danger btn--small" onclick="deleteBtn('${
                      data.id
                    }')">ยกเลิก</button>
                  </td>
                </tr>`;
    }
    el("table_list").innerHTML = htm;
  } else if (resLand.statusCodeText == "401") {
    Swal.fire({
      title: "แจ้งเตือน",
      text: resLand.description,
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
      text: resLand.description,
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

async function deleteBtn(id) {
  Swal.fire({
    title: "แจ้งเตือน",
    text: "คุณต้องการที่จะลบหรือไม่ ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "rgba(160, 152, 152, 1)",
    confirmButtonText: "Delete",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let resDelete = await callXMLHttpRequestMethod(
        "DELETE",
        `${apiPort.apiDeleteContract}/${id}`,
        {}
      );
      Swal.fire("แจ้งเตือน", resDelete.description, "success").then(
        (result) => {
          if (result.value) {
            GetDataAllContracts();
          }
        }
      );
    }
  });
}

GetDataAllContracts();
