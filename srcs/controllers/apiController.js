export const calendar = (req, res) => {
    res.render("calendar/home");
}

export const createSchedule = (req, res) => {
    console.log(req.body);
    console.log(req.body.text);
    console.log(req.body.date);
}