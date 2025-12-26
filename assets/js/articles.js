// articles.js
const articlesSearch = document.getElementById("articlesSearch");
const articlesCategory = document.getElementById("articlesCategory");
const articlesStatus = document.getElementById("articlesStatus");


async function GetDataAllArticles() {
  let data = {
    description: articlesSearch.value,
    status: articlesStatus.value,
    tags: articlesCategory.value
  };
  let resLand = await callXMLHttpRequestMethod(
    "POST",
    `${apiPort.apiGetAllArticles}`,
    data
  );
  if (resLand.statusCodeText == textRespone.ok.CodeText) {
    let htm = "";
    for (let i = 0; i < resLand.data.length; i++) {
      let data = resLand.data[i];
      htm += `<tr>
                  <td>${data.title}</td>
                  <td>${data.category == 'news' ? 'ข่าวสาร':data.category == 'technique' ? 'เทคนิค':data.category == 'market' ? 'ข่าวตลาด':data.category == 'law' ? 'กฏหมาย':'การลงทุน'}</td>
                  <td>${
                      data.status == "published"
                        ? '<span class="badge badge--success">เผยแพร่แล้ว</span>'
                        : data.status == "draft"
                        ? '<span class="badge badge--warning">ร่างแล้ว</span>'
                        : '<span class="badge badge--danger">เก็บถาวร</span>'
                    }</td>
                  <td>${data.tags}</td>
                  <td>
                    <a href="articles-form.html?action=edit&id=${data.id}" class="btn btn--warning btn--small">แก้ไข</a>
                    <button class="btn btn--danger btn--small">ลบ</button>
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
        `${apiPort.apiDeleteArticle}/${id}`,
        {}
      );
      Swal.fire("แจ้งเตือน", resDelete.description, "success").then(
        (result) => {
          if (result.value) {
            GetDataAllArticles();
          }
        }
      );
    }
  });
}

GetDataAllArticles();