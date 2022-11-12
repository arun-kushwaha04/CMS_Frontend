export const getDate = (givenDate) => {
    if (!givenDate) return;
    const date = new Date(givenDate);
    const d = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour12: true, hour: "2-digit", minute: "2-digit" }).split(",");
    const finalDate = d[0] + d[1].toUpperCase();
    return finalDate;
};

export const validateEmail = (email) => {
    if (email.length === 0) {
        return false;
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const CSV2JSON = (csv) => {
    var lines = csv.match(/\r/) ? csv.split("\r\n") : csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    if (headers.toString() !== ["name", "email", "role", "batchCode"].toString()) {
        throw Error("invalid csv was uploaded");
    }
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        let currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        if (obj.batchCode === "") delete obj.batchCode;
        result.push(obj);
    }

    return result;
};

export const isValidUserJSON = (json) => {
    const validRoles = ["student", "teacher"];
    const emailRE = /([a-zA-Z0-9.]+)@iiitm.ac.in/;
    const studentEmailRE = /([a-zA-Z]{3})_([0-9]{4})([0-9]{3})@iiitm\.ac\.in/;
    const batchCodeRE = /([A-Z]{3})([0-9]{4})/;

    let flag = true;
    // console.log("json[0] is", json[0]["batchCode"]);
    json.forEach((user) => {
        if (!user.name || !user.email || !user.role) {
            throw Error(`valid fail because incomplete fields for user: ${user.name}`);
        }
        if (!validRoles.find((role) => role === user.role)) {
            throw Error(`valid fail because incorrect role for user: ${user.name}`);
        }
        if (user.role === "student" && !batchCodeRE.test(String(user.batchCode).toUpperCase())) {
            throw Error(`valid fail because wrong batchCode for user: ${user.name}`);
        }
        if (user.role === "student" && !studentEmailRE.test(String(user.email).toLowerCase())) {
            throw Error(`valid fail because wrong email for student user: ${user.name}`);
        }
        if (user.role === "teacher" && !emailRE.test(String(user.email).toLowerCase())) {
            throw Error(`valid fail because wrong emai for teacher for user: ${user.name}`);
        }
        if (user.role === "student" && !user.batchCode) {
            throw Error(`valid fail because no batch code for student user: ${user.name}`);
        }
    });
    return flag;
};

export const emailToRNo = (email) => {
    return email.slice(4, 8) + email.slice(0, 3).toUpperCase() + "-" + email.slice(8, 11);
};
