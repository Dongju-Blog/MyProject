import { storeUserType } from "@/types/auth";
import { activeBoardItemType } from "@/types/board";
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

const category = atom<activeBoardItemType[]>([])

export {
	stackNotification,
	storeUser,
	category
}
