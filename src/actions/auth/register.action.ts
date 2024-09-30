
import { defineAction } from "astro:actions";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from "firebase/auth";
import { z } from "zod";
import { firebase } from "@/firebase/config";

export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        rememberMe : z.boolean().optional()
    }),
    handler: async ({ name, password, rememberMe, email }, { cookies }) => {
        console.log(name, password, rememberMe, email)
        if( rememberMe ) {  
            cookies.set('email', email, {
                expires: new Date( Date.now() + 1000 * 60 * 60 * 24 * 7 ),
                path: '/'
            })
        }else{
            cookies.delete('email', {
                path: '/'
            })
        }

        try{
            const user = await createUserWithEmailAndPassword(
                firebase.auth,
                email,
                password
            )
            // console.log( firebase.auth.currentUser )
            if( firebase.auth.currentUser ) {
                console.log( name )
                await updateProfile( firebase.auth.currentUser, { displayName: name } )
                await sendEmailVerification( firebase.auth.currentUser, {
                    url: `${import.meta.env.WEBSITE_URL}/protected`
                } )
            }


            return {
                ok: true,
                msg: 'Usuario registrado',
                // user
            }

        }catch(error){
            const firebaseError = error as AuthError

            if(firebaseError.code === 'auth/email-already-in-use'){
                throw new Error('El email ya se encuentra registrado')
            }

            throw new Error('Error al registrar usuario')
        }


        return {
            ok: true,
            msg: 'Usuario registrado',
        }
    }
})