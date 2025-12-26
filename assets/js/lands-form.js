// lands-form.js
const landFormZone = document.getElementById("landFormZone");
const landFormSize = document.getElementById("landFormSize");
const landFormNameEn = document.getElementById("landFormNameEn");
const landFormNameTh = document.getElementById("landFormNameTh");
const landFormAddrTh = document.getElementById("landFormAddrTh");
const landFormAddrEn = document.getElementById("landFormAddrEn");
const landFormMaps = document.getElementById("landFormMaps");
const landFormLine = document.getElementById("landFormLine");
const landFormWhatsapp = document.getElementById("landFormWhatsapp");

const landFormPriceThb = document.getElementById("landFormPriceThb");
const landFormPriceUsd = document.getElementById("landFormPriceUsd");
const landFormNgan = document.getElementById("landFormNgan");
const landFormSqWa = document.getElementById("landFormSqWa");

const landFormPhone = document.getElementById("landFormPhone");
const landFormDeedNo = document.getElementById("landFormDeedNo");
const landFormStatus = document.getElementById("landFormStatus");

const landFormDescTh = document.getElementById("landFormDescTh");
const landFormDescEn = document.getElementById("landFormDescEn");
const landFormSpecialFeatures = document.getElementById(
  "landFormSpecialFeatures"
);
const landFormDeedDoc = document.getElementById("landFormDeedDoc");

// const landAmenKitchen = document.getElementById("landAmenKitchen");
// const landAmenBathAllFloors = document.getElementById("landAmenBathAllFloors");
// const landAmenAC = document.getElementById("landAmenAC");
// const landAmenSecurity = document.getElementById("landAmenSecurity");
// const landAmenGarden = document.getElementById("landAmenGarden");
// const landAmenCoveredParking = document.getElementById(
//   "landAmenCoveredParking"
// );
// const landAmenHotWater = document.getElementById("landAmenHotWater");
// const landAmenWifi = document.getElementById("landAmenWifi");
// const landAmenCCTV = document.getElementById("landAmenCCTV");
// const landAmenWasher = document.getElementById("landAmenWasher");
// const landAmenFridge = document.getElementById("landAmenFridge");
// const landAmenFurnished = document.getElementById("landAmenFurnished");
const landAmenOther = document.getElementById("landAmenOther");
const landDocument = document.getElementById("landDocument");

let id =0 ;


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
  landFormZone.innerHTML = htm;
}

