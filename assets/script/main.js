// Dom Request For Give Input's
const phoneNumberValidate = document.querySelector("#phoneNumberValidate")
const nameValidate = document.querySelector("#nameValidate")
const lastNameValidate = document.querySelector("#lastNameValidate")
const meliCodeValidate = document.querySelector("#nationalCodeValidate")
const ageValidate = document.querySelector("#ageValidate")

// To Check Items Object
let datas = {
    phoneNumber: false,
    name: false,
    lastName: false,
    age: false,
    meliCode: false,
}

// Name , LastName , Age Massage Variable's
let name_massage;
let lastName_massage;
let age_massage;

// Phone Number Validate
let phoneNumber_massage;
function check_phoneNumber(e) {
    if (PersianTools.phoneNumberValidator(e.target.value)) {
        phoneNumber_massage = ''
        phoneNumberValidate.classList.remove("wrong");
        phoneNumberValidate.classList.add("correct");
        datas.phoneNumber = true
        appendText(phoneNumber_massage, "phoneNumber_append")
        appendText("", "phoneNumberOperator_append")
    } else if (!PersianTools.phoneNumberValidator(e.target.value)) {
        phoneNumber_massage = `شماره وارد شده صحیح نمیباشد`
        phoneNumberValidate.classList.remove("correct");
        phoneNumberValidate.classList.add("wrong");
        datas.phoneNumber = false
        appendText(phoneNumber_massage, "phoneNumber_append")
        appendText("", "phoneNumberOperator_append")
    }
    let phoneNumberDetail = PersianTools.phoneNumberDetail(e.target.value)
    if (phoneNumberDetail?.operator) {
        phoneNumber_massage = `شماره همراه شما ${phoneNumberDetail.operator} است.`
        phoneNumberValidate.classList.remove("wrong");
        phoneNumberValidate.classList.add("correct");
        datas.phoneNumber = true
        appendText(phoneNumber_massage, "phoneNumberOperator_append")
    }
}
phoneNumberValidate.addEventListener("change", check_phoneNumber)

// MeliCode Validate
let meliCode_massage;
function check_meliCode(e) {
    if (!PersianTools.verifyIranianNationalId(e.target.value)) {
        meliCode_massage = "کد ملی صحیح نمی باشد."
        meliCodeValidate.classList.remove("correct");
        meliCodeValidate.classList.add("wrong");
        datas.meliCode = false
    } else {
        meliCode_massage = ""
        meliCodeValidate.classList.remove("wrong");
        meliCodeValidate.classList.add("correct");
        datas.meliCode = true
    }
    appendText(meliCode_massage, "meliCode_append")
}
meliCodeValidate.addEventListener("change", check_meliCode)


// Append Validate Text To Body (Dom)
const appendText = (textNode, appendId) => {
    document.getElementById(appendId).innerHTML = textNode;
}

// Check Empty Value is true/false
const checkValue = (validateTag, massageVariable, appendId, emptyValueFlase, dataName, na) => {
    if (validateTag.value === "") {
        dataName[`${na}`] = false;
        massageVariable = "لطفا فیلد را پر کنید"
        appendText(massageVariable, appendId)
        validateTag.classList.remove("correct");
        validateTag.classList.add("wrong");
    }
    else if (emptyValueFlase) {
        dataName[`${na}`] = true;
        appendText("", appendId)
        validateTag.classList.remove("wrong");
        validateTag.classList.add("correct");
    }
}

// Validate
function submitDatas() {
    checkValue(nameValidate, name_massage, "name_append", true, datas, "name")
    checkValue(lastNameValidate, lastName_massage, "lastName_append", true, datas, "lastName")
    checkValue(phoneNumberValidate, phoneNumber_massage, "phoneNumber_append", false, datas, "phoneNumber")
    checkValue(meliCodeValidate, meliCode_massage, "meliCode_append", false, datas, "meliCode")
    checkValue(ageValidate, age_massage, "age_append", true, datas, "age")

    // Age Validate
    console.log(typeof ageValidate.value);
    if (Number(ageValidate.value) < 18) {
        age_massage = "سن شما زیر 18 سال میباشد."
        ageValidate.classList.remove("correct");
        ageValidate.classList.add("wrong");
        datas.age = false
        appendText(age_massage, "age_append")
    }

    // Notification
    let objValues = Object.values(datas).every((value) => {
        return value === true
    })

    let time = 5000;
    if (objValues) {
        notification("عملیات با موفقیت انجام شد")
        setInterval(() => {
            time -= 1000
            if (time == 0) {
                const deleteNotif = document.getElementById("notifChlid")
                deleteNotif.remove()
            }
        }, 1000)
    }
}

// Check All Items And Return "Done!" Notif
function notification(text) {
    const node = document.createElement("p");
    const textnode = document.createTextNode(text);
    node.appendChild(textnode);
    node.setAttribute("id", "notifChlid")
    node.setAttribute("class", "notifBox")

    document.getElementById("notifBox").appendChild(node);
}