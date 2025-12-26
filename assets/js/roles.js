// roles.js
const rolesSearch = document.getElementById("rolesSearch");


async function GetDataAllRole() {
  let data = {
    description: rolesSearch.value
  };
  let resLand = await callXMLHttpRequestMethod(
    "POST",
    `${apiPort.apiGetAllRoles}`,
    data
  );
  if (resLand.statusCodeText == textRespone.ok.CodeText) {
    let htm = "";
    for (let i = 0; i < resLand.data.length; i++) {
      let data = resLand.data[i];
      htm += `<tr>
                  <td>${data.license_number}</td>
                  <td>${data.agent_name}</td>
                  <td>${data.phone}</td>
                  <td>${data.areas}</td>
                  <td>
                    <a href="roles-form.html?action=edit&id=${
                      data.id
                    }" class="btn btn--warning btn--small">แก้ไข</a>
                    <button class="btn btn--danger btn--small" onclick="deleteBtn('${
                      data.id
                    }')">ลบ</button>
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
        `${apiPort.apiDeleteRoles}/${id}`,
        {}
      );
      Swal.fire("แจ้งเตือน", resDelete.description, "success").then(
        (result) => {
          if (result.value) {
            GetDataAllRole();
          }
        }
      );
    }
  });
}
GetDataAllRole();