import z from "zod";
import { profileSchema } from "../user.schema";
export const updateProfileSchema = profileSchema.extend({
    banned: z.boolean(),
    email: z.string().email().min(5).max(100).optional(),
});
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