async function startFunction() {
  let params = await getParamInGetUrl();
  if (params.action == "edit") {
    id = params.id;
    let resEdit = await callXMLHttpRequestMethod(
      "GET",
      `${apiPort.apiGetLandById}/${params.id}`,
      {}
    );
    if (resEdit.statusCodeText == textRespone.ok.CodeText) {
      landFormZone.value = resEdit.data[0].zone_id;
      landFormSize.value = resEdit.data[0].size_rai;
      landFormNameEn.value = resEdit.data[0].land_name_en;
      landFormNameTh.value = resEdit.data[0].land_name;
      landFormAddrTh.value = resEdit.data[0].address;
      landFormAddrEn.value = resEdit.data[0].address_en;
      landFormMaps.value = resEdit.data[0].map_link;
      landFormLine.value = resEdit.data[0].homeLineLink;
      landFormWhatsapp.value = resEdit.data[0].homeWhatsAppLink;
      landFormPriceThb.value = resEdit.data[0].price;
      landFormPriceUsd.value = resEdit.data[0].price_usd;
      landFormPhone.value = resEdit.data[0].owner_phone;
      landFormStatus.value = resEdit.data[0].status;
      landFormDescEn.value = resEdit.data[0].description_en;
      landFormDescTh.value = resEdit.data[0].description;

      landFormNgan.value = resEdit.data[0].size_ngan;
      landFormSqWa.value = resEdit.data[0].size_wa;

      landFormDeedNo.value = resEdit.data[0].deed_number;
      landFormSpecialFeatures.value = resEdit.data[0].nearby_places;

      landDocument.innerHTML = resEdit.data[0].documents ? `<a href="${uat+JSON.parse(resEdit.data[0].documents)}" target="_blank">โหลดเอกสาร</a>`:""

      // let amenities = JSON.parse(resEdit.data[0].amenities);
      let show_pic = "";
      resEdit.data[0].images = JSON.parse(resEdit.data[0].images);
      for (let i = 0; i < resEdit.data[0].images.length; i++) {
        show_pic += `<div class="table-thumb">
                  <img src="${uat + resEdit.data[0].images[i]}" alt="บ้าน" />
                </div>`;
      }
      el("show_picture").innerHTML = show_pic;

      // if (amenities.includes("ห้องครัวพร้อมเคาน์เตอร์")) {
      //   landAmenKitchen.checked = true;
      // }

      // if (amenities.includes("ระบบรักษาความปลอดภัย")) {
      //   landAmenBathAllFloors.checked = true;
      // }

      // if (amenities.includes("ระบบปรับอากาศ")) {
      //   landAmenAC.checked = true;
      // }

      // if (amenities.includes("ระบบรักษาความปลอดภัย")) {
      //   landAmenSecurity.checked = true;
      // }

      // if (amenities.includes("สวนหน้าบ้าน")) {
      //   landAmenGarden.checked = true;
      // }

      // if (amenities.includes("ที่จอดรถในร่ม")) {
      //   landAmenCoveredParking.checked = true;
      // }

      // if (amenities.includes("ระบบน้ำร้อน")) {
      //   landAmenHotWater.checked = true;
      // }

      // if (amenities.includes("ระบบ Internet / Wifi")) {
      //   landAmenWifi.checked = true;
      // }

      // if (amenities.includes("ระบบ CCTV")) {
      //   landAmenCCTV.checked = true;
      // }

      // if (amenities.includes("เครื่องซักผ้า")) {
      //   landAmenWasher.checked = true;
      // }

      // if (amenities.includes("ตู้เย็น")) {
      //   landAmenFridge.checked = true;
      // }

      // if (amenities.includes("เฟอร์นิเจอร์ครบชุด")) {
      //   landAmenFurnished.checked = true;
      // }
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

async function Addlandal() {
  let images = [];
  let checkLengthFile = document.getElementById("landFormImages");
  if (checkLengthFile.files.length > 0) {
    for (let i = 0; i < checkLengthFile.files.length; i++) {
      let resDataUpload = await callXMLHttpRequestUploadFile(
        "POST",
        `${apiPort.apiUploadFile}`,
        document.getElementById("landFormImages").files[i]
      );

      if (resDataUpload.fileUrl) {
        images.push(resDataUpload.fileUrl);
      }
    }
  }
    let documents = '';
  let checkLengthDocument = document.getElementById("landFormDeedDoc");
  if (checkLengthDocument.files.length > 0) {
    for (let i = 0; i < checkLengthDocument.files.length; i++) {
      let resDataUpload = await callXMLHttpRequestUploadFile(
        "POST",
        `${apiPort.apiUploadFile}`,
        document.getElementById("landFormDeedDoc").files[i]
      );

      if (resDataUpload.fileUrl) {
        documents = resDataUpload.fileUrl;
      }
    }
  }
  let data = {
    id: id,
    zone_id: landFormZone.value,
    size_rai: landFormSize.value,
    land_name:landFormNameTh.value,
    land_name_en:landFormNameEn.value,
    address:landFormAddrTh.value,
    address_en:landFormAddrEn.value,
    map_link:landFormMaps.value,
    homeLineLink:landFormLine.value,
    homeWhatsAppLink:landFormWhatsapp.value,
    images,
    price:landFormPriceThb.value,
    price_usd:landFormPriceUsd.value,
    size_ngan:landFormNgan.value,
    size_wa:landFormSqWa.value,
    owner_phone:landFormPhone.value,
    deed_number:landFormDeedNo.value,
    status:landFormStatus.value,
    description:landFormDescTh.value,
    description_en:landFormDescEn.value,
    nearby_places:landFormSpecialFeatures.value,
    documents
  };
  let resEdit;
  if (id == 0) {
    resEdit = await callXMLHttpRequestMethod(
      "POST",
      `${apiPort.apiCreateLand}`,
      data
    );
  } else {
    resEdit = await callXMLHttpRequestMethod(
      "PUT",
      `${apiPort.apiUpdateLand}/${id}`,
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
        window.location.href = "lands.html";
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

  images = [];
  documents='';
}
GetZone();
startFunction();
