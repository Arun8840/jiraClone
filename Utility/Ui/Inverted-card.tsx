import React from "react"

export const InvertedCard = () => {
  return (
    <div className="bg-indigo-600 rounded-xl relative">
      {/* //* mask container */}
      <div
        className="bg-black absolute left-0 bottom-0 h-20 w-1/2 rounded-tr-xl aspect-square
       after:absolute after:size-5 after:-top-5 before:absolute before:size-5 before:-right-5 before:bottom-0 "
      ></div>
    </div>
  )
}
