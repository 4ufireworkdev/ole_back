// properties-rent.js
const rentSearch = document.getElementById("rentSearch");
const rentStatus = document.getElementById("rentStatus");
const rentZone = document.getElementById("rentZone");
const rentType = document.getElementById("rentType");


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
  rentZone.innerHTML = htm;
}

async function GetDataAllRentals() {
  let data = {
    description: rentSearch.value,
    status: rentStatus.value,
    zone: rentZone.value,
    type: rentType.value,
  };
  let resProperty = await callXMLHttpRequestMethod(
    "POST",
    `${apiPort.apiGetAllRentals}`,
    data
  );
  if (resProperty.statusCodeText == textRespone.ok.CodeText) {
    let htm = "";
    for (let i = 0; i < resProperty.data.length; i++) {
      let data = resProperty.data[i];
      htm += `<tr>
                    <td>
                      <div class="table-thumb">
                        <img src="${
                          uat + JSON.parse(data.images)[0]
                        }" alt="บ้าน" />
                      </div>
                    </td>
                    <td>${data.property_name}</td>
                    <td>${data.zone_name}</td>
                    <td>${formatMoney(data.monthly_rent)}</td>
                    <td>${
                      data.rental_type == 1
                        ? "รายวัน"
                        : data.rental_type == 2
                        ? "รายเดือน"
                        : "รายปี"
                    }</td>
                    <td>${
                      data.status == "available"
                        ? '<span class="badge badge--success">ว่าง</span>'
                        : data.status == "reserved"
                        ? '<span class="badge badge--warning">จองแล้ว</span>'
                        : '<span class="badge badge--danger">ให้เช่าแล้ว</span>'
                    }</td>
                    
                    <td>
                    <a href="properties-rent-form.html?action=edit&id=${
                      data.id
                    }" class="btn btn--warning btn--small">แก้ไข</a>
                    <button class="btn btn--danger btn--small" onclick="deleteBtn('${
                      data.id
                    }')">ลบ</button>
                  </td>
            <tr>`;
    }
    el("table_list").innerHTML = htm;
  } else if (resProperty.statusCodeText == "401") {
    Swal.fire({
      title: "แจ้งเตือน",
      text: resProperty.description,
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
      text: resProperty.description,
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
        `${apiPort.apiDeleteRental}/${id}`,
        {}
      );
      Swal.fire("แจ้งเตือน", resDelete.description, "success").then(
        (result) => {
          if (result.value) {
            GetDataAllRentals();
          }
        }
      );
    }
  });
}
GetZone();
GetDataAllRentals();
