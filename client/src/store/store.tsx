import { storeUserType } from "@/types/auth";
import { createStore, atom } from "jotai"


export const mainStore = createStore()

const stackNotification = atom<{ [prop: number]: { width: string; height: string; duration: number; content: any } }>(
	{},
)

const storeUser = atom<storeUserType>({
	username: null,
	status: null,
	role: null,
})

export {
	stackNotification,
	storeUser
}
