function eventListeners() {
  addBtn.addEventListener("click", () => {
    form.reset(),
      (document.getElementById("modal-title").innerHTML = "Add Address"),
      UI.showModal(),
      (document.getElementById("modal-btns").innerHTML =
        '\n            <button type = "submit" id = "save-btn"> Save </button>\n        ');
  }),
    closeBtn.addEventListener("click", UI.closeModal),
    modalBtns.addEventListener("click", (e) => {
      if ((e.preventDefault(), "save-btn" == e.target.id)) {
        let e = getFormData();
        if (e) {
          let e = Address.getAddresses(),
            t = e.length > 0 ? e[e.length - 1].id : 0;
          t++;
          const s = new Address(
            t,
            addrName,
            firstName,
            lastName,
            email,
            phone,
            streetAddr,
            postCode,
            city,
            country,
            labels
          );
          Address.addAddress(s),
            UI.closeModal(),
            UI.addToAddressList(s),
            form.reset();
        } else
          form.querySelectorAll("input").forEach((e) => {
            setTimeout(() => {
              e.classList.remove("errorMsg");
            }, 1500);
          });
      }
    }),
    addrBookList.addEventListener("click", (e) => {
      let t;
      UI.showModal(),
        "TD" == e.target.parentElement.tagName &&
          (t = e.target.parentElement.parentElement),
        "TR" == e.target.parentElement.tagName && (t = e.target.parentElement);
      let s = t.dataset.id;
      UI.showModalData(s);
    }),
    modalBtns.addEventListener("click", (e) => {
      "delete-btn" == e.target.id && Address.deleteAddress(e.target.dataset.id);
    }),
    modalBtns.addEventListener("click", (e) => {
      if ((e.preventDefault(), "update-btn" == e.target.id)) {
        let t = e.target.dataset.id,
          s = getFormData();
        if (s) {
          const e = new Address(
            t,
            addrName,
            firstName,
            lastName,
            email,
            phone,
            streetAddr,
            postCode,
            city,
            country,
            labels
          );
          Address.updateAddress(e), UI.closeModal(), form.reset();
        } else
          form.querySelectorAll("input").forEach((e) => {
            setTimeout(() => {
              e.classList.remove("errorMsg");
            }, 1500);
          });
      }
    });
}
function loadJSON() {
  fetch("countries.json")
    .then((e) => e.json())
    .then((e) => {
      let t = "";
      e.forEach((e) => {
        t += `\n                <option> ${e.country} </option>\n            `;
      }),
        (countryList.innerHTML = t);
    });
}
function getFormData() {
  let e = [];
  return (
    strRegex.test(form.addr_ing_name.value) &&
    0 != form.addr_ing_name.value.trim().length
      ? ((addrName = form.addr_ing_name.value), (e[0] = !0))
      : (addErrMsg(form.addr_ing_name), (e[0] = !1)),
    strRegex.test(form.first_name.value) &&
    0 != form.first_name.value.trim().length
      ? ((firstName = form.first_name.value), (e[1] = !0))
      : (addErrMsg(form.first_name), (e[1] = !1)),
    strRegex.test(form.last_name.value) &&
    0 != form.last_name.value.trim().length
      ? ((lastName = form.last_name.value), (e[2] = !0))
      : (addErrMsg(form.last_name), (e[2] = !1)),
    emailRegex.test(form.email.value)
      ? ((email = form.email.value), (e[3] = !0))
      : (addErrMsg(form.email), (e[3] = !1)),
    phoneRegex.test(form.phone.value)
      ? ((phone = form.phone.value), (e[4] = !0))
      : (addErrMsg(form.phone), (e[4] = !1)),
    form.street_addr.value.trim().length > 0
      ? ((streetAddr = form.street_addr.value), (e[5] = !0))
      : (addErrMsg(form.street_addr), (e[5] = !1)),
    digitRegex.test(form.postal_code.value)
      ? ((postCode = form.postal_code.value), (e[6] = !0))
      : (addErrMsg(form.postal_code), (e[6] = !1)),
    strRegex.test(form.city.value) && 0 != form.city.value.trim().length
      ? ((city = form.city.value), (e[7] = !0))
      : (addErrMsg(form.city), (e[7] = !1)),
    (country = form.country.value),
    (labels = form.labels.value),
    !e.includes(!1)
  );
}
function addErrMsg(e) {
  e.classList.add("errorMsg");
}
const strRegex = /^[a-zA-Z\s]*$/,
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  digitRegex = /^\d+$/,
  countryList = document.getElementById("country-list"),
  fullscreenDiv = document.getElementById("fullscreen"),
  modal = document.getElementById("modal"),
  addBtn = document.getElementById("add-btn"),
  closeBtn = document.getElementById("close-btn"),
  modalBtns = document.getElementById("modal-btns"),
  form = document.getElementById("modal"),
  addrBookList = document.querySelector("#abook-list tbody");
