
import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { z } from "zod";

export const login = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string(),
        rememberMe : z.boolean().optional()
    }),
    handler: async ( { email, password, rememberMe }, { cookies }) => {
        
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
            
            const user = await signInWithEmailAndPassword( firebase.auth, email, password )
            return {
                ok: true,
                msg: 'Usuario registrado',
                // user
            }

        }catch( error ){
            const firebaseError = error as AuthError
            if( firebaseError.code == 'auth/invalid-credential' ){
                throw new Error('Credenciales invalidas')
            }
            
            throw new Error('Error en el servidor')
        }

    }
})