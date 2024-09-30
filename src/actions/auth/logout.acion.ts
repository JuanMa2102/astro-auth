
import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { signOut } from "firebase/auth";
import { z } from "zod";

export const logout = defineAction({
    accept: 'json',
    handler: async ( _, { cookies }) => {
        return await signOut(firebase.auth)
    }
})