// lands.js
const landsSearch = document.getElementById("landsSearch");
const landsStatus = document.getElementById("landsStatus");
const landsZone = document.getElementById("landsZone");

async function GetZone() {
  let resZone = await callXMLHttpRequestMethod(
    "GET",
    `${apiPort.ApiGetZones}`,
    {}
  );
  let htm = "<option value=''>เลือกโซน</option>";
  if (resZone.statusCodeText == textRespone.ok.CodeText) {
    for (let i = 0; i < resZone.data.length; i++) {
      htm += `<option value='${resZone.data[i].id}'>${resZone.data[i].zone_name}</option>`;
    }
  }
  landsZone.innerHTML = htm;
}

async function GetDataAllLands() {
  let data = {
    description: landsSearch.value,
    status: landsStatus.value,
    zone: landsZone.value
  };
  let resLand = await callXMLHttpRequestMethod(
    "POST",
    `${apiPort.apiGetAllLands}`,
    data
  );
  if (resLand.statusCodeText == textRespone.ok.CodeText) {
    let htm = "";
    for (let i = 0; i < resLand.data.length; i++) {
      let data = resLand.data[i];
      console.log(data.images);
      
      htm += `<tr>
                    <td>
                      <div class="table-thumb">
                        <img src="${
                          uat + JSON.parse(data.images)[0]
                        }" alt="บ้าน" />
                      </div>
                    </td>
                    <td>${data.land_name}</td>
                    <td>${data.zone_name}</td>
                    <td>${formatMoney(data.price)}</td>
                    <td>${data.size_ngan ? data.size_ngan+" งาน ":""}${data.size_wa ? data.size_wa+" ตรว. ":""}</td>
                    <td>${
                      data.status == "available"
                        ? '<span class="badge badge--success">พร้อมขาย</span>'
                        : data.status == "reserved"
                        ? '<span class="badge badge--warning">จองแล้ว</span>'
                        : '<span class="badge badge--danger">ขายแล้ว</span>'
                    }</td>
                    
                    <td>
                    <a href="lands-form.html?action=edit&id=${
                      data.id
                    }" class="btn btn--warning btn--small">แก้ไข</a>
                    <button class="btn btn--danger btn--small" onclick="deleteBtn('${
                      data.id
                    }')">ลบ</button>
                  </td>
            <tr>`;
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
        `${apiPort.apiDeleteLand}/${id}`,
        {}
      );
      Swal.fire("แจ้งเตือน", resDelete.description, "success").then(
        (result) => {
          if (result.value) {
            GetDataAllLands();
          }
        }
      );
    }
  });
}
GetZone();
GetDataAllLands();