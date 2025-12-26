// zones-form.js
const zoneFormNameTh = document.getElementById("zoneFormNameTh");
const zoneFormNameEn = document.getElementById("zoneFormNameEn");
const zoneFormColor = document.getElementById("zoneFormColor");
const zoneFormDescTh = document.getElementById("zoneFormDescTh");
const zoneFormDescEn = document.getElementById("zoneFormDescEn");
const zoneFormFeaturesTh = document.getElementById("zoneFormFeaturesTh");
const zoneFormFeaturesEn = document.getElementById("zoneFormFeaturesEn");


let id =0 ;


async function startFunction() {
  let params = await getParamInGetUrl();
  if (params.action == "edit") {
    id = params.id;
    let resEdit = await callXMLHttpRequestMethod(
      "GET",
      `${apiPort.apiGetZoneById}/${params.id}`,
      {}
    );
    if (resEdit.statusCodeText == textRespone.ok.CodeText) {
      zoneFormNameTh.value = resEdit.data[0].zone_name;
      zoneFormNameEn.value = resEdit.data[0].zone_name_en;
      zoneFormColor.value = resEdit.data[0].zone_color;
      zoneFormDescTh.value = resEdit.data[0].zone_description;
      zoneFormDescEn.value = resEdit.data[0].zone_description_en;
      zoneFormFeaturesTh.value = resEdit.data[0].zone_features;
      zoneFormFeaturesEn.value = resEdit.data[0].zone_features_en;

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

async function AddZones() {
  let data = {
    id: id,
    zone_name:zoneFormNameTh.value,
    zone_name_en:zoneFormNameEn.value,
    zone_color:zoneFormColor.value,
    zone_description:zoneFormDescTh.value,
    zone_description_en:zoneFormDescEn.value,
    zone_features:zoneFormFeaturesTh.value,
    zone_features_en:zoneFormFeaturesEn.value
    
  };
  let resEdit;
  if (id == 0) {
    resEdit = await callXMLHttpRequestMethod(
      "POST",
      `${apiPort.apiCreateZone}`,
      data
    );
  } else {
    resEdit = await callXMLHttpRequestMethod(
      "PUT",
      `${apiPort.apiUpdateZone}/${id}`,
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
        window.location.href = "zones.html";
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