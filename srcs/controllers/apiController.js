export const calendar = (req, res) => {
    res.render("calendar/home");
}

export const createSchedule = (req, res) => {
    console.log(req.body);
}