// properties-rent-form.js
const rentFormZone = document.getElementById("rentFormZone");
const rentFormSize = document.getElementById("rentFormSize");
const rentFormNameEn = document.getElementById("rentFormNameEn");
const rentFormNameTh = document.getElementById("rentFormNameTh");
const rentFormAddrTh = document.getElementById("rentFormAddrTh");
const rentFormAddrEn = document.getElementById("rentFormAddrEn");
const rentFormMaps = document.getElementById("rentFormMaps");
const rentFormLine = document.getElementById("rentFormLine");
const rentFormWhatsapp = document.getElementById("rentFormWhatsapp");
const rentFormImages = document.getElementById("rentFormImages");

const rentFormRentThb = document.getElementById("rentFormRentThb");
const rentFormRentUsd = document.getElementById("rentFormRentUsd");
const rentFormDepositMonths = document.getElementById("rentFormDepositMonths");
const rentFormDepositAmount = document.getElementById("rentFormDepositAmount");

const rentFormFloor = document.getElementById("rentFormFloor");
const rentFormBedrooms = document.getElementById("rentFormBedrooms");
const rentFormBathrooms = document.getElementById("rentFormBathrooms");
const rentFormParking = document.getElementById("rentFormParking");

const rentFormPhone = document.getElementById("rentFormPhone");
const rentFormPropertyType = document.getElementById("rentFormPropertyType");
const rentFormFurniture = document.getElementById("rentFormFurniture");
const rentFormStatus = document.getElementById("rentFormStatus");
const rentFormReadyDate = document.getElementById("rentFormReadyDate");

const rentFormDescTh = document.getElementById("rentFormDescTh");
const rentFormDescEn = document.getElementById("rentFormDescEn");

const rentAmenKitchen = document.getElementById("rentAmenKitchen");
const rentAmenBathAllFloors = document.getElementById("rentAmenBathAllFloors");
const rentAmenAC = document.getElementById("rentAmenAC");
const rentAmenSecurity = document.getElementById("rentAmenSecurity");
const rentAmenGarden = document.getElementById("rentAmenGarden");
const rentAmenCoveredParking = document.getElementById(
  "rentAmenCoveredParking"
);
const rentAmenHotWater = document.getElementById("rentAmenHotWater");
const rentAmenWifi = document.getElementById("rentAmenWifi");
const rentAmenCCTV = document.getElementById("rentAmenCCTV");
const rentAmenWasher = document.getElementById("rentAmenWasher");
const rentAmenFridge = document.getElementById("rentAmenFridge");
const rentAmenFurnished = document.getElementById("rentAmenFurnished");
const rentFormType = document.getElementById("rentFormType");
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
  rentFormZone.innerHTML = htm;
}

