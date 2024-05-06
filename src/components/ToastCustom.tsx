import { toastController } from '@ionic/core';

export function useToast() {
    return async (message: string, color: string = 'default', position: "top" | "bottom" | "middle" = "bottom") => {
        const toast = await toastController.create({
            message: message,
            duration: 2000,
            color: color,
            position: position,
        });
        toast.present();
    };
}