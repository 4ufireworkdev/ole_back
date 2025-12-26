// articles-form.js
const articleFormTitleTh = document.getElementById("articleFormTitleTh");
const articleFormTitleEn = document.getElementById("articleFormTitleEn");
const articleFormCategory = document.getElementById("articleFormCategory");
const articleFormSummaryTh = document.getElementById("articleFormSummaryTh");
const articleFormSummaryEn = document.getElementById("articleFormSummaryEn");
const articleFormContentTh = document.getElementById("articleFormContentTh");
const articleFormContentEn = document.getElementById("articleFormContentEn");
const articleFormImages = document.getElementById("articleFormImages");
const articleFormTags = document.getElementById("articleFormTags");
const articleFormStatus = document.getElementById("articleFormStatus");
const articleFormFeatured = document.getElementById("articleFormFeatured");

let id =0 ;


async function startFunction() {
  let params = await getParamInGetUrl();
  if (params.action == "edit") {
    id = params.id;
    let resEdit = await callXMLHttpRequestMethod(
      "GET",
      `${apiPort.apiGetArticleById}/${params.id}`,
      {}
    );
    if (resEdit.statusCodeText == textRespone.ok.CodeText) {
      articleFormTitleTh.value = resEdit.data[0].title;
      articleFormTitleEn.value = resEdit.data[0].title_en;
      articleFormCategory.value = resEdit.data[0].category;
      articleFormSummaryTh.value = resEdit.data[0].excerpt;
      articleFormSummaryEn.value = resEdit.data[0].excerpt_en;
      articleFormContentTh.value = resEdit.data[0].content;
      articleFormContentEn.value = resEdit.data[0].content_en;
      articleFormTags.value = resEdit.data[0].tags;
      articleFormStatus.value = resEdit.data[0].status;
      articleFormFeatured.value = resEdit.data[0].article_featured;
      let show_pic = "";
      resEdit.data[0].images = JSON.parse(resEdit.data[0].images);
      for (let i = 0; i < resEdit.data[0].images.length; i++) {
        show_pic += `<div class="table-thumb">
                  <img src="${uat + resEdit.data[0].images[i]}" alt="บ้าน" />
                </div>`;
      }
      el("show_picture").innerHTML = show_pic;
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

async function AddArticles() {
  let images = [];
  let checkLengthFile = document.getElementById("articleFormImages");
  if (checkLengthFile.files.length > 0) {
    for (let i = 0; i < checkLengthFile.files.length; i++) {
      let resDataUpload = await callXMLHttpRequestUploadFile(
        "POST",
        `${apiPort.apiUploadFile}`,
        document.getElementById("articleFormImages").files[i]
      );

      if (resDataUpload.fileUrl) {
        images.push(resDataUpload.fileUrl);
      }
    }
  }
  let data = {
    id: id,
    title:articleFormTitleTh.value,
    title_en:articleFormTitleEn.value,
    category:articleFormCategory.value,
    excerpt:articleFormSummaryTh.value,
    excerpt_en:articleFormSummaryEn.value,
    content:articleFormContentTh.value,
    content_en:articleFormContentEn.value,
    tags:articleFormTags.value,
    status:articleFormStatus.value,
    article_featured:articleFormFeatured,
    images,
    
  };
  let resEdit;
  if (id == 0) {
    resEdit = await callXMLHttpRequestMethod(
      "POST",
      `${apiPort.apiCreateArticle}`,
      data
    );
  } else {
    resEdit = await callXMLHttpRequestMethod(
      "PUT",
      `${apiPort.apiUpdateArticle}/${id}`,
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
        window.location.href = "articles.html";
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
}
startFunction();