async function startFunction() {
  let params = await getParamInGetUrl();
  if (params.action == "edit") {
    id = params.id;
    let resEdit = await callXMLHttpRequestMethod(
      "GET",
      `${apiPort.apiGetRentalById}/${params.id}`,
      {}
    );
    if (resEdit.statusCodeText == textRespone.ok.CodeText) {
      rentFormZone.value = resEdit.data[0].zone_id;
      rentFormSize.value = resEdit.data[0].size;
      rentFormNameEn.value = resEdit.data[0].property_name_en;
      rentFormNameTh.value = resEdit.data[0].property_name;
      rentFormAddrTh.value = resEdit.data[0].address;
      rentFormAddrEn.value = resEdit.data[0].address_en;
      rentFormMaps.value = resEdit.data[0].map_link;
      rentFormLine.value = resEdit.data[0].homeLineLink;
      rentFormWhatsapp.value = resEdit.data[0].homeWhatsAppLink;
      rentFormRentThb.value = resEdit.data[0].monthly_rent;
      rentFormRentUsd.value = resEdit.data[0].rental_price_usd;
      rentFormBedrooms.value = resEdit.data[0].bedrooms;
      rentFormBathrooms.value = resEdit.data[0].bathrooms;
      rentFormParking.value = resEdit.data[0].parking;
      rentFormPhone.value = resEdit.data[0].owner_phone;
      rentFormStatus.value = resEdit.data[0].status;
      rentFormDescEn.value = resEdit.data[0].description_en;
      rentFormDescTh.value = resEdit.data[0].description;

      rentFormDepositMonths.value = resEdit.data[0].monthly_deposit;
      rentFormDepositAmount.value = resEdit.data[0].deposit;
      rentFormFloor.value = resEdit.data[0].floor;
      rentFormFurniture.value = resEdit.data[0].furnishing;
      rentFormReadyDate.value = formatDate(resEdit.data[0].available_date);
      rentFormType.value = resEdit.data[0].rental_type;
      let amenities = JSON.parse(resEdit.data[0].amenities);
      let show_pic = "";
      resEdit.data[0].images = JSON.parse(resEdit.data[0].images);
      for (let i = 0; i < resEdit.data[0].images.length; i++) {
        show_pic += `<div class="table-thumb">
                  <img src="${uat + resEdit.data[0].images[i]}" alt="บ้าน" />
                </div>`;
      }
      el("show_picture").innerHTML = show_pic;

      if (amenities.includes("ห้องครัวพร้อมเคาน์เตอร์")) {
        rentAmenKitchen.checked = true;
      }

      if (amenities.includes("ระบบรักษาความปลอดภัย")) {
        rentAmenBathAllFloors.checked = true;
      }

      if (amenities.includes("ระบบปรับอากาศ")) {
        rentAmenAC.checked = true;
      }

      if (amenities.includes("ระบบรักษาความปลอดภัย")) {
        rentAmenSecurity.checked = true;
      }

      if (amenities.includes("สวนหน้าบ้าน")) {
        rentAmenGarden.checked = true;
      }

      if (amenities.includes("ที่จอดรถในร่ม")) {
        rentAmenCoveredParking.checked = true;
      }

      if (amenities.includes("ระบบน้ำร้อน")) {
        rentAmenHotWater.checked = true;
      }

      if (amenities.includes("ระบบ Internet / Wifi")) {
        rentAmenWifi.checked = true;
      }

      if (amenities.includes("ระบบ CCTV")) {
        rentAmenCCTV.checked = true;
      }

      if (amenities.includes("เครื่องซักผ้า")) {
        rentAmenWasher.checked = true;
      }

      if (amenities.includes("ตู้เย็น")) {
        rentAmenFridge.checked = true;
      }

      if (amenities.includes("เฟอร์นิเจอร์ครบชุด")) {
        rentAmenFurnished.checked = true;
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

async function AddRental() {
  let amenities = [];
  if (rentAmenKitchen.checked) {
    amenities.push("ห้องครัวพร้อมเคาน์เตอร์");
  }
  if (rentAmenBathAllFloors.checked) {
    amenities.push("ระบบรักษาความปลอดภัย");
  }
  if (rentAmenAC.checked) {
    amenities.push("ระบบปรับอากาศ");
  }
  if (rentAmenSecurity.checked) {
    amenities.push("ระบบรักษาความปลอดภัย");
  }
  if (rentAmenGarden.checked) {
    amenities.push("สวนหน้าบ้าน");
  }
  if (rentAmenCoveredParking.checked) {
    amenities.push("ที่จอดรถในร่ม");
  }
  if (rentAmenHotWater.checked) {
    amenities.push("ระบบน้ำร้อน");
  }
  if (rentAmenWifi.checked) {
    amenities.push("ระบบ Internet / Wifi");
  }
  if (rentAmenCCTV.checked) {
    amenities.push("ระบบ CCTV");
  }
  if (rentAmenWasher.checked) {
    amenities.push("เครื่องซักผ้า");
  }
  if (rentAmenFridge.checked) {
    amenities.push("ตู้เย็น");
  }
  if (rentAmenFurnished.checked) {
    amenities.push("เฟอร์นิเจอร์ครบชุด");
  }
  let images = [];
  let checkLengthFile = document.getElementById("rentFormImages");
  if (checkLengthFile.files.length > 0) {
    for (let i = 0; i < checkLengthFile.files.length; i++) {
      let resDataUpload = await callXMLHttpRequestUploadFile(
        "POST",
        `${apiPort.apiUploadFile}`,
        document.getElementById("rentFormImages").files[i]
      );

      if (resDataUpload.fileUrl) {
        images.push(resDataUpload.fileUrl);
      }
    }
  }
  let data = {
    id: id,
    zone_id: rentFormZone.value,
    size: rentFormSize.value,
    property_name_en: rentFormNameEn.value,
    property_name: rentFormNameTh.value,
    address: rentFormAddrTh.value,
    address_en: rentFormAddrEn.value,
    map_link: rentFormMaps.value,
    homeLineLink: rentFormLine.value,
    homeWhatsAppLink: rentFormWhatsapp.value,
    images,
    monthly_rent: rentFormRentThb.value,
    rental_price_usd: rentFormRentUsd.value,
    bedrooms: rentFormBedrooms.value,
    bathrooms: rentFormBathrooms.value,
    parking: rentFormParking.value,
    owner_phone: rentFormPhone.value,
    status: rentFormStatus.value,
    description: rentFormDescTh.value,
    description_en: rentFormDescEn.value,
    monthly_deposit: rentFormDepositMonths.value,
    deposit: rentFormDepositAmount.value,
    floor: rentFormFloor.value,
    rental_type: rentFormType.value,
    furnishing: rentFormFurniture.value,
    amenities,
    available_date:rentFormReadyDate.value
  };
  let resEdit;
  if (id == 0) {
    resEdit = await callXMLHttpRequestMethod(
      "POST",
      `${apiPort.apiCreateRental}`,
      data
    );
  } else {
    resEdit = await callXMLHttpRequestMethod(
      "PUT",
      `${apiPort.apiUpdateRental}/${id}`,
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
        window.location.href = "properties-rent.html";
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
    })
  }

  images = [];
}
GetZone();
startFunction();