let addrName =
  (firstName =
  lastName =
  email =
  phone =
  streetAddr =
  postCode =
  city =
  country =
  labels =
    "");
class Address {
  constructor(e, t, s, d, a, r, o, n, l, i, m) {
    (this.id = e),
      (this.addrName = t),
      (this.firstName = s),
      (this.lastName = d),
      (this.email = a),
      (this.phone = r),
      (this.streetAddr = o),
      (this.postCode = n),
      (this.city = l),
      (this.country = i),
      (this.labels = m);
  }
  static getAddresses() {
    let e;
    return (
      (e =
        null == localStorage.getItem("addresses")
          ? []
          : JSON.parse(localStorage.getItem("addresses"))),
      e
    );
  }
  static addAddress(e) {
    const t = Address.getAddresses();
    t.push(e), localStorage.setItem("addresses", JSON.stringify(t));
  }
  static deleteAddress(e) {
    const t = Address.getAddresses();
    t.forEach((s, d) => {
      s.id == e && t.splice(d, 1);
    }),
      localStorage.setItem("addresses", JSON.stringify(t)),
      form.reset(),
      UI.closeModal(),
      (addrBookList.innerHTML = ""),
      UI.showAddressList();
  }
  static updateAddress(e) {
    const t = Address.getAddresses();
    t.forEach((t) => {
      t.id == e.id &&
        ((t.addrName = e.addrName),
        (t.firstName = e.firstName),
        (t.lastName = e.lastName),
        (t.email = e.email),
        (t.phone = e.phone),
        (t.streetAddr = e.streetAddr),
        (t.postCode = e.postCode),
        (t.city = e.city),
        (t.country = e.country),
        (t.labels = e.labels));
    }),
      localStorage.setItem("addresses", JSON.stringify(t)),
      (addrBookList.innerHTML = ""),
      UI.showAddressList();
  }
}
class UI {
  static showAddressList() {
    const e = Address.getAddresses();
    e.forEach((e) => UI.addToAddressList(e));
  }
  static addToAddressList(e) {
    const t = document.createElement("tr");
    t.setAttribute("data-id", e.id),
      (t.innerHTML = `\n            <td>${
        e.id
      }</td>\n            <td>\n                <span class = "addressing-name">${
        e.addrName
      }</span><br><span class = "address">${e.streetAddr} ${e.postCode} ${
        e.city
      } ${e.country}</span>\n            </td>\n            <td><span>${
        e.labels
      }</span></td>\n            <td>${
        e.firstName + " " + e.lastName
      }</td>\n            <td>${e.phone}</td>\n        `),
      addrBookList.appendChild(t);
  }
  static showModalData(e) {
    const t = Address.getAddresses();
    t.forEach((t) => {
      t.id == e &&
        ((form.addr_ing_name.value = t.addrName),
        (form.first_name.value = t.firstName),
        (form.last_name.value = t.lastName),
        (form.email.value = t.email),
        (form.phone.value = t.phone),
        (form.street_addr.value = t.streetAddr),
        (form.postal_code.value = t.postCode),
        (form.city.value = t.city),
        (form.country.value = t.country),
        (form.labels.value = t.labels),
        (document.getElementById("modal-title").innerHTML =
          "Change Address Details"),
        (document.getElementById(
          "modal-btns"
        ).innerHTML = `\n                    <button type = "submit" id = "update-btn" data-id = "${e}">Update </button>\n                    <button type = "button" id = "delete-btn" data-id = "${e}">Delete </button>\n                `));
    });
  }
  static showModal() {
    (modal.style.display = "block"), (fullscreenDiv.style.display = "block");
  }
  static closeModal() {
    (modal.style.display = "none"), (fullscreenDiv.style.display = "none");
  }
}
window.addEventListener("DOMContentLoaded", () => {
  loadJSON(), eventListeners(), UI.showAddressList();
});
