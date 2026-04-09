import { DynamicStyle } from "./DynamicStyle"
import { InlineStyle } from "./InlineStyle"

export const Main = () => {
    return <>
        {/* <InlineStyle></InlineStyle> */}
        <DynamicStyle num={12}></DynamicStyle>
        <DynamicStyle num={75}></DynamicStyle>
        <DynamicStyle num={69}></DynamicStyle>
        <DynamicStyle num={3}></DynamicStyle>
    </>
}