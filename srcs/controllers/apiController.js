import Schedule from "../models/Schedule";

export const calendar = async (req, res) => {
    const schedules = await Schedule.find({});

    res.render("calendar/home", { schedules });
}

export const createSchedule = async(req, res) => {
    const { text, date } = req.body;

    try {
        const schedule = await Schedule.create({
            date,
            text,
        });
        schedule.save();
        return res.sendStatus(201);
    } catch (error) {
        return res.status(400).render("calendar/home", {
            errorMessage:error._message,
        })
    }
}

export const deleteSchedule = async(req,res) => {
    const { id } = req.body;
    
    try {
        await Schedule.findByIdAndDelete(id);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).render("calendar/home", {
            errorMessage:error._message,
        })
    }
}