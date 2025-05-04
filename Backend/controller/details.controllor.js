import User from "../models/user.js";

export const getDetails = async (req, res) => {
    try {
        const { collegeName } = req.body;

        if (!collegeName) {
            return res.status(400).json({ error: "collegeName is required" });
        }

        const details = await User.find({
            collegeName: collegeName,
            role: "Mentor"
        }).select("-password");;

        return res.status(200).json({ mentors: details });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserDetails = async (req, res) => {
    try{
        const {id} = req.body;
        const user = await User.findById(id).select("-password");;
        return res.status(200).send(user.toObject());
    }
    catch (e) {
        console.log(e);
    }
}
