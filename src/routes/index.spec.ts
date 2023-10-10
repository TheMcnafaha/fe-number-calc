import { expect, test } from "vitest";
import { MathGalactusNode, MathGalactusStack, getStackDisplay } from ".";
const mockMathNode:MathGalactusNode={
	mathOperation:{
		leftSide:10,
		operation:"+",
		rightSide:10,
		action:"=",
		total:10,
		isRightSide:true
	}
}
const mockMathStack:MathGalactusStack=[
	mockMathNode, mockMathNode
]

test("return a display of 10+10 from two mathNode with a total of 10 each", ()=>{
expect(getStackDisplay(mockMathStack)).toBe("10+10")
})
