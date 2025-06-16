import { z } from "zod"

const updateSchema = z.object({
    username: z.string().min(8),
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    role: z.string(),
    roleChange: z.number(),
    collegeName: z.string().optional(),
    description: z.string().optional(),
    course : z.string().optional(),
    batch : z.string().optional(),
}).refine((data) => {
    if (data.role === "Mentor") {
        return data.collegeName && data.collegeName.trim() !== "";
    }
    return true;
}, {
    message: "College Name is required for mentors",
    path: ["collegeName"], // Show error under collegeName field
});


export default updateSchema
