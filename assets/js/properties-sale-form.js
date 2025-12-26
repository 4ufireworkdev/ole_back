// properties-sale-form.js
const saleFormZone = document.getElementById("saleFormZone");
const saleFormSize = document.getElementById("saleFormSize");
const saleFormNameEn = document.getElementById("saleFormNameEn");
const saleFormNameTh = document.getElementById("saleFormNameTh");
const saleFormAddrTh = document.getElementById("saleFormAddrTh");
const saleFormAddrEn = document.getElementById("saleFormAddrEn");
const saleFormMaps = document.getElementById("saleFormMaps");
const saleFormLine = document.getElementById("saleFormLine");
const saleFormWhatsapp = document.getElementById("saleFormWhatsapp");
const saleFormImages = document.getElementById("saleFormImages");
const saleFormPriceThb = document.getElementById("saleFormPriceThb");
const saleFormPriceUsd = document.getElementById("saleFormPriceUsd");
const saleFormBedrooms = document.getElementById("saleFormBedrooms");
const saleFormBathrooms = document.getElementById("saleFormBathrooms");
const saleFormParking = document.getElementById("saleFormParking");
const saleFormDeedNo = document.getElementById("saleFormDeedNo");
const saleFormPhone = document.getElementById("saleFormPhone");
const saleFormStatus = document.getElementById("saleFormStatus");
const saleFormDescTh = document.getElementById("saleFormDescTh");
const saleFormDescEn = document.getElementById("saleFormDescEn");

const saleAmenKitchen = document.getElementById("saleAmenKitchen");
const saleAmenBathAllFloors = document.getElementById("saleAmenBathAllFloors");
const saleAmenAC = document.getElementById("saleAmenAC");
const saleAmenSecurity = document.getElementById("saleAmenSecurity");
const saleAmenGarden = document.getElementById("saleAmenGarden");
const saleAmenCoveredParking = document.getElementById(
  "saleAmenCoveredParking"
);
const saleAmenHotWater = document.getElementById("saleAmenHotWater");
const saleAmenWifi = document.getElementById("saleAmenWifi");
const saleAmenCCTV = document.getElementById("saleAmenCCTV");
const saleAmenWasher = document.getElementById("saleAmenWasher");
const saleAmenFridge = document.getElementById("saleAmenFridge");
const saleAmenFurnished = document.getElementById("saleAmenFurnished");
let id = 0;

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
  saleFormZone.innerHTML = htm;
}

