import { Provider } from "react-redux"
import s from "./store"
import { Show } from "./show"

export const MyMain = () => {
    return <>
        <Provider store={s}>
            <Show></Show>
        </Provider>
    </>
}