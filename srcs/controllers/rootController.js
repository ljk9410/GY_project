import bcrypt from "bcrypt";

export const home = (req, res) => {
    res.render("home");
}

export const aboutUs = (req, res) => {
    res.render("aboutUs/home");
}

export const getLogin = (req, res) => {
    res.render("login");
}

export const postLogin = async(req, res) => {
    const masterID = {
        id: process.env.MASTER_ID,
        password: await bcrypt.hash(process.env.MASTER_PASSWORD, 5)
    }
    const { id, password } = req.body;
    const same = await bcrypt.compare(password, masterID.password);
    
    if (id !== masterID.id) {
        return res.status(400).render("login", {
            errorMessage:"잘못된 아이디 입니다"
        });
    }
    if (!same) {
        return res.status(400).render("login", {
            errorMessage:"잘못된 비밀번호 입니다"
        });
    }
    req.session.loggedIn = true;
    return res.redirect("/calendar");
}