import User from "../models/user.js";

export const updateUser = async (req,res)=>{
    try{
        const { id , email ,firstname , lastname , role , collegeName , batch , course , description} = req.body;


        if(role === "Mentor"){
            console.log("Role: ", role);
            console.log(description);
            const response = await User.findByIdAndUpdate(
                id, {
                    firstname : firstname,
                    email : email,
                    lastname : lastname ,
                    collegeName : collegeName,
                    profileSetup : true,
                    role : role,
                    description : description,
                    course : course,
                    batch : batch,
                })

        }
        else {
            const response = await User.findByIdAndUpdate(
                id, {
                    firstname: firstname,
                    email: email,
                    lastname: lastname,
                    profileSetup: true,
                    role: role,
                    description: description,

                })

        }

        return res.status(200).send({
            "message": "success"
        })
    }
    catch (e){
        console.log(e);
    }
}