async function startFunction() {
  let params = await getParamInGetUrl();
  if (params.action == "edit") {
    id = params.id;
    let resEdit = await callXMLHttpRequestMethod(
      "GET",
      `${apiPort.apiGetPropertyById}/${params.id}`,
      {}
    );
    if (resEdit.statusCodeText == textRespone.ok.CodeText) {
      saleFormZone.value = resEdit.data[0].zone_id;
      saleFormSize.value = resEdit.data[0].size;
      saleFormNameEn.value = resEdit.data[0].property_name_en;
      saleFormNameTh.value = resEdit.data[0].property_name;
      saleFormAddrTh.value = resEdit.data[0].address;
      saleFormAddrEn.value = resEdit.data[0].address_en;
      saleFormMaps.value = resEdit.data[0].map_link;
      saleFormLine.value = resEdit.data[0].homeLineLink;
      saleFormWhatsapp.value = resEdit.data[0].homeWhatsAppLink;
      saleFormPriceThb.value = resEdit.data[0].price;
      saleFormPriceUsd.value = resEdit.data[0].priceusd;
      saleFormBedrooms.value = resEdit.data[0].bedrooms;
      saleFormBathrooms.value = resEdit.data[0].bathrooms;
      saleFormParking.value = resEdit.data[0].parking;
      saleFormDeedNo.value = resEdit.data[0].deed_number;
      saleFormPhone.value = resEdit.data[0].owner_phone;
      saleFormStatus.value = resEdit.data[0].status;
      saleFormDescEn.value = resEdit.data[0].description_en;
      saleFormDescTh.value = resEdit.data[0].description;
      let amenities = JSON.parse(resEdit.data[0].amenities);
      let show_pic = "";
      resEdit.data[0].images = JSON.parse(resEdit.data[0].images);
      for (let i = 0; i < resEdit.data[0].images.length; i++) {
        show_pic += `<div class="table-thumb">
                  <img src="${
                    uat + resEdit.data[0].images[i]
                  }" alt="บ้าน" />
                </div>`;
      }
      el("show_picture").innerHTML = show_pic;

      if (amenities.includes("ห้องครัวพร้อมเคาน์เตอร์")) {
        saleAmenKitchen.checked = true;
      }

      if (amenities.includes("ระบบรักษาความปลอดภัย")) {
        saleAmenBathAllFloors.checked = true;
      }

      if (amenities.includes("ระบบปรับอากาศ")) {
        saleAmenAC.checked = true;
      }

      if (amenities.includes("ระบบรักษาความปลอดภัย")) {
        saleAmenSecurity.checked = true;
      }

      if (amenities.includes("สวนหน้าบ้าน")) {
        saleAmenGarden.checked = true;
      }

      if (amenities.includes("ที่จอดรถในร่ม")) {
        saleAmenCoveredParking.checked = true;
      }

      if (amenities.includes("ระบบน้ำร้อน")) {
        saleAmenHotWater.checked = true;
      }

      if (amenities.includes("ระบบ Internet / Wifi")) {
        saleAmenWifi.checked = true;
      }

      if (amenities.includes("ระบบ CCTV")) {
        saleAmenCCTV.checked = true;
      }

      if (amenities.includes("เครื่องซักผ้า")) {
        saleAmenWasher.checked = true;
      }

      if (amenities.includes("ตู้เย็น")) {
        saleAmenFridge.checked = true;
      }

      if (amenities.includes("เฟอร์นิเจอร์ครบชุด")) {
        saleAmenFurnished.checked = true;
      }
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

async function AddProperies() {
  let amenities = [];
  if (saleAmenKitchen.checked) {
    amenities.push("ห้องครัวพร้อมเคาน์เตอร์");
  }
  if (saleAmenBathAllFloors.checked) {
    amenities.push("ระบบรักษาความปลอดภัย");
  }
  if (saleAmenAC.checked) {
    amenities.push("ระบบปรับอากาศ");
  }
  if (saleAmenSecurity.checked) {
    amenities.push("ระบบรักษาความปลอดภัย");
  }
  if (saleAmenGarden.checked) {
    amenities.push("สวนหน้าบ้าน");
  }
  if (saleAmenCoveredParking.checked) {
    amenities.push("ที่จอดรถในร่ม");
  }
  if (saleAmenHotWater.checked) {
    amenities.push("ระบบน้ำร้อน");
  }
  if (saleAmenWifi.checked) {
    amenities.push("ระบบ Internet / Wifi");
  }
  if (saleAmenCCTV.checked) {
    amenities.push("ระบบ CCTV");
  }
  if (saleAmenWasher.checked) {
    amenities.push("เครื่องซักผ้า");
  }
  if (saleAmenFridge.checked) {
    amenities.push("ตู้เย็น");
  }
  if (saleAmenFurnished.checked) {
    amenities.push("เฟอร์นิเจอร์ครบชุด");
  }
  let images = [];
  let checkLengthFile = document.getElementById("saleFormImages");
  if (checkLengthFile.files.length > 0) {
    for (let i = 0; i < checkLengthFile.files.length; i++) {
      let resDataUpload = await callXMLHttpRequestUploadFile(
        "POST",
        `${apiPort.apiUploadFile}`,
        document.getElementById("saleFormImages").files[i]
      );

      if (resDataUpload.fileUrl) {
        images.push(resDataUpload.fileUrl);
      }
    }
  }
  let data = {
    id: id,
    zone_id: saleFormZone.value,
    size: saleFormSize.value,
    property_name_en: saleFormNameEn.value,
    property_name: saleFormNameTh.value,
    address: saleFormAddrTh.value,
    address_en: saleFormAddrEn.value,
    map_link: saleFormMaps.value,
    homeLineLink: saleFormLine.value,
    homeWhatsAppLink: saleFormWhatsapp.value,
    images,
    price: saleFormPriceThb.value,
    priceusd: saleFormPriceUsd.value,
    bedrooms: saleFormBedrooms.value,
    bathrooms: saleFormBathrooms.value,
    parking: saleFormParking.value,
    deed_number: saleFormDeedNo.value,
    owner_phone: saleFormPhone.value,
    status: saleFormStatus.value,
    description: saleFormDescTh.value,
    description_en: saleFormDescEn.value,
    amenities,
  };
  let resEdit;
  if (id == 0) {
    resEdit = await callXMLHttpRequestMethod(
      "POST",
      `${apiPort.apiCreateProperty}`,
      data
    );
  } else {
    resEdit = await callXMLHttpRequestMethod(
      "PUT",
      `${apiPort.apiUpdateProperty}/${id}`,
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
        window.location.href = "properties-sale.html";
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
    }).then((result) => {
      if (result.value) {
        el("username").value = "";
        el("password").value = "";
        el("secert").value = "";
      }
    });
  }

  images = [];
}
GetZone();
startFunction();
