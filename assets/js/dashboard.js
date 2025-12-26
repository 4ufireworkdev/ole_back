// dashboard.js
async function Dashboard() {
  let resDashboard = await callXMLHttpRequestMethod(
    "GET",
    `${apiPort.apiDashboard}`,
    {}
  );
  if (resDashboard.statusCodeText == textRespone.ok.CodeText) {
    el("SellAllHouse").innerHTML = resDashboard.data.SellAllHouse;
    el("AllZone").innerHTML = resDashboard.data.AllZone;
    el("AllLand").innerHTML = resDashboard.data.AllLand;
    el("AllRental").innerHTML = resDashboard.data.AllRental;
    let htm = "";
    for (let i = 0; i < resDashboard.data.ListSellAllHouse.length; i++) {
      let data = resDashboard.data.ListSellAllHouse[i];
      htm += `<tr>
                    <td>
                      <div class="table-thumb">
                        <img src="${JSON.parse(data.images)}" alt="บ้าน" />
                      </div>
                    </td>
                    <td>${data.property_name}</td>
                    <td>${data.zone_name}</td>
                    <td>${formatMoney(data.price)}</td>
                    <td>${formatDate(data.updated_at)}</td>
                    <td>${data.agent_name}</td>
            <tr>`;
    }
    el("table_list").innerHTML = htm;
  } else if (resDashboard.statusCodeText == "401") {
    Swal.fire({
      title: "แจ้งเตือน",
      text: resDashboard.description,
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
      text: resDashboard.description,
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

Dashboard();
