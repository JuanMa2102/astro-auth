import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import {z} from 'zod';

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async ( credentialas ) => {
        const credential = GoogleAuthProvider.credentialFromResult(credentialas)
        if( !credential ){
            throw new Error('Credenciales invalidas')
        }
        await signInWithCredential(firebase.auth, credential)
        return {
            ok: true
        }
    }
})