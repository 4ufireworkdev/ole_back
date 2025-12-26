$(document).ready(function () {
  let ip = getIPaddress();

  if (sessionStorage.getItem("token")) {
    window.location.href = "../pages/index.html";
  }
  //add keypress for put enter and run the function
  $("#username").keypress(function (event) {
    if (event.keyCode == 13) {
      $("#login").click();
    }
  });

  $("#password").keypress(function (event) {
    if (event.keyCode == 13) {
      $("#login").click();
    }
  });

  //--------------------------------------------------
  $("#login").click(async function (e) {
    // let str = el('username').value;
    // let res = str.toLowerCase();

    let username = el("username").value;
    let password = el("password").value;
    let data = {
      username: username,
      password: password,
      ip: getIPaddress(),
    };
    let resLogin = await callXMLHttpRequest(`${apiPort.apiLogin}`, data);
    if (resLogin.statusCodeText == textRespone.ok.CodeText) {
      let token = parseJwt(resLogin.token);
      sessionStorage.setItem("token", resLogin.token);
      sessionStorage.setItem("role", resLogin.user.role);
      sessionStorage.setItem("name", resLogin.user.name);
      Swal.fire({
        title: "แจ้งเตือน",
        text: resLogin.description,
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          window.location.href = "pages/index.html";
        }
      });
    } else {
      Swal.fire({
        title: "แจ้งเตือน",
        text: resLogin.description,
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
  });
});
